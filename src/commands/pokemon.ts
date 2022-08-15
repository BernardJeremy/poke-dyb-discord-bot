import { Message } from 'discord.js';
import buildCard from '../messages/cardBuilder';
import pokedex from '../data/pokedex.json';
import DisplayTypes from '../types/display.enum';

export default {
  name: '!pokemon',
  alias: '!info',
  allowedChannels: ['pokemon-info'],

  description: 'Affiche les infos du pokemon demandé',

  async execute(message: Message, messageContext: MessageContext) {
    if (!messageContext.args || messageContext.args.length < 1) {
      message.reply('format : !pokemon [nbr]');
      return;
    }

    const pokemonNbr = parseInt(messageContext.args[0], 10);

    if (Number.isNaN(pokemonNbr)) {
      message.reply('format : !pokemon [nbr]');
      return;
    }

    const pokemonObj = pokedex.at(pokemonNbr - 1);

    if (!pokemonObj) {
      message.reply('format : !pokemon [nbr]');
      return;
    }

    message.channel.send(buildCard(pokemonObj, { displayType: DisplayTypes.PokemonInfo }));
  },
};
