type Props = {
  achievements: {
    firstQuest: boolean
    levelFive: boolean
    tenQuests: boolean
    legendaryHunter: boolean
  }
}

export default function AchievementsPage({
  achievements,
}: Props) {
  const data = [
    {
      title: 'First Quest',
      unlocked: achievements.firstQuest,
      desc: 'Complete your first mission',
    },
    {
      title: 'Reach Level 5',
      unlocked: achievements.levelFive,
      desc: 'Become stronger',
    },
    {
      title: 'Complete 10 Quests',
      unlocked: achievements.tenQuests,
      desc: 'Dedicated hunter',
    },
    {
      title: 'Legendary Hunter',
      unlocked: achievements.legendaryHunter,
      desc: 'Clear a Legendary quest',
    },
  ]

  return (
    <section>
      <h1 className="font-orbitron text-4xl mb-6">
        Achievements
      </h1>

      <div className="grid md:grid-cols-2 gap-5">
        {data.map((a) => (
          <div
            key={a.title}
            className={`glass rounded-2xl p-5 border transition-all ${
              a.unlocked
                ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                : 'border-zinc-800'
            }`}
          >
            <h3 className="font-bold">{a.title}</h3>

            <p className="text-zinc-400 text-sm mt-2">
              {a.desc}
            </p>

            <div className="mt-4">
              {a.unlocked ? 'UNLOCKED' : 'LOCKED'}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}