import { Message } from 'discord.js';
import * as usersModel from '../models/users';

export default {
  name: '!ban',
  alias: '!degage',
  noHelp: true,

  description: 'Ca dégage',

  async execute(message: Message, messageContext: MessageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);

    if (!user?.isAdmin) {
      message.channel.send('Si tu veux tester demande à l\'admin');
      return;
    }

    if (messageContext.mentions.length < 1) {
      message.reply('format : !ban @member');
      return;
    }

    const bannedUser = usersModel.getOneUser(messageContext.mentions[0].id);

    if (!bannedUser) {
      message.reply('Target user not found');
      return;
    }

    if (bannedUser.isBan) {
      message.reply(`${bannedUser.username} est déjà ban`);
      return;
    }

    if (bannedUser.isAdmin) {
      message.reply('On ban pas les admin (c\'est chiant sinon)');
      return;
    }

    usersModel.updateUser({
      ...bannedUser,
      isBan: true,
    });

    message.channel.send(`${bannedUser.username} à été ban`);
  },
};
