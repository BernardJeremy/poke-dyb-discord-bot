export enum SafariActionTypes {
  BALL = 'safari.ball',
  BAIT = 'safari.bait',
  ROCK = 'safari.rock',
  RUN = 'safari.run',
}

export interface SafariEncounterData {
  ownerId: string,
  safariEncounterMessageId?: string,
  pokemon: Pokemon,
  ballRemaining: number,
  captureRate: number,
  escapeRate: number,
  statusText: string,
  ongoing: boolean,
  hasBeenCaught: boolean,
}
