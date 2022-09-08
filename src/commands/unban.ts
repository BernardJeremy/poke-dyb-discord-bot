import { Message } from 'discord.js';
import * as usersModel from '../models/users';

export default {
  name: '!unban',
  alias: '!revient',
  noHelp: true,

  description: 'Ca revient',

  async execute(message: Message, messageContext: MessageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);

    if (!user?.isAdmin) {
      message.channel.send('Soif de pouvoir ?');
      return;
    }

    if (messageContext.mentions.length < 1) {
      message.reply('format : !unban @member');
      return;
    }

    const unbannedUser = usersModel.getOneUser(messageContext.mentions[0].id);

    if (!unbannedUser) {
      message.reply('Target user not found');
      return;
    }

    if (!unbannedUser.isBan) {
      message.reply(`${unbannedUser.username} n'est pas ban`);
      return;
    }

    usersModel.updateUser({
      ...unbannedUser,
      isBan: false,
    });

    message.channel.send(`${unbannedUser.username} à été unban`);
  },
};
