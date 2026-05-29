export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'LEGENDARY';

export interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  expReward: number;
  isCleared: boolean;
  createdAt: string;
}

export interface PlayerStats {
  level: number;
  exp: number;
  nextLevelExp: number;
  streak: number;
  lastClearedDate: string | null;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'MYTHIC';
  icon: string;
  quantity: number;
}
