const pokedex = require('../data/pokedex.json');
const { countUnique } = require('../tools/utils');
const { getCleanUserPokedexArray } = require('../tools/pokemon');
const { writeToGoogleSheet } = require('../libs/googlesheet');

const {
  POKEDEX_SHEET_NAME,
} = process.env;

const HISTORY_EVENT_TYPE = {
  CRAFT: 'Craft',
  INVOC: 'Invocation',
  DEZ: 'Decraft',
};

const padId = (nbr) => String(nbr).padStart(3, '0');

const formatTargetPokedex = (targetPokedex) => [
  ['', 'ID', 'Nom', 'Type', 'Rareté (%)', 'Craft', '# Exemplaire'],
  ...targetPokedex.map((currentPokemon) => [
    `=IMAGE("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/thumbnails/${padId(currentPokemon.id)}.png")`,
    currentPokemon.id,
    currentPokemon.name,
    currentPokemon.types.join('/'),
    `${currentPokemon.rarityLevel > 0 ? currentPokemon.rarityLevel : '-'}`,
    `${currentPokemon.craftingPrice >= 0 ? currentPokemon.craftingPrice : '-'}`,
    currentPokemon.nbr || '',
  ]),
];

const updatePokedex = async () => writeToGoogleSheet(
  formatTargetPokedex(pokedex),
  POKEDEX_SHEET_NAME,
);

const updatePlayerSheet = async (userData) => {
  const cleanUserPokedex = getCleanUserPokedexArray(userData.pokedex);

  return writeToGoogleSheet(
    [
      ['Nom', 'Pokédollars', 'Poussières', '#Pokemon obtenus', 'Etage Tour Pokemon'],
      [userData.nickname || userData.username, userData.gold, userData.dust, `${countUnique(userData.pokedex)}`, userData.tower?.currentFloor],
      ['', '', '', '', '', '', ''],
      ['Pokemon acquis', '', '', '', '', '', ''],
      ...formatTargetPokedex(cleanUserPokedex),
      ['', '', '', '', '', '', ''],
      ['Pokemon manquants', '', '', '', '', '', ''],
      ...formatTargetPokedex(pokedex.filter(
        (currentPokemon) => !userData.pokedex.includes(currentPokemon.id),
      )),
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
    ],
    userData.username,
  );
};

module.exports = {
  updatePokedex,
  updatePlayerSheet,
  HISTORY_EVENT_TYPE,
};
