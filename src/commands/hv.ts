import { Message } from 'discord.js';
import * as usersModel from '../models/users';
import * as tradesModel from '../models/trades';

export default {
  name: '!hv',

  description: 'Propose un ou plusieurs pokemon à l\'échange',

  async execute(message: Message, messageContext: MessageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);
    const currentUserTrade = tradesModel.getOneTradeByOwnerId(messageContext.author.id);

    if (!user) {
      message.reply('User not found');
      return;
    }

    // TRADE INFO
    if (!messageContext.args || messageContext.args.length === 0) {
      if (currentUserTrade) {
        message.reply(`Ton trade actuellement proposé : ${currentUserTrade.tradeStr}`);
        return;
      }

      message.reply('Tu n\'as pas de trade actuellement en cours');
      return;
    }

    // TRADE STOP
    if (messageContext.args && messageContext.args.length === 1 && messageContext.args[0] === 'stop') {
      if (currentUserTrade) {
        tradesModel.deleteTrade(currentUserTrade);
        message.reply('Ton trade a été supprimé');
        return;
      }

      message.reply('Tu n\'as pas de trade actuellement en cours');
      return;
    }

    // TRADE FORMAT ERROR
    if (messageContext.args.length && (messageContext.args.length > 1 || !messageContext.args[0]?.includes('<=>'))) {
      message.reply('format : `!hv 1+45+78<=>150+10` (sans espace dans les paramètres)');
      return;
    }

    // ALREADY HAS A TRADE
    if (currentUserTrade) {
      message.reply(`Tu as déja un trade en cours : ${currentUserTrade.tradeStr} (\`!hv stop\` pour l'arréter)`);
      return;
    }

    // TRADE CREATE
    const tradeStrArray = messageContext.args[0].split('<=>');
    const offer = tradeStrArray[0].split('+')
      .filter((currentOffer) => currentOffer)
      .map((currentOffer) => parseInt(currentOffer, 10))
      .filter((currentOffer) => !Number.isNaN(currentOffer));
    const demand = tradeStrArray[1].split('+')
      .filter((currentDemand) => currentDemand)
      .map((currentDemand) => parseInt(currentDemand, 10))
      .filter((currentDemand) => !Number.isNaN(currentDemand));

    if (!offer.length || !demand.length) {
      message.reply('format : `!hv 1+45+78<=>150+10` (sans espace dans les paramètres)');
      return;
    }

    for (let i = 0; i < offer.length; i += 1) {
      const currentOffer = offer[i];

      if (!user.pokedex.includes(currentOffer)) {
        message.reply(`Tu ne disposes pas du pokemon #${currentOffer}`);
        return;
      }
    }

    tradesModel.createTrade({
      tradeStr: messageContext.args[0],
      ownerId: user.id,
      offer,
      demand,
    });
    message.reply('Pokemon proposée(s) à l\'échange, merci !');
  },
};
