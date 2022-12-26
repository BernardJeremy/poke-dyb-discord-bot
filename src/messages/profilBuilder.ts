import { EmbedBuilder } from 'discord.js';

import pokedexList from '../data/pokedex.json';
import towerData from '../data/tower.json';

import { getCleanUserPokedexArray } from '../tools/pokemon';
import { countUnique } from '../tools/utils';

const {
  DUST_EMOJI_ID,
  COIN_EMOJI_ID,
} = process.env;

const buildProfil = ({
  username,
  nickname,
  pokedex,
  gold,
  dust,
  tickets,
  tower,
}: User) => {
  const exampleEmbed = new EmbedBuilder()
    .setTitle(nickname || username)
    .setAuthor(
      {
        name: `${username}`,
        iconURL: 'https://icon-library.com/images/pokemon-pokeball-icon/pokemon-pokeball-icon-2.jpg',
      },
    );

  const currentReputation = towerData.reputations.find((reputation) => (
    tower.reputation <= reputation.pointAccumulation
  ));

  exampleEmbed.addFields(
    { name: 'Pokédollars', value: `${gold} ${COIN_EMOJI_ID}`, inline: true },
    { name: 'Poussières', value: `${dust} ${DUST_EMOJI_ID}`, inline: true },
    { name: 'Tickets', value: `${tickets} 🎫`, inline: true },
    { name: 'Pokedex', value: `${countUnique(pokedex)}/${pokedexList.length}` },
    { name: 'Tour Pokemon', value: `[Étage ${tower.currentFloor}] : ${tower.ticketsTotal} tentative(s) restante(s)`, inline: true },
  );

  if (currentReputation) {
    if (currentReputation.id < towerData.reputations.length) {
      exampleEmbed.addFields({ name: 'Réputation Mr. Fuji', value: `${currentReputation.name} (${tower.reputation - (currentReputation.pointAccumulation + 1 - currentReputation.pointForNextLevel)} / ${currentReputation.pointForNextLevel})`, inline: true });
    } else {
      exampleEmbed.addFields({ name: 'Réputation Mr. Fuji', value: `${currentReputation.name}`, inline: true });
    }
  }

  exampleEmbed.addFields({ name: '\u200B', value: '\u200B' });

  const formattedUserPokedex = getCleanUserPokedexArray(pokedex);

  exampleEmbed.addFields({
    name: 'Pokemon acquis / manquants',
    value: pokedex.length === 0
      ? 'Aucun :('
      : 'Liste impossible à charger, trop de données. Voir le GDOC. Une solution est en cours de developpement.',
    // eslint-disable-next-line max-len
    // : formattedUserPokedex.reduce((valueStr, currentPokemonObj) => `${valueStr.length > 0 ? `${valueStr}, ` : ''}#${currentPokemonObj.id} ${currentPokemonObj.nbr > 1 ? `(${currentPokemonObj.nbr})` : ''}`, ''),
  });

  /* exampleEmbed.addFields({
    name: 'Pokemon manquants',
    value: pokedexList.reduce((acc, curr) => {
      if (!pokedex.includes(curr.id)) {
        return `${acc.length > 0 ? `${acc},` : ''}#${curr.id}`;
      }
      return acc;
    }, ''),
  }); */

  return { embeds: [exampleEmbed] };
};

export default buildProfil;
