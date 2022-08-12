import { Message } from 'discord.js';
import * as usersModel from '../models/users';
import profilBuilder from '../messages/profilBuilder';

export default {
  name: '!profil',
  alias: '!profile',

  description: 'Affiche le profil de vous ou du joueur ciblé',

  async execute(message: Message, messageContext: MessageContext) {
    const user = usersModel.getOneUser(
      messageContext.mentions.length >= 1
        ? messageContext.mentions[0].id
        : messageContext.author.id,
    );

    if (!user) {
      message.reply('Joueur non trouvé');

      return;
    }

    if (!user.tower) {
      user.tower = usersModel.getInitTowerValue();
    }

    message.channel.send(profilBuilder(user));
  },
};
