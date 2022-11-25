const pokedex = require('../src/data/pokedex.json');

const EXCLUSION_RARITY_THRESHHOLD = 60;
const EXCLUSION_POKEMON_ID_THRESHHOLD = 151;

const getRandomInt = (min, max) => Math.floor(
  Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min),
);

const seed = 40;// getRandomInt(1, 100);

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

console.log(seed);
console.log(eligiblePokemonList.filter((pokemon) => pokemon.id <= 151).map((pokemon) => pokemon.rarityLevel));
console.log(eligiblePokemonList.filter((pokemon) => pokemon.id > 151).length);
