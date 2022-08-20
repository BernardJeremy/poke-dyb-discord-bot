import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  MessageActionRowComponentBuilder,
} from 'discord.js';
import * as userModel from '../models/users';
import { getAverageRatio, getPokedexStatByUsers } from '../tools/stats';
import completePokedex from '../data/pokedex.json';
import { RatioActionTypes } from '../types/stats.types';
import { getNowDateTimeFormated } from '../tools/utils';

const buildRatio = () => {
  const exampleEmbed = new EmbedBuilder()
    .setTitle(`Ratio RNG @ ${getNowDateTimeFormated()}`)
    .setAuthor(
      {
        name: 'PokeDyB Bot',
        iconURL: 'https://cdn.discordapp.com/avatars/1001095363014430830/10fa5834935741b1226202a112b10ecd.png?size=256',
      },
    );

  const buttons = new ActionRowBuilder<MessageActionRowComponentBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(RatioActionTypes.REFRESH)
        .setLabel('Rafraichir')
        .setStyle(ButtonStyle.Primary),
    );

  const allUsers = userModel.getAllUsers();
  const allUsersStats = getPokedexStatByUsers(allUsers);

  allUsersStats.sort((a, b) => (
    a.invocSuccessPercent > b.invocSuccessPercent ? -1 : 1
  )).forEach((userStat) => {
    exampleEmbed.addFields(
      { name: userStat.name, value: (`[${userStat.nbrPokemon}/${completePokedex.length}]  ${userStat.invocSuccessPercent}% (${userStat.invocSuccess}/${userStat.invoc}) Invoc new / ${userStat.towerSuccessPercent}% (${userStat.towerSuccess}/${userStat.tower}) Tour / ${userStat.safariSuccessPercent}% (${userStat.safariSuccess}/${userStat.safari}) Safari`) },
    );
  });

  const averageRatio = getAverageRatio(allUsers);

  exampleEmbed.addFields(
    { name: 'EN MOYENNE', value: (`${averageRatio.invocSuccessPercentage}% (${averageRatio.invocSuccess}/${averageRatio.invoc}) Invoc new / ${averageRatio.towerSuccessPercentage}% (${averageRatio.towerSuccess}/${averageRatio.tower}) Tour / ${averageRatio.safariSuccessPercentage}% (${averageRatio.safariSuccess}/${averageRatio.safari}) Safari`) },
  );

  return {
    components: [buttons],
    embeds: [exampleEmbed],
  };
};

export default buildRatio;
