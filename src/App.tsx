import { useEffect, useMemo, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/ui/Sidebar'
import Dashboard from './pages/Dashboard'
import Stats from './pages/Stats'
import QuestsPage from './pages/Quests'
import AchievementsPage from './pages/Achievements'
import InventoryPage from './pages/Inventory'
import SettingsPage from './pages/Settings'
import MobileNav from './components/ui/MobileNav'
import Toast from './components/ui/Toast'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { Quest, Difficulty } from './types/quest'
import { expMap } from './utils/exp'
import { getLevel, getProgress } from './utils/level'
import { getRank } from './utils/rank'
import { titles } from './data/titles'

export default function App() {
  const [quests, setQuests] = useLocalStorage<Quest[]>('quests', [])
  const [exp, setExp] = useLocalStorage<number>('exp', 0)
  const [streak, setStreak] = useLocalStorage<number>('streak', 0)
  const [lastCompletedDate, setLastCompletedDate] =
  useLocalStorage<string>('last-completed', '')
  const [toast, setToast] = useState('')
  const [username, setUsername] =
  useLocalStorage('username', 'Shadow Hunter')
  const [shownAchievements, setShownAchievements] =
  useLocalStorage<string[]>(
    'shown-achievements',
    []
  )
  const level = getLevel(exp)
  const progress = getProgress(exp)
  const rank = getRank(level)
  const hunterTitle =
  titles[level % titles.length]

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
  const checks = [
    {
      key: 'firstQuest',
      unlocked: achievements.firstQuest,
      text: '🏆 First Quest',
    },
    {
      key: 'levelFive',
      unlocked: achievements.levelFive,
      text: '⚡ Reach Level 5',
    },
    {
      key: 'tenQuests',
      unlocked: achievements.tenQuests,
      text: '🔥 Complete 10 Quests',
    },
    {
      key: 'legendaryHunter',
      unlocked: achievements.legendaryHunter,
      text: '👑 Legendary Hunter',
    },
  ]

  checks.forEach((item) => {
    if (
      item.unlocked &&
      !shownAchievements.includes(item.key)
    ) {
      setToast(item.text)

      setShownAchievements((prev) => [
      ...prev,
      item.key,
    ])
    }
  })
}, [
  achievements,
  shownAchievements,
])

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

  const today =
  new Date().toISOString().split('T')[0]

  if (!lastCompletedDate) {
    setStreak(1)
  } else {
    const last =
  new Date(`${lastCompletedDate}T00:00:00`)

    const diff =
      Math.floor(
        (Date.now() - last.getTime()) /
          (1000 * 60 * 60 * 24)
      )

    if (diff === 1) {
  setStreak((prev) => prev + 1)
} else if (diff > 1) {
  setStreak(1)
} else if (diff === 0) {
  // hari yang sama
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
  const deleteQuest = (id: string) => {
    setQuests(quests.filter((q) => q.id !== id))
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white grid-bg">
      <div className="fixed left-0 top-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="fixed right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

      {toast && <Toast message={toast} />}

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6 md:p-10 pb-24 md:pb-10 space-y-8">
          <Routes>
  <Route
    path="/"
    element={
      <Dashboard
        level={level}
        exp={exp}
        progress={progress}
        streak={streak}
        username={username}
        rank={rank}
        hunterTitle={hunterTitle}
      />
    }
  />

  <Route
    path="/quests"
    element={
      <QuestsPage
        quests={quests}
        addQuest={addQuest}
        completeQuest={completeQuest}
        deleteQuest={deleteQuest}
      />
    }
  />

  <Route
    path="/achievements"
    element={
      <AchievementsPage
        achievements={achievements}
      />
    }
  />

  <Route
    path="/inventory"
    element={<InventoryPage />}
  />

  <Route
    path="/stats"
    element={
      <Stats
        completed={completedQuests}
        exp={exp}
        streak={streak}
        level={level}
        achievements={
          Object.values(achievements)
            .filter(Boolean)
            .length
        }
      />
    }
  />

  <Route
    path="/settings"
    element={
      <SettingsPage
        username={username}
        setUsername={setUsername}
      />
    }
  />
  <Route
  path="*"
  element={
    <Dashboard
      level={level}
      exp={exp}
      progress={progress}
      streak={streak}
      username={username}
      rank={rank}
      hunterTitle={hunterTitle}
    />
  }
/>
</Routes>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}