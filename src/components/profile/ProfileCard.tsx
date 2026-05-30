import GlowCard from '../ui/GlowCard'
import RankBadge from './RankBadge'

interface Props {
  username: string
  title: string
  level: number
  rank: string
}

export default function ProfileCard({ username, title, level, rank, }: Props) {
  return (
    <GlowCard className="glow-purple">
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center text-3xl font-bold font-orbitron">
          {username.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2 className="font-orbitron text-2xl font-bold text-white">
            {username}
          </h2>

          <p className="text-violet-300">{title}</p>
          <RankBadge rank={rank} />

          <div className="mt-3 inline-flex rounded-full border border-cyan-400/40 px-4 py-1 text-cyan-300">
            LVL {level}
          </div>
        </div>
      </div>
    </GlowCard>
  )
}