const usersModel = require('../models/users');
const dateTimeUtils = require('../tools/dateTime');

const {
  COIN_EMOJI_ID,
  DAILY_GOLD_AMOUNT,
  DUST_EMOJI_ID,
  DAILY_DUST_AMOUNT,
} = process.env;

module.exports = {
  name: '!journa',

  description: 'Récupère la récompense journalière',

  async execute(message, messageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);

    if (!user.lastDailyDate || dateTimeUtils.wasBeforeDailyReset(user.lastDailyDate)) {
      usersModel.updateUser({
        ...user,
        gold: user.gold + parseInt(DAILY_GOLD_AMOUNT, 10),
        dust: user.dust + parseInt(DAILY_DUST_AMOUNT, 10),
        lastDailyDate: new Date(),
      });
      const strReward = `${DAILY_GOLD_AMOUNT} ${COIN_EMOJI_ID} et ${DAILY_DUST_AMOUNT} ${DUST_EMOJI_ID}`;
      message.reply(`Tu as récupéré ta récompense journalière de ${strReward}`);

      return;
    }

    message.reply('Tu as déjà récupéré ta récompense journaliere.');
  },
};
