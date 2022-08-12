const buildCard = require('../messages/cardBuilder');
const pokedex = require('../data/pokedex.json');

module.exports = {
  name: '!pokemon',
  alias: '!info',

  description: 'Affiche les infos du pokemon demandé',

  async execute(message, messageContext) {
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

    message.channel.send(buildCard(pokemonObj, { catched: false }));
  },
};
