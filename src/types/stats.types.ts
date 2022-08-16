export enum StatsActionTypes {
  REFRESH = 'stats.refresh',
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
}
