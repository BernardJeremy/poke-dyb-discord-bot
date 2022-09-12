import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageActionRowComponentBuilder,
} from 'discord.js';
import * as userModel from '../models/users';
import completePokedex from '../data/pokedex.json';
import { OptiHvActionTypes } from '../types/stats.types';
import { getCleanUserPokedexArray } from '../tools/pokemon';
import { getNowDateTimeFormated } from '../tools/utils';

const buildOptiHv = () => {
  const buttons = new ActionRowBuilder<MessageActionRowComponentBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(OptiHvActionTypes.REFRESH)
        .setLabel('Rafraichir')
        .setStyle(ButtonStyle.Primary),
    );

  const allUsers = userModel.getAllUsers().map((user) => ({
    ...user,
    pokedex: getCleanUserPokedexArray(user.pokedex),
  }));

  const content: string = allUsers.reduce((accPlayerList, currentUser) => {
    const currentUserMissingPokemonList = completePokedex.filter(
      (currentPokemon) => !currentUser.pokedex.some(
        (currentUserPokemon) => currentUserPokemon.id === currentPokemon.id,
      ),
    );
    const currentUserMultiplePokemonList: UserPokemon[] = currentUser.pokedex.filter(
      (currentUserPokemon) => currentUserPokemon.nbr > 1,
    );
    if (currentUserMissingPokemonList.length === 0 || currentUserMultiplePokemonList.length === 0) {
      return `${accPlayerList}
> ${currentUser.nickname || currentUser.username} <
`;
    }

    const formatPokemonDisplay = (pokemonObj: Pokemon | UserPokemon) => `- [#${pokemonObj.id}] ${pokemonObj.name} (${pokemonObj.nbr && pokemonObj.nbr > 1 ? `En a ${pokemonObj.nbr} / ` : ''}${pokemonObj.craftingPrice} Dust / ${pokemonObj.rarityLevel}%) `;

    const optiTradeListStr: string = allUsers.reduce((accOptiTrades, tradedUser) => {
      if (tradedUser.id === currentUser.id) {
        return accOptiTrades;
      }

      const tradedUserMissingPokemonList = completePokedex.filter(
        (currentPokemon) => !tradedUser.pokedex.some(
          (currentUserPokemon) => currentUserPokemon.id === currentPokemon.id,
        ),
      );
      const tradedUserMultiplePokemonList: UserPokemon[] = tradedUser.pokedex.filter(
        (currentUserPokemon) => currentUserPokemon.nbr > 1,
      );

      const tradedUserUsefullPokemonList: UserPokemon[] = tradedUserMultiplePokemonList.filter(
        (currentPokemon) => currentUserMissingPokemonList.some(
          (currentUserPokemon) => currentUserPokemon.id === currentPokemon.id,
        ),
      );

      const tradedUserUsefullPokemonStr: string = tradedUserUsefullPokemonList.reduce((accStr, currentPokemon) => `${accStr}
${formatPokemonDisplay(currentPokemon)}`, '');

      const tradedUserCouldUsePokemonList: Pokemon[] = tradedUserMissingPokemonList.filter(
        (currentPokemon) => currentUserMultiplePokemonList.some(
          (currentUserPokemon) => currentUserPokemon.id === currentPokemon.id,
        ),
      );

      const tradedUserCouldUsePokemonStr: string = tradedUserCouldUsePokemonList.reduce((accStr, currentPokemon) => `${accStr}
${formatPokemonDisplay(currentPokemon)}`, '');

      if (!tradedUserUsefullPokemonStr || !tradedUserCouldUsePokemonStr) {
        return accOptiTrades;
      }

      return `${accOptiTrades}
[${tradedUser.nickname || tradedUser.username}] peut proposer : ${tradedUserUsefullPokemonStr}
[${currentUser.nickname || currentUser.username}] aurait alors besoin : ${tradedUserCouldUsePokemonStr}
`;
    }, '');

    return `${accPlayerList}
> ${currentUser.nickname || currentUser.username} <
${optiTradeListStr}`;
  }, '');

  return {
    content: `**HV Opti @ ${getNowDateTimeFormated()}**`,
    files: [{
      attachment: Buffer.from(content),
      name: 'Livedex.accesslog',
    }],
    components: [buttons],
  };
};

export default buildOptiHv;
