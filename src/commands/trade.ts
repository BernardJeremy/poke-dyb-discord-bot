import { Message } from 'discord.js';
import * as usersModel from '../models/users';
import * as tradesModel from '../models/trades';
import { removePokemonFromList } from '../tools/pokemon';

export default {
  name: '!trade',
  alias: '!echange',

  description: 'Echange de pokemon avec un autre joueur',

  async execute(message: Message, messageContext: MessageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);

    if (!user) {
      message.reply('User not found');
      return;
    }

    if (messageContext.mentions.length < 1) {
      message.reply('format : !trade @member');
      return;
    }

    const tradedUser = usersModel.getOneUser(messageContext.mentions[0].id);

    if (!tradedUser) {
      message.reply('Traded user not found');
      return;
    }

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
        message.reply(`Tu ne disposes pas du pokemon #${currentDemand} !`);
        return;
      }
    }

    for (let i = 0; i < targetTrade.offer.length; i += 1) {
      const currentOffer = targetTrade.offer[i];

      if (!tradedUser.pokedex.includes(currentOffer)) {
        message.reply(`Le joueur ne dispose plus du pokemon #${currentOffer} !`);
        return;
      }
    }

    targetTrade.offer.forEach((offeredId) => {
      tradedUser.pokedex = removePokemonFromList(tradedUser.pokedex, offeredId, 1);
      user.pokedex.push(offeredId);
    });

    targetTrade.demand.forEach((demandedId) => {
      user.pokedex = removePokemonFromList(user.pokedex, demandedId, 1);
      tradedUser.pokedex.push(demandedId);
    });

    usersModel.updateUser(tradedUser);
    usersModel.updateUser(user);
    tradesModel.deleteTrade(targetTrade);

    message.reply(`Echange \`${targetTrade.tradeStr}\` effectué, félicitation !`);
  },
};
