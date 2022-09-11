export enum StatsActionTypes {
  REFRESH = 'stats.refresh',
}

export enum RatioActionTypes {
  REFRESH = 'ratio.refresh',
}

export enum LivedexActionTypes {
  REFRESH = 'livedex.refresh',
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
  invoc: number,
  invocSuccess: number,
  tower: number,
  towerSuccess: number,
  safari: number,
  safariSuccess: number,
  invocSuccessPercent: number,
  towerSuccessPercent: number,
  safariSuccessPercent: number,
}
