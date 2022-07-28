require('dotenv').config();
const pokedex = require('../../data/pokedex.json');

const { readFromGoogleSheet, writeToGoogleSheet } = require('./googlesheet');

const padId = (nbr) => String(nbr).padStart(3, '0');

const formatPokedex = () => [
  ['', 'ID', 'Nom', 'Type', 'Rareté', 'Craft'],
  ...pokedex.map((currentPokemon) => [
    `=IMAGE("https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/thumbnails/${padId(currentPokemon.id)}.png")`,
    currentPokemon.id,
    currentPokemon.name,
    currentPokemon.types.join('/'),
    currentPokemon.rarityLevel,
    currentPokemon.craftingPrice,
  ]),
];

const main = async () => {
  //console.log(formatPokedex())
await writeToGoogleSheet(formatPokedex(), 'Pokedex');
//console.log(sheet);
const sheet = await readFromGoogleSheet('Pokedex');
console.log(sheet.data);
};

main();
