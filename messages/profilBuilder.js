const { EmbedBuilder } = require('discord.js');

const pokedexList = require('../data/pokedex.json');

const {
  DUST_EMOJI_ID,
  COIN_EMOJI_ID,
} = process.env;

const countUnique = (iterable) => new Set(iterable).size;

const buildProfil = ({
  username,
  nickname,
  pokedex,
  gold,
  dust,
}) => {
  const exampleEmbed = new EmbedBuilder()
    .setTitle(nickname || username)
    .setAuthor(
      {
        name: `${username}`,
        iconURL: 'https://icon-library.com/images/pokemon-pokeball-icon/pokemon-pokeball-icon-2.jpg',
      },
    );

  exampleEmbed.addFields(
    { name: 'Argent', value: `${gold} ${COIN_EMOJI_ID}`, inline: true },
    { name: 'Poussière', value: `${dust} ${DUST_EMOJI_ID}`, inline: true },
    { name: 'Pokedex', value: `${countUnique(pokedex)}/${pokedexList.length}`, inline: true },
  );

  exampleEmbed.addFields({ name: '\u200B', value: '\u200B' });

  exampleEmbed.addFields({
    name: 'Pokemon acquis',
    value: pokedex.length === 0
      ? 'Aucun :('
      : pokedex.sort((a, b) => a - b).reduce((acc, curr) => `${acc.length > 0 ? `${acc}, ` : ''}#${curr}`, ''),
  });

  exampleEmbed.addFields({
    name: 'Pokemon manquants',
    value: pokedexList.reduce((acc, curr) => {
      if (!pokedex.includes(curr.id)) {
        return `${acc.length > 0 ? `${acc}, ` : ''}#${curr.id}`;
      }
      return acc;
    }, ''),
  });

  return { embeds: [exampleEmbed] };
};

module.exports = buildProfil;
