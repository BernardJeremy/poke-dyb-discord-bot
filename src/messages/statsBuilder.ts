import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  MessageActionRowComponentBuilder,
} from 'discord.js';
import * as userModel from '../models/users';
import { getPokedexStatByUsers } from '../tools/stats';
import completePokedex from '../data/pokedex.json';
import { StatsActionTypes } from '../types/stats.types';
import { getNowDateTimeFormated } from '../tools/utils';

const {
  COIN_EMOJI_ID,
  DUST_EMOJI_ID,
} = process.env;

const buildStats = () => {
  const exampleEmbed = new EmbedBuilder()
    .setTitle(`Pokedex & Inventaire @ ${getNowDateTimeFormated()}`)
    .setAuthor(
      {
        name: 'PokeDyB Bot',
        iconURL: 'https://cdn.discordapp.com/avatars/1001095363014430830/10fa5834935741b1226202a112b10ecd.png?size=256',
      },
    );

  const buttons = new ActionRowBuilder<MessageActionRowComponentBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(StatsActionTypes.REFRESH)
        .setLabel('Rafraichir')
        .setStyle(ButtonStyle.Primary),
    );

  const allUsers = userModel.getAllUsers();
  const allUsersStats = getPokedexStatByUsers(allUsers);

  allUsersStats.sort((a, b) => (a.nbrPokemon > b.nbrPokemon ? -1 : 1)).forEach((userStat) => {
    exampleEmbed.addFields(
      { name: userStat.name, value: (`[${userStat.nbrPokemon}/${completePokedex.length} : ${userStat.totalCostUserPokemon} ${DUST_EMOJI_ID}] / ${userStat.gold} ${COIN_EMOJI_ID} / ${userStat.dust} ${DUST_EMOJI_ID} / ${userStat.tickets} 🎫 / ${userStat.towerTryRemaining} 🏰`) },
    );
  });

  return {
    components: [buttons],
    embeds: [exampleEmbed],
  };
};

export default buildStats;
