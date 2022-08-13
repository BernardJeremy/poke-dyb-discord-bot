import { EmbedBuilder } from 'discord.js';
import * as userModel from '../models/users';
import { getPokedexStatByUsers } from '../tools/stats';
import completePokedex from '../data/pokedex.json';

const {
  DUST_EMOJI_ID,
} = process.env;

const buildStats = () => {
  const exampleEmbed = new EmbedBuilder()
    .setTitle('Statistiques Pokedex')
    .setAuthor(
      {
        name: 'PokeDyB Bot',
        iconURL: 'https://cdn.discordapp.com/avatars/1001095363014430830/10fa5834935741b1226202a112b10ecd.png?size=256',
      },
    );
  const allUsers = userModel.getAllUsers();
  const allUsersStats = getPokedexStatByUsers(allUsers);

  allUsersStats.sort((a, b) => (a.nbrPokemon > b.nbrPokemon ? -1 : 1)).forEach((userStat) => {
    exampleEmbed.addFields(
      { name: userStat.name, value: (`[${userStat.nbrPokemon}/${completePokedex.length}] : ${userStat.totalCostUserPokemon} ${DUST_EMOJI_ID}`) },
    );
  });

  return { embeds: [exampleEmbed] };
};

export default buildStats;
