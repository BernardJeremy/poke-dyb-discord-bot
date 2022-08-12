import { Message } from 'discord.js';
import * as usersModel from '../models/users';
import { wasBeforeDailyReset } from '../tools/utils';

const {
  COIN_EMOJI_ID,
  DAILY_GOLD_AMOUNT,
  DUST_EMOJI_ID,
  DAILY_DUST_AMOUNT,
} = process.env;

export default {
  name: '!journa',
  alias: '!daily',

  description: 'Récupère la récompense journalière',

  async execute(message: Message, messageContext: MessageContext) {
    let user = usersModel.getOneUser(messageContext.author.id);

    if (!user) {
      message.reply('User not found');
      return;
    }
    
    if (!user.lastDailyDate || wasBeforeDailyReset(user.lastDailyDate)) {
      user = usersModel.updateUser({
        ...user,
        gold: user.gold + parseInt(DAILY_GOLD_AMOUNT, 10),
        dust: user.dust + parseInt(DAILY_DUST_AMOUNT, 10),
        nbrDailyDone: user.nbrDailyDone + 1,
        lastDailyDate: new Date(),
      });
      const strReward = `${DAILY_GOLD_AMOUNT} ${COIN_EMOJI_ID} et ${DAILY_DUST_AMOUNT} ${DUST_EMOJI_ID}`;
      let strRewardBase = `Tu as récupéré ta récompense journalière de ${strReward}`;

      if (usersModel.isBonusUsable(user)) {
        strRewardBase += '\n**Ton `!bonus` est disponible !**';
      }

      message.reply(strRewardBase);

      return;
    }

    message.reply('Tu as déjà récupéré ta récompense journaliere.');
  },
};
