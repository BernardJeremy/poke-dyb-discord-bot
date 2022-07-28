const usersModel = require('../models/users');
const dateTimeUtils = require('../tools/utils');

const {
  COIN_EMOJI_ID,
  DAILY_GOLD_AMOUNT,
  DUST_EMOJI_ID,
  DAILY_DUST_AMOUNT,
} = process.env;

module.exports = {
  name: '!journa',
  alias: '!daily',

  description: 'Récupère la récompense journalière',

  async execute(message, messageContext) {
    let user = usersModel.getOneUser(messageContext.author.id);

    if (!user.lastDailyDate || dateTimeUtils.wasBeforeDailyReset(user.lastDailyDate)) {
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
