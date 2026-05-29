import type { Quest } from "../../types/quest";
import { Card } from '../ui/Card';
import { getDifficultyColor } from '../../utils/exp';
import { CheckCircle2, Trash2, Calendar } from 'lucide-react';

interface QuestCardProps {
  quest: Quest;
  onClear: (id: string) => void;
  onDelete: (id: string) => void;
}

export const QuestCard: React.FC<QuestCardProps> = ({ quest, onClear, onDelete }) => {
  const diffStyle = getDifficultyColor(quest.difficulty);

  return (
    <Card 
      glowColor={quest.isCleared ? 'zinc' : quest.difficulty === 'LEGENDARY' ? 'purple' : 'cyan'}
      className={`relative border-l-4 transition-all duration-300 ${
        quest.isCleared 
          ? 'border-l-zinc-700 opacity-60 bg-zinc-950/40' 
          : quest.difficulty === 'LEGENDARY' ? 'border-l-purple-500' 
          : quest.difficulty === 'HARD' ? 'border-l-rose-500'
          : quest.difficulty === 'MEDIUM' ? 'border-l-amber-500'
          : 'border-l-emerald-500'
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1">
          {/* Header Card: Difficulty & Reward */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-orbitron tracking-widest font-bold px-2 py-0.5 rounded-md border ${diffStyle}`}>
              {quest.difficulty}
            </span>
            <span className="text-[10px] font-orbitron tracking-wider text-cyan-400 bg-cyan-950/30 border border-cyan-800/30 px-2 py-0.5 rounded-md">
              +{quest.expReward} EXP
            </span>
          </div>

          {/* Title & Description */}
          <h3 className={`text-base font-bold tracking-wide ${quest.isCleared ? 'line-through text-zinc-500 font-normal' : 'text-zinc-100 font-orbitron'}`}>
            {quest.title}
          </h3>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            {quest.description}
          </p>
          
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-600 mt-3 font-orbitron">
            <Calendar className="w-3 h-3" />
            <span>COMMENCED: {new Date(quest.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t border-zinc-800/40 sm:border-0 pt-3 sm:pt-0">
          {!quest.isCleared ? (
            <button
              onClick={() => onClear(quest.id)}
              className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-cyan-950 to-zinc-900 hover:from-cyan-500 hover:to-purple-600 border border-cyan-500/30 hover:border-cyan-400 px-4 py-2 rounded-xl text-xs font-orbitron font-bold text-cyan-400 hover:text-white transition-all duration-300 shadow-md group-hover:shadow-cyan-500/20 w-full sm:w-auto"
            >
              <CheckCircle2 className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>CLEAR OBJECTIVE</span>
            </button>
          ) : (
            <span className="text-xs font-orbitron tracking-widest text-emerald-400 font-bold bg-emerald-950/20 border border-emerald-900/40 px-3 py-1.5 rounded-xl">
              [ CLEARED ]
            </span>
          )}

          <button
            onClick={() => onDelete(quest.id)}
            className="p-2 bg-zinc-950 hover:bg-rose-950/40 border border-zinc-800 hover:border-rose-800/60 rounded-xl text-zinc-500 hover:text-rose-400 transition-colors duration-200"
            title="Abandon Quest"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
};
