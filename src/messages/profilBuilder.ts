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
    { name: 'Poussière', value: `${dust} ${DUST_EMOJI_ID}`, inline: true },
    { name: 'Pokedex', value: `${countUnique(pokedex)}/${pokedexList.length}`, inline: true },
    { name: 'Tour Pokemon', value: `[Étage ${tower.currentFloor}] : ${tower.ticketsTotal} tentative(s) restante(s)`, inline: true },
  );

  if (currentReputation) {
    exampleEmbed.addFields({ name: 'Réputation Mr. Fuji', value: `${currentReputation.name} (${tower.reputation - (currentReputation.pointAccumulation + 1 - currentReputation.pointForNextLevel)} / ${currentReputation.pointForNextLevel})`, inline: true });
  }

  exampleEmbed.addFields({ name: '\u200B', value: '\u200B' });

  const formattedUserPokedex = getCleanUserPokedexArray(pokedex);

  exampleEmbed.addFields({
    name: 'Pokemon acquis',
    value: pokedex.length === 0
      ? 'Aucun :('
      : formattedUserPokedex.reduce((valueStr, currentPokemonObj) => `${valueStr.length > 0 ? `${valueStr}, ` : ''}#${currentPokemonObj.id} ${currentPokemonObj.nbr > 1 ? `(${currentPokemonObj.nbr})` : ''}`, ''),
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

export default buildProfil;
