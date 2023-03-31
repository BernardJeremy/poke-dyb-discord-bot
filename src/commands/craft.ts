import { Message } from 'discord.js';
import buildCard from '../messages/cardBuilder';
import pokedex from '../data/pokedex.json';
import * as usersModel from '../models/users';
import DisplayTypes from '../types/display.enum';

const {
  DUST_EMOJI_ID,
} = process.env;

export default {
  name: '!craft',
  allowedChannels: ['invoc-craft-dez'],

  description: 'Craft le pokemon demandée',

  async execute(message: Message, messageContext: MessageContext) {
    if (!messageContext.args || messageContext.args.length < 1) {
      message.reply('format : !craft [nbr]');
      return;
    }

    const pokemonNbr = parseInt(messageContext.args[0], 10);

    if (Number.isNaN(pokemonNbr)) {
      message.reply('format : !craft [nbr]');
      return;
    }

    const pokemonObj = pokedex.at(pokemonNbr - 1);

    if (!pokemonObj) {
      message.reply('format : !craft [nbr]');
      return;
    }

    if (pokemonObj.craftingPrice < 0) {
      message.reply('Ce pokemon n\'est pas craftable, désolé. Bonne chance dans les `!invoc` !');
      return;
    }

    let user = usersModel.getOneUser(messageContext.author.id);

    if (!user) {
      message.reply('User not found');
      return;
    }

    if (pokemonObj.craftingPrice > user.dust) {
      message.reply(`Tu n'as pas assez de ${DUST_EMOJI_ID}, il te faut ${pokemonObj.craftingPrice} ${DUST_EMOJI_ID}`);
      return;
    }

    user.pokedex.push(pokemonObj.id);
    user = usersModel.updateUser({
      ...user,
      dust: user.dust - pokemonObj.craftingPrice,
    });

    message.reply(`Tu as craft **[#${pokemonObj.id}] ${pokemonObj.name}**, il te reste ${user.dust} ${DUST_EMOJI_ID}`);
    message.channel.send(buildCard(pokemonObj, { displayType: DisplayTypes.CaughtPokemon }));
  },
};
