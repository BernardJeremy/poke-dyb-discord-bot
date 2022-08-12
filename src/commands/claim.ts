
import { Message } from 'discord.js';
import * as usersModel from '../models/users';

const {
  COIN_EMOJI_ID,
  DUST_EMOJI_ID,
} = process.env;

export default {
  name: '!claim',
  alias: '!cadeau',

  description: 'Récupère les récompenses exceptionnelles',

  async execute(message: Message, messageContext: MessageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);

    if (!user) {
      message.reply('User not found');
      return;
    }

    if (usersModel.hasClaims(user)) {
      usersModel.updateUser({
        ...user,
        gold: user.gold + user.claims.gold,
        dust: user.dust + user.claims.dust,
        claims: {
          gold: 0,
          dust: 0,
        },
      });

      const strReward = `${user.claims.gold} ${COIN_EMOJI_ID} et ${user.claims.dust} ${DUST_EMOJI_ID}`;
      const strRewardBase = `Tu as récupéré ta récompense exceptionnelle de ${strReward} !`;

      message.reply(strRewardBase);

      return;
    }

    message.reply('Tu n\'as pas de récompense exceptionnelle à récupérer.');
  },
};
