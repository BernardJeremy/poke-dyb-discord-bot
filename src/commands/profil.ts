import { Message } from 'discord.js';
import * as usersModel from '../models/users';
import profilBuilder from '../messages/profilBuilder';

export default {
  name: '!profil',
  alias: '!profile',

  description: 'Affiche votre profil ou celui du joueur ciblé',

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

    message.channel.send(profilBuilder(user));
  },
};
