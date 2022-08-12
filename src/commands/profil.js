const usersModel = require('../models/users');
const profilBuilder = require('../messages/profilBuilder');

module.exports = {
  name: '!profil',
  alias: '!profile',

  description: 'Affiche le profil de vous ou du joueur ciblé',

  async execute(message, messageContext) {
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
