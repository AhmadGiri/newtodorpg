import GlowCard from '../components/ui/GlowCard'

interface Props {
  completed: number
  exp: number
  streak: number
  level: number
  achievements: number
}

export default function Stats({
  completed,
  exp,
  streak,
  level,
  achievements,
}: Props) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <GlowCard>
        <h3 className="text-zinc-400">Completed Quests</h3>
        <p className="text-4xl font-bold mt-3">{completed}</p>
      </GlowCard>

      <GlowCard>
        <h3 className="text-zinc-400">Total EXP</h3>
        <p className="text-4xl font-bold mt-3">{exp}</p>
      </GlowCard>

      <GlowCard>
        <h3 className="text-zinc-400">Current Level</h3>
        <p className="text-4xl font-bold mt-3">{level}</p>
      </GlowCard>

      <GlowCard>
        <h3 className="text-zinc-400">Daily Streak</h3>
        <p className="text-4xl font-bold mt-3">🔥 {streak}</p>
      </GlowCard>

      <GlowCard>
        <h3 className="text-zinc-400">Achievements</h3>
        <p className="text-4xl font-bold mt-3">{achievements}</p>
      </GlowCard>
    </div>
  )
}