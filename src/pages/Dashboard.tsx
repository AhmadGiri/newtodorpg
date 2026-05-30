import ProfileCard from '../components/profile/ProfileCard'
import ProgressBar from '../components/ui/ProgressBar'
import GlowCard from '../components/ui/GlowCard'

interface Props {
  level: number
  exp: number
  progress: number
  streak: number
  username: string
  rank: string
  hunterTitle: string
}

export default function Dashboard({
  level,
  exp,
  progress,
  streak,
  username,
  hunterTitle,
  rank
}: Props) {
  return (
    <div className="space-y-6">
      <ProfileCard
        username={username}
        title={hunterTitle}
        level={level}
        rank={rank}
      />

      <GlowCard>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-orbitron text-2xl">EXP Progress</h2>
          <span className="text-cyan-300">{exp} EXP</span>
        </div>

        <ProgressBar value={progress} />
      </GlowCard>

      <div className="grid md:grid-cols-2 gap-6">
        <GlowCard>
          <h3 className="font-orbitron text-xl mb-2">Daily Streak</h3>
          <p className="text-4xl font-bold text-orange-400">🔥 {streak}</p>
        </GlowCard>

        <GlowCard>
          <h3 className="font-orbitron text-xl mb-2">Inventory</h3>

          <div className="space-y-2 text-zinc-300">
            <p>🧪 Mana Potion</p>
            <p>⚔️ Shadow Blade</p>
            <p>🎖️ Hunter Badge</p>
            <p>📜 Ancient Scroll</p>
          </div>
        </GlowCard>
      </div>
    </div>
  )
}