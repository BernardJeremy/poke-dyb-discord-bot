import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageActionRowComponentBuilder,
} from 'discord.js';
import * as userModel from '../models/users';
import completePokedex from '../data/pokedex.json';
import { LivedexActionTypes } from '../types/stats.types';
import { getCleanUserPokedexArray } from '../tools/pokemon';
import { getNowDateTimeFormated } from '../tools/utils';

const buildLivedex = () => {
  const buttons = new ActionRowBuilder<MessageActionRowComponentBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(LivedexActionTypes.REFRESH)
        .setLabel('Rafraichir')
        .setStyle(ButtonStyle.Primary),
    );

  const allUsers = userModel.getAllUsers().map((user) => ({
    ...user,
    pokedex: getCleanUserPokedexArray(user.pokedex),
  }));

  const content = completePokedex.reduce((accContent, currentPokemon) => {
    const playerList = allUsers.reduce((accPlayerList, user) => {
      const currentUserPokemon: UserPokemon | undefined = user.pokedex.find(
        (userPokemon) => userPokemon.id === currentPokemon.id,
      );

      if (!currentUserPokemon) {
        return accPlayerList;
      }

      return `${accPlayerList}- ${user.nickname || user.username}${currentUserPokemon.nbr > 1 ? ` (${currentUserPokemon.nbr})` : ''}
`;
    }, '');

    if (!playerList) return accContent;

    return `${accContent}* [#${currentPokemon.id}] ${currentPokemon.name}
${playerList}

`;
  }, '');

  return {
    content: `**Livedex @ ${getNowDateTimeFormated()}**`,
    files: [{
      attachment: Buffer.from(content),
      name: 'Livedex.accesslog',
    }],
    components: [buttons],
  };
};

export default buildLivedex;
