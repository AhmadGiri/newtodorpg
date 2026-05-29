import type { PlayerStats } from '../../types/quest';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Shield, Flame } from 'lucide-react';
import { PLAYER_TITLES } from '../../data/titles';

interface ProfileCardProps {
  stats: PlayerStats;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ stats }) => {
  // Menentukan title otomatis berdasarkan level player
  const titleIndex = Math.min(Math.floor(stats.level / 2), PLAYER_TITLES.length - 1);
  const activeTitle = PLAYER_TITLES[titleIndex];
  const expPercentage = (stats.exp / stats.nextLevelExp) * 100;

  return (
    <Card glowColor="purple" className="relative overflow-hidden group">
      {/* Glow Effect Corner */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all duration-500" />
      
      <div className="flex flex-col md:flex-row gap-5 items-center">
        {/* Avatar Area */}
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-2xl border-2 border-purple-500/60 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:scale-105 transition-transform duration-300">
            <Shield className="w-10 h-10 text-purple-400 animate-pulse-slow" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded-md text-[10px] font-orbitron text-cyan-400 font-bold tracking-wider">
            LVL {stats.level}
          </div>
        </div>

        {/* Info Area */}
        <div className="flex-1 w-full text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold font-orbitron tracking-wide text-zinc-100">HUNTER_USER_01</h2>
              <p className="text-xs font-orbitron text-purple-400 tracking-widest uppercase mt-0.5 font-semibold">
                [{activeTitle}]
              </p>
            </div>
            
            {/* Streak & Buff Mini badge */}
            <div className="flex justify-center md:justify-end gap-2 mt-1 md:mt-0">
              <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-xl text-xs text-amber-400 font-orbitron">
                <Flame className="w-3.5 h-3.5 fill-amber-500/20" />
                <span>STREAK: {stats.streak}D</span>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-xs font-orbitron mb-1 tracking-wider text-zinc-400">
              <span>SYSTEM_EXP_STATUS</span>
              <span className="text-cyan-400 font-bold">{stats.exp} / {stats.nextLevelExp} EXP</span>
            </div>
            <ProgressBar progress={expPercentage} />
          </div>
        </div>
      </div>
    </Card>
  );
};
