const pokedex = require('../data/pokedex.json');

const getRandomInt = (min, max) => Math.floor(
  Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min),
);

const getRandomPokemon = () => {
  const seed = getRandomInt(1, 100);

  const eligiblePokemonList = pokedex.filter((pokemon) => pokemon.rarityLevel > seed);

  return eligiblePokemonList[Math.floor(Math.random() * eligiblePokemonList.length)];
};

module.exports = {
  getRandomPokemon,
  getRandomInt,
};
