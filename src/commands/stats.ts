import { Message } from 'discord.js';
import * as usersModel from '../models/users';
import statsBuilder from '../messages/statsBuilder';

export default {
  name: '!stat',
  alias: '!stats',
  noHelp: true,

  description: 'Affiche les stats globales',

  async execute(message: Message, messageContext: MessageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);

    if (!user?.isAdmin) {
      message.reply('Regarde dans le channel #stats');
      return;
    }
    message.channel.send(statsBuilder());
  },
};
