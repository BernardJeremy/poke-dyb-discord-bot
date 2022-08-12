interface PokemonStats {
  HP: number,
  Attack: number,
  Defense: number,
  'Sp. Attack': number,
  'Sp. Defense': number,
  Speed: number,
}

interface Pokemon {
  id: PokemonId,
  name: string,
  stats?: PokemonStats,
  types: string[],
  color?: string,
  rarityLevel: number,
  craftingPrice: number,
  nbr?: number,
}

interface UserPokemon {
  id: PokemonId,
  name: string,
  stats?: PokemonStats,
  types: string[],
  color?: `#${string}`,
  rarityLevel: number,
  craftingPrice: number,
  nbr: number,
}

type PokemonId = number;
