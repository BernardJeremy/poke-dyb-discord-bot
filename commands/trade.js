const usersModel = require('../models/users');
const tradesModel = require('../models/trades');

module.exports = {
  name: '!trade',
  alias: '!echange',

  description: 'Echange de cartes avec un autre joueur',

  async execute(message, messageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);

    if (messageContext.mentions.length < 1) {
      message.reply('format : !trade @member');
      return;
    }

    const tradedUser = usersModel.getOneUser(messageContext.mentions[0].id);
    const targetTrade = tradesModel.getOneTradeByOwnerId(tradedUser.id);

    if (!tradedUser) {
      message.reply('Joueur ciblé non trouvé');
      return;
    }

    if (!targetTrade) {
      message.reply('Ce joueurs n\'a pas de trade en cours');
      return;
    }

    for (let i = 0; i < targetTrade.demand.length; i += 1) {
      const currentDemand = targetTrade.demand[i];

      if (!user.pokedex.includes(currentDemand)) {
        message.reply(`Tu ne disposes pas de la carte #${currentDemand} !`);
        return;
      }
    }

    for (let i = 0; i < targetTrade.offer.length; i += 1) {
      const currentOffer = targetTrade.offer[i];

      if (!tradedUser.pokedex.includes(currentOffer)) {
        message.reply(`Le joueur ne dispose plus de la carte #${currentOffer} !`);
        return;
      }
    }

    targetTrade.offer.forEach((offeredId) => {
      tradedUser.pokedex = tradedUser.pokedex.filter((pokemonId) => pokemonId !== offeredId);
      user.pokedex.push(offeredId);
    });

    targetTrade.demand.forEach((demandedId) => {
      user.pokedex = user.pokedex.filter((pokemonId) => pokemonId !== demandedId);
      tradedUser.pokedex.push(demandedId);
    });

    usersModel.updateUser(tradedUser);
    usersModel.updateUser(user);
    tradesModel.deleteTrade(targetTrade);

    message.reply('Echange effectué, félicitation !');
  },
};
