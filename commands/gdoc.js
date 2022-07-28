const usersModel = require('../models/users');
const gdocStore = require('../store/gdoc');

const FORMAT_MSG = 'format : `!gdoc [pokedex]`';

module.exports = {
  name: '!gdoc',
  noHelp: true,

  description: 'Administration du gdoc',

  async execute(message, messageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);

    if (!user.isAdmin) {
      message.reply('Bien tenté mais toujour pas');
      return;
    }

    if (messageContext.args.length < 1) {
      message.reply(FORMAT_MSG);
      return;
    }

    const subcommand = messageContext.args[0];

    if (!['pokedex'].includes(subcommand)) {
      message.reply('Unknwown subcommand : `pokedex`');
      return;
    }

    if (subcommand === 'pokedex') {
      await gdocStore.updatePokedex();
      message.reply('Pokedex du GDOC mis à jours');
    }
  },
};
