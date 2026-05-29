import React, { useEffect } from 'react';
import { Award, X } from 'lucide-react';

interface AchievementToastProps {
  title: string;
  description: string;
  onClose: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({ title, description, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-float max-w-sm w-full bg-zinc-900/90 backdrop-blur-xl border-2 border-amber-500/80 rounded-2xl p-4 shadow-[0_0_30px_rgba(245,158,11,0.25)] flex gap-3 items-start">
      <div className="p-2.5 bg-amber-500/10 border border-amber-500/40 rounded-xl text-amber-400">
        <Award className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <span className="text-[10px] font-orbitron tracking-widest font-black text-amber-400 block mb-0.5">
          ▲ ACHIEVEMENT UNLOCKED ▲
        </span>
        <h4 className="text-sm font-bold font-orbitron tracking-wide text-zinc-100">{title}</h4>
        <p className="text-xs text-zinc-400 mt-0.5">{description}</p>
      </div>
      <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
