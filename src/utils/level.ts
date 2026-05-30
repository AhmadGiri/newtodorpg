export const getLevel = (exp: number) => {
  return Math.floor(exp / 100) + 1
}

export const getProgress = (exp: number) => {
  return exp % 100
}