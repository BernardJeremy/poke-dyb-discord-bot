import { Message } from 'discord.js';
import buildCard from '../messages/cardBuilder';
import { getRandomPokemon } from '../tools/pokemon';
import * as usersModel from '../models/users';
import DisplayTypes from '../types/display.enum';

const {
  COIN_EMOJI_ID,
} = process.env;

const GOLD_COST_INVOC = 500;

export default {
  name: '!invoc',
  allowedChannels: ['invoc-craft-dez'],

  description: 'Invoque un pokemon aléatoire',

  async execute(message: Message, messageContext: MessageContext) {
    let user = usersModel.getOneUser(messageContext.author.id);
    const usersList = usersModel.getAllUsers();

    if (!user) {
      message.reply('User not found');
      return;
    }

    if (user.gold < GOLD_COST_INVOC) {
      message.reply(`Tu n'as pas assez de ${COIN_EMOJI_ID} pour invoquer, il te faut ${GOLD_COST_INVOC} ${COIN_EMOJI_ID}`);
      return;
    }

    let pokemonObj = getRandomPokemon();
    const alreadyHasIt = user.pokedex.includes(pokemonObj.id);
    // If user already has this pokemon, try a second time;
    if (alreadyHasIt) {
      pokemonObj = getRandomPokemon();
    }

    user.pokedex.push(pokemonObj.id);
    user = usersModel.updateUser({
      ...user,
      gold: user.gold - GOLD_COST_INVOC,
      ratio: {
        ...user.ratio,
        invoc: user.ratio.invoc + 1,
        invocSuccess:
          !alreadyHasIt
            ? user.ratio.invocSuccess + 1
            : user.ratio.invocSuccess,
      },
    });

    message.reply(`Tu as invoqué **[#${pokemonObj.id}] ${pokemonObj.name}**. Tu en as ${user.pokedex.filter((pokemon) => pokemonObj.id === pokemon).length}. Il te reste ${user.gold} ${COIN_EMOJI_ID}`);
    message.channel.send(buildCard(pokemonObj, { displayType: DisplayTypes.CaughtPokemon }));

    const totalInvoc = usersList.reduce((total, oneUser) => (
      oneUser.ratio.invoc + total
    ), 0);

    if (totalInvoc % 1000 === 0) {
      usersModel.updateUser({
        ...user,
        claims: {
          ...user.claims,
          gold: user.claims.gold + 1000,
        },
      });
      message.channel.send(`${message.author} vient de réaliser la ${totalInvoc}eme invocations ! Il obtient une récompense de 1000 ${COIN_EMOJI_ID} !`);
    }
  },
};
