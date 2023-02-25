import pokedex from '../data/pokedex.json';
import { countUnique } from '../tools/utils';
import { getCleanUserPokedexArray } from '../tools/pokemon';
import { writeToGoogleSheet } from '../libs/googlesheet';

const {
  POKEDEX_SHEET_NAME,
} = process.env;

const padId = (nbr: number) => String(nbr).padStart(3, '0');

const formatTargetPokedex = (targetPokedex: Pokemon[]) => [
  ['', 'ID', 'Nom', 'Type', 'Rareté (%)', 'Craft', '# Exemplaire'],
  ...targetPokedex.map((currentPokemon) => [
    `=IMAGE("https://raw.githubusercontent.com/BernardJeremy/pokemon.json/master/thumbnails/${padId(currentPokemon.id)}.png")`,
    currentPokemon.id,
    currentPokemon.name,
    currentPokemon.types.join('/'),
    `${currentPokemon.rarityLevel > 0 ? currentPokemon.rarityLevel : 0}`,
    `${currentPokemon.craftingPrice >= 0 ? currentPokemon.craftingPrice : -1}`,
    currentPokemon.nbr || '',
  ]),
];

const updatePokedex = async () => writeToGoogleSheet(
  formatTargetPokedex(pokedex),
  POKEDEX_SHEET_NAME,
);

const updatePlayerSheet = async (userData: User) => {
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

export default {
  updatePokedex,
  updatePlayerSheet,
};
