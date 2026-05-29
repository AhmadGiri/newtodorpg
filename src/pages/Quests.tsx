import { useState } from 'react';
import type { Quest, Difficulty } from '../types/quest';
import { QuestCard } from '../components/quest/QuestCard';
import { PlusCircle, Filter, Swords } from 'lucide-react';

interface QuestsProps {
  quests: Quest[];
  onAddQuest: (questData: Omit<Quest, 'id' | 'isCleared' | 'createdAt' | 'expReward'>) => void;
  onClearQuest: (id: string) => void;
  onDeleteQuest: (id: string) => void;
}

export const Quests: React.FC<QuestsProps> = ({ quests, onAddQuest, onClearQuest, onDeleteQuest }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('EASY');
  const [filter, setFilter] = useState<Difficulty | 'ALL'>('ALL');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddQuest({ title, description, difficulty });
    setTitle('');
    setDescription('');
    setDifficulty('EASY');
  };

  const filteredQuests = quests.filter(quest => filter === 'ALL' || quest.difficulty === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black font-orbitron tracking-wider bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
          <Swords className="w-6 h-6 text-cyan-400 animate-pulse" /> QUEST_LOG
        </h1>
        <p className="text-xs text-zinc-500 mt-1 font-orbitron tracking-widest">
          COMMENCE NEW OBJECTIVES AND TRACK CAMPAIGN PROGRESSION
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Form Create Quest */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl p-5 rounded-2xl space-y-4">
          <h3 className="font-orbitron font-bold text-xs tracking-widest text-cyan-400 border-b border-zinc-800 pb-2">
            INITIALIZE_NEW_QUEST
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-orbitron tracking-wider text-zinc-500 uppercase mb-1">Objective Name</label>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Master React State Management"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-orbitron tracking-wider text-zinc-500 uppercase mb-1">Mission briefing</label>
              <textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe objective criteria..."
                rows={3}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-orbitron tracking-wider text-zinc-500 uppercase mb-1">Threat Level / Difficulty</label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value as Difficulty)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-cyan-500 transition-colors font-orbitron"
              >
                <option value="EASY">EASY (10 EXP)</option>
                <option value="MEDIUM">MEDIUM (30 EXP)</option>
                <option value="HARD">HARD (50 EXP)</option>
                <option value="LEGENDARY">LEGENDARY (100 EXP)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-orbitron text-xs font-bold py-2.5 px-4 rounded-xl shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300 flex items-center justify-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>REGISTER QUEST</span>
            </button>
          </form>
        </div>

        {/* List Quests Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filtering */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Filter className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
            <span className="text-[10px] font-orbitron tracking-wider text-zinc-500 uppercase mr-2 flex-shrink-0">Filter:</span>
            {(['ALL', 'EASY', 'MEDIUM', 'HARD', 'LEGENDARY'] as const).map(tier => (
              <button
                key={tier}
                onClick={() => setFilter(tier)}
                className={`px-3 py-1 text-[10px] font-orbitron tracking-wider rounded-lg border transition-all ${
                  filter === tier 
                    ? 'bg-zinc-800 text-cyan-400 border-cyan-500/30 shadow-md shadow-cyan-950/40' 
                    : 'bg-zinc-950 text-zinc-500 border-zinc-900 hover:border-zinc-800 hover:text-zinc-400'
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* List Renderer */}
          <div className="space-y-3">
            {filteredQuests.length === 0 ? (
              <div className="text-center py-12 border border-zinc-800/60 bg-zinc-900/20 backdrop-blur-sm rounded-2xl">
                <p className="text-xs font-orbitron tracking-widest text-zinc-600 uppercase">NO OBJECTIVES FOUND WITHIN THIS PARAMETER</p>
              </div>
            ) : (
              filteredQuests.map(quest => (
                <QuestCard 
                  key={quest.id} 
                  quest={quest} 
                  onClear={onClearQuest} 
                  onDelete={onDeleteQuest} 
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
