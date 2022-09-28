export enum InvocationActionTypes {
  REROLL = 'invocation.reroll',
  KEEP = 'invocation.keep',
}

export interface InvocationData {
  ownerId: string,
  invocationMessageId?: string,
  pokemon: Pokemon,
  nbrTimeRefreshed: number,
  ongoing: boolean,
}
