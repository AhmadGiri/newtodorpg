import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Quest, PlayerStats, InventoryItem, Achievement, Difficulty } from './types/quest';
import { INITIAL_INVENTORY, INITIAL_ACHIEVEMENTS } from './data/titles';
import { getExpByDifficulty } from './utils/exp';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Quests } from './pages/Quests';
import { Stats } from './pages/Stats';

// Components UI global
import { AchievementToast } from './components/achievement/AchievementToast';
import { LayoutGrid, Swords, BarChart3, Layers, LogOut, Menu, X, ShieldAlert } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'quests' | 'stats'>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core Global States synced inside custom localStorage hook
  const [quests, setQuests] = useLocalStorage<Quest[]>('rpg_quests', []);
  const [inventory] = useLocalStorage<InventoryItem[]>('rpg_inventory', INITIAL_INVENTORY);
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('rpg_achievements', INITIAL_ACHIEVEMENTS);
  const [stats, setStats] = useLocalStorage<PlayerStats>('rpg_stats', {
    level: 1,
    exp: 0,
    nextLevelExp: 100,
    streak: 0,
    lastClearedDate: null,
  });

  // Achievement Toast Pop Up state
  const [activeToast, setActiveToast] = useState<{ title: string; description: string } | null>(null);

  // Helper inside logic to check achievement locks state
  const checkAchievements = (updatedQuests: Quest[], currentStats: PlayerStats) => {
    let freshAchievements = [...achievements];
    let triggeredToast: typeof activeToast = null;

    const totalCleared = updatedQuests.filter(q => q.isCleared).length;

    freshAchievements = freshAchievements.map(ach => {
      if (ach.isUnlocked) return ach;

      let trigger = false;
      if (ach.id === 'first_quest' && totalCleared >= 1) trigger = true;
      if (ach.id === 'lvl_5' && currentStats.level >= 5) trigger = true;
      if (ach.id === 'clear_10' && totalCleared >= 10) trigger = true;
      if (ach.id === 'legendary' && updatedQuests.some(q => q.isCleared && q.difficulty === 'LEGENDARY')) trigger = true;

      if (trigger) {
        triggeredToast = { title: ach.title, description: ach.description };
        return { ...ach, isUnlocked: true, unlockedAt: new Date().toISOString() };
      }
      return ach;
    });

    if (triggeredToast) {
      setAchievements(freshAchievements);
      setActiveToast(triggeredToast);
    }
  };

  // Add quest logic
  const handleAddQuest = (data: { title: string; description: string; difficulty: Difficulty }) => {
    const newQuest: Quest = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      difficulty: data.difficulty,
      expReward: getExpByDifficulty(data.difficulty),
      isCleared: false,
      createdAt: new Date().toISOString()
    };
    setQuests([newQuest, ...quests]);
  };

  // Complete quest & trigger Level calculation
  const handleClearQuest = (id: string) => {
    const targetQuest = quests.find(q => q.id === id);
    if (!targetQuest || targetQuest.isCleared) return;

    // 1. Calculate Streak
    const todayStr = new Date().toDateString();
    let newStreak = stats.streak;
    if (stats.lastClearedDate !== todayStr) {
      if (stats.lastClearedDate === new Date(Date.now() - 86400000).toDateString() || stats.lastClearedDate === null) {
        newStreak += 1;
      } else {
        newStreak = 1; // reset streak if gap passed
      }
    }

    // 2. Calculate EXP & Level
    let newExp = stats.exp + targetQuest.expReward;
    let newLevel = stats.level;
    let nextLvlExp = stats.nextLevelExp;

    while (newExp >= nextLvlExp) {
      newExp -= nextLvlExp;
      newLevel += 1;
      // Tingkat kesulitan naik bertahap per level
      nextLvlExp = 100 + (newLevel * 10);
    }

    const updatedStats: PlayerStats = {
      ...stats,
      level: newLevel,
      exp: newExp,
      nextLevelExp: nextLvlExp,
      streak: newStreak,
      lastClearedDate: todayStr
    };

    const updatedQuests = quests.map(q => q.id === id ? { ...q, isCleared: true } : q);
    
    setStats(updatedStats);
    setQuests(updatedQuests);
    checkAchievements(updatedQuests, updatedStats);
  };

  // Delete quest
  const handleDeleteQuest = (id: string) => {
    setQuests(quests.filter(q => q.id !== id));
  };

  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: LayoutGrid },
    { id: 'quests', label: 'QUEST LOG', icon: Swords },
    { id: 'stats', label: 'STATISTICS', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen relative system-grid flex bg-zinc-950 text-zinc-100">
      
      {/* Background Decorative Neon Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />

      {/* SIDEBAR LEFT (Desktop Layout) */}
      <aside className="hidden md:flex flex-col w-64 bg-zinc-900/40 backdrop-blur-xl border-r border-zinc-800 p-5 z-20 justify-between sticky top-0 h-screen">
        <div className="space-y-8">
          {/* Logo Interface */}
          <div className="flex items-center gap-3 px-2">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black font-orbitron text-base tracking-wider text-white">SYSTEM_UI</span>
              <span className="block text-[9px] font-orbitron text-cyan-400 tracking-widest font-bold">V.1.0.4-BETA</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-orbitron text-xs font-bold tracking-widest border transition-all duration-300 ${
                    currentTab === item.id 
                      ? 'bg-gradient-to-r from-purple-950/40 to-cyan-950/20 text-cyan-400 border-cyan-500/30 shadow-[inset_0_0_12px_rgba(6,182,212,0.15)] shadow-cyan-950/20' 
                      : 'bg-transparent text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-zinc-900/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${currentTab === item.id ? 'text-cyan-400' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Static Bottom Utility */}
        <div className="border-t border-zinc-800/80 pt-4 px-2 flex items-center justify-between text-xs font-orbitron text-zinc-600">
          <span className="flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5 text-zinc-600" /> STATUS: LINKED</span>
          <button className="hover:text-rose-400 transition-colors"><LogOut className="w-4 h-4" /></button>
        </div>
      </aside>

      {/* MOBILE HEADER & BOTTOM NAV */}
      <div className="md:hidden fixed top-0 left-0 w-full z-30 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <span className="font-black font-orbitron text-sm tracking-widest">SYSTEM_UI</span>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-300"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer Slide Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20 bg-zinc-950/95 flex flex-col p-6 pt-20 space-y-4">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-4 p-4 rounded-xl font-orbitron text-sm font-bold tracking-widest border ${
                  currentTab === item.id 
                    ? 'bg-zinc-900 text-cyan-400 border-cyan-500/30' 
                    : 'text-zinc-500 border-transparent'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* MAIN CONTENT RIGHT COMPONENT */}
      <main className="flex-1 px-4 md:px-8 pt-20 md:pt-8 pb-12 overflow-y-auto max-w-5xl mx-auto w-full z-10">
        {currentTab === 'dashboard' && (
          <Dashboard quests={quests} stats={stats} inventory={inventory} achievements={achievements} />
        )}
        {currentTab === 'quests' && (
          <Quests quests={quests} onAddQuest={handleAddQuest} onClearQuest={handleClearQuest} onDeleteQuest={handleDeleteQuest} />
        )}
        {currentTab === 'stats' && (
          <Stats quests={quests} stats={stats} achievements={achievements} />
        )}
      </main>

      {/* Toast Pop Up Global Manager */}
      {activeToast && (
        <AchievementToast 
          title={activeToast.title} 
          description={activeToast.description} 
          onClose={() => setActiveToast(null)} 
        />
      )}
    </div>
  );
}
