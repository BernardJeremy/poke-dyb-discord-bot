interface UserClaimData {
  gold: number,
  dust: number,
  tickets: number,
}

interface UserTowerData {
  ticketsTotal: number,
  currentFloor: number,
  maxClearFloor: number,
  reputation: number,
}

interface UserRatio {
  invoc: number,
  invocSuccess: number,
  invocSuccessPercentage?: number,
  tower: number,
  towerSuccess: number,
  towerSuccessPercentage?: number,
  safari: number,
  safariSuccess: number,
  safariSuccessPercentage?: number,
  arceus: number,
}

interface User {
  id: string,
  username: string,
  nickname?: string,
  pokedex: PokemonId[],
  lastDailyDate: Date | null,
  gold: number,
  dust: number,
  tickets: number,
  nbrDailyDone: number,
  nbrBonusDone: number,
  claims: UserClaimData,
  tower: UserTowerData,
  ratio: UserRatio,
  isAdmin: boolean,
  isBan: boolean,
}
