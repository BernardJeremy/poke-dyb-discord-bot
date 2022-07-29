const pokedex = require('../data/pokedex.json');
const { countUnique, getTodayDateFormated } = require('../tools/utils');
const { getCleanUserPokedexArray } = require('../tools/pokemon');
const { writeToGoogleSheet, appendToGoogleSheet } = require('../libs/googlesheet');

const {
  POKEDEX_SHEET_NAME,
  HISTORY_SHEET_NAME,
} = process.env;

const HISTORY_EVENT_TYPE = {
  CRAFT: 'Craft',
  INVOC: 'Invocation',
  DEZ: 'Decraft',
};

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

const updatePlayerSheet = async (userData) => {
  const cleanUserPokedex = getCleanUserPokedexArray(userData.pokedex);

  return writeToGoogleSheet(
    [
      ['Nom', 'Argent', 'Poussières', '#Pokemon obtenus'],
      [userData.nickname || userData.username, userData.gold, userData.dust, `${countUnique(userData.pokedex)}`],
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

const addElementHistory = async ({ eventType, userData, pokemonData }) => appendToGoogleSheet(
  [
    [
      getTodayDateFormated(),
      eventType,
      userData.nickname || userData.username,
      `=IMAGE("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/thumbnails/${padId(pokemonData.id)}.png")`,
      pokemonData.id,
      pokemonData.name,
      pokemonData.rarityLevel,
      pokemonData.craftingPrice,
    ],
  ],
  `${HISTORY_SHEET_NAME}`,
);

module.exports = {
  updatePokedex,
  updatePlayerSheet,
  addElementHistory,
  HISTORY_EVENT_TYPE,
};
