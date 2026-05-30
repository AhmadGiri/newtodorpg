import { useEffect, useMemo, useState } from 'react'
import Sidebar from './components/ui/Sidebar'
import Dashboard from './pages/Dashboard'
import Stats from './pages/Stats'
import QuestForm from './components/quest/QuestForm'
import QuestCard from './components/quest/QuestCard'
import Toast from './components/ui/Toast'
import AchievementCard from './components/achievement/AchievementCard'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { Quest, Difficulty } from './types/quest'
import { expMap } from './utils/exp'
import { getLevel, getProgress } from './utils/level'

export default function App() {
  const [quests, setQuests] = useLocalStorage<Quest[]>('quests', [])
  const [exp, setExp] = useLocalStorage<number>('exp', 0)
  const [streak, setStreak] = useLocalStorage<number>('streak', 0)
  const [lastCompletedDate, setLastCompletedDate] =
  useLocalStorage<string>('last-completed', '')
  const [toast, setToast] = useState('')

  const level = getLevel(exp)
  const progress = getProgress(exp)

  const completedQuests = quests.filter((q) => q.completed).length

  const achievements = useMemo(() => {
    return {
      firstQuest: completedQuests >= 1,
      levelFive: level >= 5,
      tenQuests: completedQuests >= 10,
      legendaryHunter: quests.some(
        (q) => q.completed && q.difficulty === 'Legendary'
      ),
    }
  }, [completedQuests, level, quests])

  useEffect(() => {
  if (achievements.firstQuest)
    setToast('🏆 First Quest Unlocked')

  if (achievements.levelFive)
    setToast('⚡ Reach Level 5')

  if (achievements.tenQuests)
    setToast('🔥 Complete 10 Quests')

  if (achievements.legendaryHunter)
    setToast('👑 Legendary Hunter')
}, [achievements])

  useEffect(() => {
    if (!toast) return

    const timer = setTimeout(() => {
      setToast('')
    }, 3000)

    return () => clearTimeout(timer)
  }, [toast])

  const addQuest = (title: string, difficulty: Difficulty) => {
    const newQuest: Quest = {
      id: Date.now().toString(),
      title,
      difficulty,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    setQuests([newQuest, ...quests])
  }

  const completeQuest = (id: string) => {
  const target = quests.find((q) => q.id === id)

  if (!target || target.completed) return

  const today = new Date().toDateString()

  if (!lastCompletedDate) {
    setStreak(1)
  } else {
    const last = new Date(lastCompletedDate)

    const diff =
      Math.floor(
        (Date.now() - last.getTime()) /
          (1000 * 60 * 60 * 24)
      )

    if (diff === 1) {
      setStreak((prev) => prev + 1)
    } else if (diff > 1) {
      setStreak(1)
    }
  }

  setLastCompletedDate(today)

  setExp(exp + expMap[target.difficulty])

  setQuests(
    quests.map((q) =>
      q.id === id
        ? { ...q, completed: true }
        : q
    )
  )
}
  const unlockedCount =
   Object.values(achievements).filter(Boolean).length

  const deleteQuest = (id: string) => {
    setQuests(quests.filter((q) => q.id !== id))
  }
  const [username, setUsername] =
  useLocalStorage('username', 'Giri Hunter')

  return (
    <div className="min-h-screen bg-zinc-950 text-white grid-bg">
      <div className="fixed left-0 top-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="fixed right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      {toast && <Toast message={toast} />}

      <div className="flex">
        <Sidebar />
        <MobileNav />

        <main className="flex-1 p-6 md:p-10 space-y-8">
          <Dashboard
            level={level}
            exp={exp}
            progress={progress}
            streak={streak}
          />

          <section className="space-y-5">
            <div>
              <h2 className="font-orbitron text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Quest Board
              </h2>

              <p className="text-zinc-400 mt-2">
                Accept missions and gain EXP.
              </p>
            </div>

            <QuestForm onAdd={addQuest} />

            <div className="grid lg:grid-cols-2 gap-5">
              {quests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onComplete={() => completeQuest(quest.id)}
                  onDelete={() => deleteQuest(quest.id)}
                />
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="font-orbitron text-3xl font-bold">
              Achievements
            </h2>

            <div className="grid md:grid-cols-2 gap-5">
              <AchievementCard
                title="First Quest"
                unlocked={achievements.firstQuest}
              />

              <AchievementCard
                title="Reach Level 5"
                unlocked={achievements.levelFive}
              />

              <AchievementCard
                title="Complete 10 Quests"
                unlocked={achievements.tenQuests}
              />

              <AchievementCard
                title="Legendary Hunter"
                unlocked={achievements.legendaryHunter}
              />
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="font-orbitron text-3xl font-bold">Stats</h2>

            <Stats
              completed={completedQuests}
              exp={exp}
              streak={streak}
              level={level}
              achievements={Object.values(achievements).filter(Boolean).length}
            />
          </section>
        </main>
      </div>
    </div>
  )
}