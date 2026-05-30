export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Legendary'

export interface Quest {
  id: string
  title: string
  difficulty: Difficulty
  completed: boolean
  createdAt: string
}