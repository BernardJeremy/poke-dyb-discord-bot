const pokedex = require('../data/pokedex.json');

const { writeToGoogleSheet } = require('./google/googlesheet');

const {
  POKEDEX_SHEET_NAME,
} = process.env;

const padId = (nbr) => String(nbr).padStart(3, '0');

const formatTargetPokedex = (targetPokedex) => [
  ['', 'ID', 'Nom', 'Type', 'Rareté', 'Craft'],
  ...targetPokedex.map((currentPokemon) => [
    `=IMAGE("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/thumbnails/${padId(currentPokemon.id)}.png")`,
    currentPokemon.id,
    currentPokemon.name,
    currentPokemon.types.join('/'),
    currentPokemon.rarityLevel,
    currentPokemon.craftingPrice,
  ]),
];

const updatePokedex = async () => writeToGoogleSheet(
  formatTargetPokedex(pokedex),
  POKEDEX_SHEET_NAME,
);

module.exports = {
  updatePokedex,
};
