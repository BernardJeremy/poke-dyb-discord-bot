export enum StatsActionTypes {
  REFRESH = 'stats.refresh',
}

export enum RatioActionTypes {
  REFRESH = 'ratio.refresh',
}
export interface UserStats {
  name: string
  nbrPokemon: number
  totalCostUserPokemon: number
  totalCostPokedex: number
  gold: number
  dust: number
  tickets: number
  towerTryRemaining: number
  invocSuccessPercent: number,
  towerSuccessPercent: number,
  safariSuccessPercent: number,
}
