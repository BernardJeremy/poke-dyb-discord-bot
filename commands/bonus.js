const usersModel = require('../models/users');

const {
  COIN_EMOJI_ID,
  BONUS_GOLD_AMOUNT,
  DUST_EMOJI_ID,
  BONUS_DUST_AMOUNT,
} = process.env;

module.exports = {
  name: '!bonus',
  alias: '!weekly',

  description: 'Récupère la récompense bonus',

  async execute(message, messageContext) {
    let user = usersModel.getOneUser(messageContext.author.id);

    if (usersModel.isBonusUsable(user)) {
      user = usersModel.updateUser({
        ...user,
        gold: user.gold + parseInt(BONUS_GOLD_AMOUNT, 10),
        dust: user.dust + parseInt(BONUS_DUST_AMOUNT, 10),
        nbrBonusDone: user.nbrBonusDone + 1,
      });

      const strReward = `${BONUS_GOLD_AMOUNT} ${COIN_EMOJI_ID} et ${BONUS_DUST_AMOUNT} ${DUST_EMOJI_ID}`;
      const strRewardBase = `Tu as récupéré ta récompense bonus de ${strReward}`;

      message.reply(strRewardBase);

      return;
    }

    message.reply(`Tu n'es pas éligible à la récompense bonus (encore **${usersModel.nbrDailyBeforeBonus(user)}** \`!journa\`).`);
  },
};
