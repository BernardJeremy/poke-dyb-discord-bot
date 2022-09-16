import { Message } from 'discord.js';
import * as usersModel from '../models/users';

export default {
  name: '!ban',
  alias: '!degage',
  noHelp: true,

  description: 'Ca dégage',

  async execute(message: Message, messageContext: MessageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);

    if (!user) {
      message.reply('User not found');
      return;
    }

    if (messageContext.mentions.length < 1) {
      message.reply('format : !ban @member');
      return;
    }

    // If non-admin try to ban ==> self ban
    const bannedUser = user.isAdmin
      ? usersModel.getOneUser(messageContext.mentions[0].id)
      : user;

    if (!bannedUser) {
      message.reply('Target user not found');
      return;
    }

    if (bannedUser.isBan) {
      message.reply(`<@${bannedUser.id}> est déjà ban`);
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

    message.channel.send(`<@${bannedUser.id}> à été ban`);
  },
};
