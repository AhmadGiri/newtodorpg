import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  subText?: string;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, subText, color = 'from-cyan-500 to-purple-600' }) => {
  const validatedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full">
      <div className="w-full bg-zinc-950 rounded-full h-3 border border-zinc-800 p-[1px] overflow-hidden">
        <div 
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]`}
          style={{ width: `${validatedProgress}%` }}
        />
      </div>
      {subText && (
        <div className="flex justify-end text-xs text-zinc-500 mt-1.5 font-orbitron tracking-widest">
          {subText}
        </div>
      )}
    </div>
  );
};
