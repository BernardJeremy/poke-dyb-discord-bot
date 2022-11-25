import pokedex from '../data/pokedex.json';
import { getRandomInt } from './utils';

const EXCLUSION_RARITY_THRESHHOLD = 60;
const EXCLUSION_POKEMON_ID_THRESHHOLD = 151;

const getRandomPokemon = (): Pokemon => {
  const seed = getRandomInt(1, 100);

  const eligiblePokemonList = pokedex.filter((pokemon) => {
    if (pokemon.id <= EXCLUSION_POKEMON_ID_THRESHHOLD) {
      if (seed >= EXCLUSION_RARITY_THRESHHOLD
        || pokemon.rarityLevel > EXCLUSION_RARITY_THRESHHOLD
        || pokemon.rarityLevel < seed) {
        return false;
      }
      return true;
    }

    return pokemon.rarityLevel >= seed;
  });

  return eligiblePokemonList[Math.floor(Math.random() * eligiblePokemonList.length)];
};

const getRandomPokemonWithRarity = (minRarity: number, maxRarity: number) => {
  const eligiblePokemonList = pokedex.filter((pokemon) => (
    pokemon.rarityLevel >= minRarity && pokemon.rarityLevel <= maxRarity
  ));

  return eligiblePokemonList[Math.floor(Math.random() * eligiblePokemonList.length)];
};

const removePokemonFromList = (
  targetPokedex: PokemonId[],
  pokemonNbr: number,
  nbrToRemove: number,
) => {
  const targetPokemonList = targetPokedex.filter((pokemon) => pokemonNbr === pokemon);

  // First remove all pokemon with target id
  const newPokedex = targetPokedex.filter((pokemonId) => pokemonId !== pokemonNbr);

  // Then add back some of them if not all were sold
  for (let i = 0; i < targetPokemonList.length - nbrToRemove; i += 1) {
    newPokedex.push(pokemonNbr);
  }

  return newPokedex;
};

const getCleanUserPokedexArray = (targetPokedex: PokemonId[]) => targetPokedex.sort(
  (a, b) => a - b,
)
  .reduce((acc: UserPokemon[], curr) => {
    const index = acc.findIndex((newPokedexObj) => newPokedexObj.id === curr);

    if (index === -1) {
      acc.push({
        id: curr,
        name: pokedex[curr - 1].name,
        types: pokedex[curr - 1].types,
        rarityLevel: pokedex[curr - 1].rarityLevel,
        craftingPrice: pokedex[curr - 1].craftingPrice,
        nbr: 1,
      });
    } else {
      acc[index].nbr += 1;
    }

    return acc;
  }, []);

export {
  getRandomPokemon,
  getRandomPokemonWithRarity,
  removePokemonFromList,
  getCleanUserPokedexArray,
};
