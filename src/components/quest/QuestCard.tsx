import { Trash2, Sword } from 'lucide-react'
import GlowCard from '../ui/GlowCard'
import type { Difficulty, Quest } from '../../types/quest'

interface Props {
  quest: Quest
  onComplete: () => void
  onDelete: () => void
}

const difficultyStyle: Record<Difficulty, string> = {
  Easy: 'border-emerald-500 text-emerald-400',
  Medium: 'border-yellow-500 text-yellow-400',
  Hard: 'border-red-500 text-red-400',
  Legendary: 'border-violet-500 text-violet-400',
}

export default function QuestCard({
  quest,
  onComplete,
  onDelete,
}: Props) {
  return (
    <GlowCard className="glow-cyan">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div
            className={`inline-flex rounded-full border px-3 py-1 text-sm ${difficultyStyle[quest.difficulty]}`}
          >
            {quest.difficulty}
          </div>

          <h3 className="mt-4 text-xl font-semibold text-white">
            {quest.title}
          </h3>

          <p className="mt-2 text-zinc-400">
            Mission Status: {quest.completed ? 'Cleared' : 'Pending'}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onComplete}
            className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-emerald-400 transition-all hover:scale-110"
          >
            <Sword size={18} />
          </button>

          <button
            onClick={onDelete}
            className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-red-400 transition-all hover:scale-110"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </GlowCard>
  )
}