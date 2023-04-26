const fs = require('fs');
const basePokedex = require('./pokedex.json');
const baseTypes = require('../src/data/types.json');

const newPokedex = basePokedex
  .filter((pokemondData) => pokemondData.id >= 387 && pokemondData.id <= 493)
  .map((pokemonData) => ({
    ...pokemonData,
    name: pokemonData.name.french,
    stats: pokemonData.base,
    types: pokemonData.type.map((type) => baseTypes.find(
      (currentBaseType) => currentBaseType.english === type,
    ).french),
  })).map((pokemonData) => {
    const currentPokemon = pokemonData;
    delete currentPokemon.type;
    delete currentPokemon.base;

    return currentPokemon;
  });

const jsonContent = JSON.stringify(newPokedex);
fs.writeFile('output.json', jsonContent, 'utf8', (err) => {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    console.log(err);
    return;
  }

  console.log('JSON file has been saved.');
});
