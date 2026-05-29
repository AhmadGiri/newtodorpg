import type { InventoryItem } from '../types/quest';

export const PLAYER_TITLES = [
  "E-Rank Awakening",
  "Dungeon Explorer",
  "React Slayer",
  "Shadow Hunter",
  "Night Grinder",
  "Monarch of Bugs",
  "Supreme Necromancer"
] as const;

export const INITIAL_INVENTORY: InventoryItem[] = [
  { id: '1', name: 'Mana Potion', description: 'Restores instant mental stamina for coding.', rarity: 'COMMON', icon: 'CupSoda', quantity: 5 },
  { id: '2', name: 'Shadow Blade', description: 'Cuts through legacy spaghetti code instantly.', rarity: 'EPIC', icon: 'Sword', quantity: 1 },
  { id: '3', name: 'Hunter Badge', description: 'Proof of an officially registered System User.', rarity: 'RARE', icon: 'ShieldAlert', quantity: 1 },
  { id: '4', name: 'Ancient Scroll', description: 'Contains forbidden knowledge of pure state management.', rarity: 'MYTHIC', icon: 'Scroll', quantity: 2 },
];

export const INITIAL_ACHIEVEMENTS = [
  { id: 'first_quest', title: 'First Awakening', description: 'Clear your very first objective.', icon: 'Shield', isUnlocked: false },
  { id: 'lvl_5', title: 'Breaking Limits', description: 'Reach Level 5 and transcend human limits.', icon: 'Zap', isUnlocked: false },
  { id: 'clear_10', title: 'Dungeon Cleaner', description: 'Successfully clear 10 Objectives.', icon: 'Swords', isUnlocked: false },
  { id: 'legendary', title: 'Monarch’s Presence', description: 'Conquer a Legendary Tier Quest.', icon: 'Crown', isUnlocked: false },
];
