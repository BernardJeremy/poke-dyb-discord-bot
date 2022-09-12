import { Message } from 'discord.js';
import * as usersModel from '../models/users';
import optiHvBuilder from '../messages/optiHvBuilder';

export default {
  name: '!optihv',
  noHelp: true,

  description: 'Affiche les trades opti pour chaque joueurs',

  async execute(message: Message, messageContext: MessageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);

    if (!user?.isAdmin) {
      message.reply('Reservé à l\'admin');
      return;
    }

    message.channel.send(optiHvBuilder());
  },
};
