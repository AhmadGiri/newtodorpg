import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: 'purple' | 'cyan' | 'zinc' | 'rose';
}

export const Card: React.FC<CardProps> = ({ children, className = '', glowColor = 'zinc', ...props }) => {
  const glowStyles = {
    zinc: 'hover:border-zinc-700 shadow-black/50',
    purple: 'hover:border-purple-500/50 hover:shadow-purple-500/10 shadow-purple-950/20',
    cyan: 'hover:border-cyan-500/50 hover:shadow-cyan-500/10 shadow-cyan-950/20',
    rose: 'hover:border-rose-500/50 hover:shadow-rose-500/10 shadow-rose-950/20',
  };

  return (
    <div 
      className={`bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-5 transition-all duration-300 shadow-xl ${glowStyles[glowColor]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
