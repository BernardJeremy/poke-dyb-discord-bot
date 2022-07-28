const pokedex = require('../data/pokedex.json');
const { countUnique } = require('../tools/utils');
const { getCleanUserPokedexArray } = require('../tools/pokemon');
const { writeToGoogleSheet } = require('./google/googlesheet');

const {
  POKEDEX_SHEET_NAME,
} = process.env;

const padId = (nbr) => String(nbr).padStart(3, '0');

const formatTargetPokedex = (targetPokedex) => [
  ['', 'ID', 'Nom', 'Type', 'Rareté', 'Craft', '# Exemplaire'],
  ...targetPokedex.map((currentPokemon) => [
    `=IMAGE("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/thumbnails/${padId(currentPokemon.id)}.png")`,
    currentPokemon.id,
    currentPokemon.name,
    currentPokemon.types.join('/'),
    currentPokemon.rarityLevel,
    currentPokemon.craftingPrice,
    currentPokemon.nbr || '',
  ]),
];

const updatePokedex = async () => writeToGoogleSheet(
  formatTargetPokedex(pokedex),
  POKEDEX_SHEET_NAME,
);

const updatePlayerSheet = async (userData) => writeToGoogleSheet(
  [
    ['Nom', 'Argent', 'Poussières', '#Pokemon obtenus'],
    [userData.nickname || userData.username, userData.gold, userData.dust, `${countUnique(userData.pokedex)}`],
    [],
    ['Pokemon acquis'],
    ...formatTargetPokedex(getCleanUserPokedexArray(userData.pokedex)),
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
    ['', '', '', '', '', '', ''],
  ],
  userData.username,
);

module.exports = {
  updatePokedex,
  updatePlayerSheet,
};
