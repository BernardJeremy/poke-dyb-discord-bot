import { Message } from 'discord.js';
import * as usersModel from '../models/users';
import livedexBuilder from '../messages/livedexBuilder';

export default {
  name: '!livedex',
  noHelp: true,

  description: 'Affiche le pokedex à un instant T de chaque joueurs',

  async execute(message: Message, messageContext: MessageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);

    if (!user?.isAdmin) {
      message.reply('Reservé à l\'admin');
      return;
    }

    message.channel.send(livedexBuilder());
  },
};
