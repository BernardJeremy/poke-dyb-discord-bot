const pokedex = require('../data/pokedex.json');
const usersModel = require('../models/users');
const { removePokemonFromList } = require('../tools/pokemon');

const {
  DUST_EMOJI_ID,
} = process.env;

module.exports = {
  name: '!dez',

  description: 'Decraft le pokemon demandée pour la moitié de sa valeur',

  async execute(message, messageContext) {
    if (!messageContext.args || messageContext.args.length < 1) {
      message.reply('format : !dez [pokemon] [nbr]');
      return;
    }

    const pokemonNbr = parseInt(messageContext.args[0], 10);

    if (Number.isNaN(pokemonNbr)) {
      message.reply('format : !dez [pokemon] [nbr]');
      return;
    }

    let user = usersModel.getOneUser(messageContext.author.id);

    const targetPokemonList = user.pokedex.filter((pokemon) => pokemonNbr === pokemon);
    if (targetPokemonList.length === 0) {
      message.reply('Tu ne disposes pas de ce pokemon');
      return;
    }

    const nbrToDez = messageContext.args.length > 1 ? parseInt(messageContext.args[1], 10) : 1;

    if (Number.isNaN(nbrToDez)) {
      message.reply('format : !dez [pokemon] [nbr]');
      return;
    }

    if (nbrToDez > targetPokemonList.length) {
      message.reply(`Tu n'as que ${targetPokemonList.length} exemplaire(s) de ce pokemon`);
      return;
    }

    user.pokedex = removePokemonFromList(user.pokedex, pokemonNbr, nbrToDez);

    const pokemonObj = pokedex[pokemonNbr - 1];
    const wonDust = Math.round((pokemonObj.craftingPrice * nbrToDez) / 2);

    user = usersModel.updateUser({
      ...user,
      dust: user.dust + wonDust,
    });

    message.reply(`Tu as decraft **[#${pokemonObj.id}] ${pokemonObj.name}** pour ${wonDust} ${DUST_EMOJI_ID}. Il te reste **${user.pokedex.filter((pokemon) => pokemonObj.id === pokemon).length} ${pokemonObj.name}**. Tu disposes maintenant de ${user.dust} ${DUST_EMOJI_ID}`);
  },
};
