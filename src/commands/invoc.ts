import { Message } from 'discord.js';
import buildCard from '../messages/cardBuilder';
import { getRandomPokemon } from '../tools/pokemon';
import * as usersModel from '../models/users';

const {
  COIN_EMOJI_ID,
} = process.env;

const GOLD_COST_INVOC = 500;

export default {
  name: '!invoc',

  description: 'Invoque un pokemon aléatoire',

  async execute(message: Message, messageContext: MessageContext) {
    let user = usersModel.getOneUser(messageContext.author.id);

    if (!user) {
      message.reply('User not found');
      return;
    }

    if (user.gold < GOLD_COST_INVOC) {
      message.reply(`Tu n'as pas assez de ${COIN_EMOJI_ID} pour invoquer, il te faut ${GOLD_COST_INVOC} ${COIN_EMOJI_ID}`);
      return;
    }

    let pokemonObj = getRandomPokemon();
    // If user already has this pokemon, try a second time;
    if (user.pokedex.includes(pokemonObj.id)) {
      pokemonObj = getRandomPokemon();
    }

    user.pokedex.push(pokemonObj.id);
    user = usersModel.updateUser({
      ...user,
      gold: user.gold - GOLD_COST_INVOC,
    });

    message.reply(`Tu as invoqué **[#${pokemonObj.id}] ${pokemonObj.name}**. Tu en as ${user.pokedex.filter((pokemon) => pokemonObj.id === pokemon).length}. Il te reste ${user.gold} ${COIN_EMOJI_ID}`);
    message.channel.send(buildCard(pokemonObj, { catched: true }));
  },
};
