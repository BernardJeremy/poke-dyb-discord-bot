import { Message } from 'discord.js';
import * as usersModel from '../models/users';
import gdocStore from '../store/gdoc';

const FORMAT_MSG = 'format : `!gdoc [pokedex|updateAll]`';

export default {
  name: '!gdoc',
  noHelp: true,

  description: 'Administration du gdoc',

  async execute(message: Message, messageContext: MessageContext) {
    const currentUser = usersModel.getOneUser(messageContext.author.id);

    if (!currentUser) {
      message.reply('User not found');
      return;
    }

    if (!currentUser.isAdmin) {
      message.reply('Bien tenté mais toujours pas');
      return;
    }

    if (messageContext.args.length < 1) {
      message.reply(FORMAT_MSG);
      return;
    }

    const subcommand = messageContext.args[0];

    if (!['pokedex', 'updateAll'].includes(subcommand)) {
      message.reply('Unknwown subcommand : `pokedex|updateAll`');
      return;
    }

    if (subcommand === 'pokedex') {
      await gdocStore.updatePokedex();
      message.reply('Pokedex du GDOC mis à jours');
    }

    if (subcommand === 'updateAll') {
      const users = usersModel.getAllUsers();

      message.channel.send('Lancement de la mise à jour des sheets de tous les joueurs ...');

      const updateAllUsersPromise = users.map(
        (user) => gdocStore.updatePlayerSheet(user),
      );
      await Promise.all(updateAllUsersPromise);

      message.reply('Les sheets de tous les joueurs ont été mises à jours');
    }
  },
};
