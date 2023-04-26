const fs = require('fs');
const basePokedex = require('./output.json');
const craftingRarityData = require('./crafting_rarity_gen-4.json');

const newPokedex = basePokedex.map((pokemonData) => ({
  ...pokemonData,
  rarityLevel: craftingRarityData.find((data) => data.id === pokemonData.id).rarityLevel || 0,
  craftingPrice: craftingRarityData.find((data) => data.id === pokemonData.id).craftingPrice || -1,
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
