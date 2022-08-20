import { Message } from 'discord.js';
import * as usersModel from '../models/users';

const {
  COIN_EMOJI_ID,
  DUST_EMOJI_ID,
} = process.env;

const FORMAT_MSG = 'format : `!sendgift [@someone] [gold|dust|tickets] [value]`';

export default {
  name: '!sendgift',
  alias: '!send',
  noHelp: true,

  description: 'Envoi une récompense execptionnelle à un joueur',

  async execute(message: Message, messageContext: MessageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);

    if (!user) {
      message.reply('User not found');
      return;
    }

    if (!user.isAdmin) {
      message.reply('Your princess is in another castle');
      return;
    }

    if (messageContext.mentions.length < 1) {
      message.reply(FORMAT_MSG);
      return;
    }

    if (messageContext.args.length < 3) {
      message.reply(FORMAT_MSG);
      return;
    }

    const targetUser = usersModel.getOneUser(messageContext.mentions[0].id);

    if (!targetUser) {
      message.reply('Joueur ciblé non trouvé');
      return;
    }

    const subcommand = messageContext.args[1];
    const param = messageContext.args[2];

    if (!['gold', 'dust', 'tickets'].includes(subcommand)) {
      message.reply('Unknwown subcommand : `gold|dust|tickets`');
      return;
    }

    if (subcommand === 'gold') {
      const wantedNbr = parseInt(param, 10);

      if (Number.isNaN(wantedNbr)) {
        message.reply('Param number not recognized');
        return;
      }

      const updatedUser = usersModel.updateUser({
        ...targetUser,
        claims: {
          ...targetUser.claims,
          gold: targetUser.claims.gold + wantedNbr,
        },
      });

      message.reply(`Ce joueur dispose maintenant d'une récompense de ${updatedUser.claims.gold} ${COIN_EMOJI_ID} (\`!claim\` pour les récupérer)`);
    }

    if (subcommand === 'dust') {
      const wantedNbr = parseInt(param, 10);

      if (Number.isNaN(wantedNbr)) {
        message.reply('Param number not recognized');
        return;
      }

      const updatedUser = usersModel.updateUser({
        ...targetUser,
        claims: {
          ...targetUser.claims,
          dust: targetUser.claims.dust + wantedNbr,
        },
      });

      message.reply(`Ce joueur dispose maintenant d'une récompense de ${updatedUser.claims.dust} ${DUST_EMOJI_ID} (\`!claim\` pour les récupérer)`);
    }

    if (subcommand === 'tickets') {
      const wantedNbr = parseInt(param, 10);

      if (Number.isNaN(wantedNbr)) {
        message.reply('Param number not recognized');
        return;
      }

      const updatedUser = usersModel.updateUser({
        ...targetUser,
        claims: {
          ...targetUser.claims,
          tickets: targetUser.claims.tickets + wantedNbr,
        },
      });

      message.reply(`Ce joueur dispose maintenant d'une récompense de ${updatedUser.claims.tickets} 🎫 (\`!claim\` pour les récupérer)`);
    }
  },
};
