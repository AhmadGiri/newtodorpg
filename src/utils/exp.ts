import type { Difficulty } from '../types/quest'

export const expMap: Record<Difficulty, number> = {
  Easy: 10,
  Medium: 30,
  Hard: 50,
  Legendary: 100,
}