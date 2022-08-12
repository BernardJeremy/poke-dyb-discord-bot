const usersModel = require('../models/users');
const gdocStore = require('../store/gdoc');

const FORMAT_MSG = 'format : `!gdoc [pokedex|updateAll]`';

module.exports = {
  name: '!gdoc',
  noHelp: true,

  description: 'Administration du gdoc',

  async execute(message, messageContext) {
    const currentUser = usersModel.getOneUser(messageContext.author.id);

    if (!currentUser.isAdmin) {
      message.reply('Bien tenté mais toujour pas');
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

      const updateAllUsersPromise = users.map(
        (user) => (user.pokedex.length > 0 ? gdocStore.updatePlayerSheet(user) : Promise.resolve()),
      );
      await Promise.all(updateAllUsersPromise);

      message.reply('Sheets de tous les joueurs misent à jours');
    }
  },
};
