const fs = require('fs');
const basePokedex = require('../src/data/pokedex.json');
const baseTypes = require('../src/data/types.json');

const colours = {
  Normal: '#A8A77A',
  Fire: '#EE8130',
  Water: '#6390F0',
  Electric: '#F7D02C',
  Grass: '#7AC74C',
  Ice: '#96D9D6',
  Fighting: '#C22E28',
  Poison: '#A33EA1',
  Ground: '#E2BF65',
  Flying: '#A98FF3',
  Psychic: '#F95587',
  Bug: '#A6B91A',
  Rock: '#B6A136',
  Ghost: '#735797',
  Dragon: '#6F35FC',
  Dark: '#705746',
  Steel: '#B7B7CE',
  Fairy: '#D685AD',
};

const newPokedex = basePokedex.map((pokemonData) => ({
  ...pokemonData,
  color: colours[baseTypes.find(
    (currentBaseType) => currentBaseType.french === pokemonData.types[0],
  ).english],
  rarityLevel: 100,
  craftingPrice: 20,
}));

const jsonContent = JSON.stringify(newPokedex);
fs.writeFile('output.json', jsonContent, 'utf8', (err) => {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    console.log(err);
    return;
  }

  console.log('JSON file has been saved.');
});