import { Message } from 'discord.js';
import * as usersModel from '../models/users';
import ratioBuilder from '../messages/ratioBuilder';

export default {
  name: '!ratio',
  alias: '!calc',
  noHelp: true,

  description: 'Affiche les ratio de chaque joueurs',

  async execute(message: Message, messageContext: MessageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);

    if (!user?.isAdmin) {
      message.reply('Reservé à l\'admin (il aime un peu trop les stats)');
      return;
    }
    message.channel.send(ratioBuilder());
  },
};
