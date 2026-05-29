import type { Difficulty } from '../types/quest';

export const getExpByDifficulty = (difficulty: Difficulty): number => {
  const rewards: Record<Difficulty, number> = {
    EASY: 10,
    MEDIUM: 30,
    HARD: 50,
    LEGENDARY: 100
  };
  return rewards[difficulty];
};

export const getDifficultyColor = (difficulty: Difficulty): string => {
  const colors: Record<Difficulty, string> = {
    EASY: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-emerald-500/10',
    MEDIUM: 'text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-amber-500/10',
    HARD: 'text-rose-500 border-rose-500/30 bg-rose-500/10 shadow-rose-500/10',
    LEGENDARY: 'text-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-500/10 shadow-fuchsia-500/20 shadow-glow'
  };
  return colors[difficulty];
};
