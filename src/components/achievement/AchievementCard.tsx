import GlowCard from '../ui/GlowCard'

interface Props {
  title: string
  unlocked: boolean
}

export default function AchievementCard({ title, unlocked }: Props) {
  return (
    <GlowCard>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-zinc-400">
            {unlocked ? 'Unlocked' : 'Locked'}
          </p>
        </div>

        <div
          className={`h-4 w-4 rounded-full ${
            unlocked ? 'bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,1)]' : 'bg-zinc-700'
          }`}
        />
      </div>
    </GlowCard>
  )
}