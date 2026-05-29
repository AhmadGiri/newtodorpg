import type { Quest, PlayerStats, InventoryItem, Achievement } from '../types/quest';
import { ProfileCard } from '../components/profile/ProfileCard';
import { Card } from '../components/ui/Card';
import * as Icons from 'lucide-react';

interface DashboardProps {
  quests: Quest[];
  stats: PlayerStats;
  inventory: InventoryItem[];
  achievements: Achievement[];
}

export const Dashboard: React.FC<DashboardProps> = ({ quests, stats, inventory, achievements }) => {
  const activeQuests = quests.filter(q => !q.isCleared);
  const unlockedAchievementsCount = achievements.filter(a => a.isUnlocked).length;

  // Helper untuk me-render icon dinamis dari lucide secara aman
  const renderIcon = (iconName: string, className: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className={className} /> : <Icons.HelpCircle className={className} />;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black font-orbitron tracking-wider bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
          SYSTEM DASHBOARD
        </h1>
        <p className="text-xs text-zinc-500 mt-1 font-orbitron tracking-widest">
          STATUS OVERVIEW & CURRENT ACTIVE OBJECTIVES
        </p>
      </div>

      {/* Profile Section */}
      <ProfileCard stats={stats} />

      {/* Grid Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Quick Active Quests */}
        <Card className="md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4 border-b border-zinc-800/60 pb-3">
              <h3 className="font-orbitron font-bold text-sm tracking-widest text-cyan-400 flex items-center gap-2">
                <Icons.Terminal className="w-4 h-4" /> ACTIVE_MISSIONS
              </h3>
              <span className="text-xs font-orbitron font-semibold bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 text-zinc-400">
                {activeQuests.length} RUNNING
              </span>
            </div>
            
            {activeQuests.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-zinc-800/80 rounded-xl bg-zinc-950/20">
                <p className="text-xs font-orbitron text-zinc-500 uppercase tracking-widest">All dungeons clear. No active quests found.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {activeQuests.slice(0, 3).map(quest => (
                  <div key={quest.id} className="flex justify-between items-center p-3 bg-zinc-950/60 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
                    <span className="text-xs font-medium font-orbitron tracking-wide truncate max-w-[70%]">{quest.title}</span>
                    <span className={`text-[9px] font-orbitron font-bold px-2 py-0.5 rounded uppercase ${
                      quest.difficulty === 'LEGENDARY' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {quest.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Sync Summary Item / Achievements Locked */}
        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="font-orbitron font-bold text-sm tracking-widest text-amber-400 flex items-center gap-2 mb-4 border-b border-zinc-800/60 pb-3">
              <Icons.Milestone className="w-4 h-4" /> FEATS_ACCOMPLISHED
            </h3>
            <div className="text-center py-4 bg-zinc-950/40 rounded-xl border border-zinc-800">
              <div className="text-3xl font-black font-orbitron text-amber-400 tracking-wider">
                {unlockedAchievementsCount} <span className="text-zinc-600 text-base font-normal">/ {achievements.length}</span>
              </div>
              <p className="text-[10px] font-orbitron tracking-widest text-zinc-500 mt-1 uppercase">Unlocked Titles</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Cosmetic Inventory Snippet */}
      <div>
        <h3 className="font-orbitron font-bold text-sm tracking-widest text-zinc-400 flex items-center gap-2 mb-3">
          <Icons.Briefcase className="w-4 h-4" /> CURRENT_EQUIPMENT_INVENTORY
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {inventory.map(item => (
            <div 
              key={item.id} 
              className={`p-3 bg-zinc-900/40 border rounded-xl backdrop-blur-sm relative group overflow-hidden ${
                item.rarity === 'MYTHIC' ? 'border-fuchsia-500/30 bg-fuchsia-950/5' :
                item.rarity === 'EPIC' ? 'border-purple-500/30 bg-purple-950/5' :
                item.rarity === 'RARE' ? 'border-cyan-500/30 bg-cyan-950/5' : 'border-zinc-800/80'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className={`p-1.5 rounded-lg bg-zinc-950 border ${
                  item.rarity === 'MYTHIC' ? 'border-fuchsia-500/40 text-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.2)]' :
                  item.rarity === 'EPIC' ? 'border-purple-500/40 text-purple-400' :
                  item.rarity === 'RARE' ? 'border-cyan-500/40 text-cyan-400' : 'border-zinc-800 text-zinc-400'
                }`}>
                  {renderIcon(item.icon, "w-4 h-4")}
                </div>
                <span className="text-[10px] font-orbitron font-bold bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800 text-zinc-400">
                  x{item.quantity}
                </span>
              </div>
              <h4 className="text-xs font-bold truncate text-zinc-200 font-orbitron">{item.name}</h4>
              <p className="text-[10px] text-zinc-500 truncate mt-0.5">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
