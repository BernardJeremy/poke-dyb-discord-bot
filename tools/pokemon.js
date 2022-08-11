const pokedex = require('../data/pokedex.json');
const { getRandomInt } = require('./utils');

const getRandomPokemon = () => {
  const seed = getRandomInt(1, 100);

  const eligiblePokemonList = pokedex.filter((pokemon) => pokemon.rarityLevel > seed);

  return eligiblePokemonList[Math.floor(Math.random() * eligiblePokemonList.length)];
};

const getRandomPokemonWithRarity = (minRarity, maxRarity) => {
  const eligiblePokemonList = pokedex.filter((pokemon) => (
    pokemon.rarityLevel >= minRarity && pokemon.rarityLevel <= maxRarity
  ));

  return eligiblePokemonList[Math.floor(Math.random() * eligiblePokemonList.length)];
};

const removePokemonFromList = (targetPokedex, pokemonNbr, nbrToRemove) => {
  const targetPokemonList = targetPokedex.filter((pokemon) => pokemonNbr === pokemon);

  // First remove all pokemon with target id
  const newPokedex = targetPokedex.filter((pokemonId) => pokemonId !== pokemonNbr);

  // Then add back some of them if not all were sold
  for (let i = 0; i < targetPokemonList.length - nbrToRemove; i += 1) {
    newPokedex.push(pokemonNbr);
  }

  return newPokedex;
};

const getCleanUserPokedexArray = (targetPokedex) => targetPokedex.sort(
  (a, b) => a - b,
)
  .reduce((acc, curr) => {
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

module.exports = {
  getRandomPokemon,
  getRandomPokemonWithRarity,
  removePokemonFromList,
  getCleanUserPokedexArray,
};
