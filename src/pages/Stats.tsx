import React from 'react';
import { Quest, PlayerStats, Achievement } from '../types/quest';
import { Card } from '../components/ui/Card';
import { BarChart3, Shield, Flame, Swords, Award } from 'lucide-react';

interface StatsProps {
  quests: Quest[];
  stats: PlayerStats;
  achievements: Achievement[];
}

export const Stats: React.FC<StatsProps> = ({ quests, stats, achievements }) => {
  const completedCount = quests.filter(q => q.isCleared).length;
  const totalCreated = quests.length;
  const unlockPercentage = totalCreated > 0 ? Math.round((completedCount / totalCreated) * 100) : 0;
  
  const statsMetrics = [
    { label: 'PLAYER_LEVEL', value: `LVL ${stats.level}`, icon: Shield, color: 'text-purple-400 bg-purple-950/20 border-purple-900/50' },
    { label: 'QUESTS_COMPLETED', value: completedCount, icon: Swords, color: 'text-emerald-400 bg-emerald-950/20 border-emerald-900/50' },
    { label: 'DAILY_STREAK', value: `${stats.streak} DAYS`, icon: Flame, color: 'text-amber-500 bg-amber-950/20 border-amber-900/50' },
    { label: 'CLEAR_RATE', value: `${unlockPercentage}%`, icon: BarChart3, color: 'text-cyan-400 bg-cyan-950/20 border-cyan-900/50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black font-orbitron tracking-wider bg-gradient-to-r from-zinc-100 to-zinc-500 bg-clip-text text-transparent flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-zinc-400" /> SYSTEM_STATISTICS
        </h1>
        <p className="text-xs text-zinc-500 mt-1 font-orbitron tracking-widest">
          QUANTIFIED METRICS RECORDED BY THE HUNTER INTERFACE
        </p>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsMetrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Card key={idx} className="flex flex-col justify-between p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[9px] font-orbitron tracking-widest text-zinc-500 uppercase">{m.label}</span>
                <div className={`p-1.5 rounded-lg border ${m.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-xl font-bold font-orbitron text-zinc-100 tracking-wide mt-2">
                {m.value}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Real Achievement Block Layout */}
      <div>
        <h3 className="font-orbitron font-bold text-sm tracking-widest text-zinc-400 flex items-center gap-2 mb-3">
          <Award className="w-4 h-4 text-amber-500" /> SYSTEM_ACHIEVEMENTS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map(ach => (
            <div 
              key={ach.id}
              className={`p-4 border rounded-2xl backdrop-blur-md flex gap-4 items-center transition-all duration-300 ${
                ach.isUnlocked 
                  ? 'bg-zinc-900/40 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.05)]' 
                  : 'bg-zinc-950/40 border-zinc-900/80 opacity-40'
              }`}
            >
              <div className={`p-3 rounded-xl border ${
                ach.isUnlocked 
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' 
                  : 'bg-zinc-950 border-zinc-800 text-zinc-600'
              }`}>
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className={`text-sm font-bold font-orbitron tracking-wide ${ach.isUnlocked ? 'text-zinc-100' : 'text-zinc-500'}`}>
                    {ach.title}
                  </h4>
                  {ach.isUnlocked && (
                    <span className="text-[8px] font-orbitron font-bold tracking-widest text-amber-400 border border-amber-500/30 px-1 py-0.2 rounded bg-amber-500/5">
                      UNLOCKED
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 mt-0.5">{ach.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
