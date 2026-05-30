import { useState } from 'react'
import type { Difficulty } from '../../types/quest'

interface Props {
  onAdd: (title: string, difficulty: Difficulty) => void
}

export default function QuestForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) return

    onAdd(title, difficulty)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-5">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new quest objective..."
          className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-900/70 px-4 py-3 outline-none focus:border-violet-500"
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          className="rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
          <option>Legendary</option>
        </select>

        <button className="rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 font-semibold transition-all hover:scale-105">
          Accept Quest
        </button>
      </div>
    </form>
  )
}