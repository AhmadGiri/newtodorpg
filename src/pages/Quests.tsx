import { useState } from 'react'
import QuestForm from '../components/quest/QuestForm'
import QuestCard from '../components/quest/QuestCard'
import type { Difficulty, Quest } from '../types/quest'

type Props = {
  quests: Quest[]
  addQuest: (title: string, difficulty: Difficulty) => void
  completeQuest: (id: string) => void
  deleteQuest: (id: string) => void
}

export default function QuestsPage({
  quests,
  addQuest,
  completeQuest,
  deleteQuest,
}: Props) {
  const [filter, setFilter] =
    useState<Difficulty | 'All'>('All')

  const filtered =
    filter === 'All'
      ? quests
      : quests.filter((q) => q.difficulty === filter)

  return (
    <section className="space-y-6">
      <div>
        <h1 className="font-orbitron text-4xl font-bold">
          Quest Board
        </h1>

        <p className="text-zinc-400">
          Accept missions and gain EXP.
        </p>
      </div>

      <QuestForm onAdd={addQuest} />

      <div className="flex gap-3 flex-wrap">
        {['All', 'Easy', 'Medium', 'Hard', 'Legendary'].map(
          (item) => (
            <button
              key={item}
              onClick={() => setFilter(item as any)}
              className={`px-4 py-2 rounded-xl border ${
                filter === item
                  ? 'border-violet-500 bg-violet-500/20'
                  : 'border-zinc-800'
              }`}
            >
              {item}
            </button>
          )
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {filtered.map((quest) => (
          <QuestCard
            key={quest.id}
            quest={quest}
            onComplete={() => completeQuest(quest.id)}
            onDelete={() => deleteQuest(quest.id)}
          />
        ))}
      </div>
    </section>
  )
}