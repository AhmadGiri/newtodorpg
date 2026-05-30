export const getRank = (
  level: number
) => {
  if (level >= 50) return 'SS Rank'
  if (level >= 30) return 'S Rank'
  if (level >= 20) return 'A Rank'
  if (level >= 15) return 'B Rank'
  if (level >= 10) return 'C Rank'
  if (level >= 5) return 'D Rank'

  return 'E Rank'
}