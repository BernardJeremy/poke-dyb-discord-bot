const buildCard = require('../messages/cardBuilder');
const { getRandomPokemon } = require('../tools/pokemon');
const usersModel = require('../models/users');
const { addElementHistory, HISTORY_EVENT_TYPE } = require('../store/gdoc');

const {
  COIN_EMOJI_ID,
} = process.env;

const GOLD_COST_INVOC = 500;

module.exports = {
  name: '!invoc',

  description: 'Invoque une carte pokemon aléatoire',

  async execute(message, messageContext) {
    let user = usersModel.getOneUser(messageContext.author.id);

    if (user.gold < GOLD_COST_INVOC) {
      message.reply(`Tu n'as pas assez de ${COIN_EMOJI_ID} pour invoquer, il te faut ${GOLD_COST_INVOC} ${COIN_EMOJI_ID}`);
      return;
    }

    let pokemonObj = getRandomPokemon();
    // If user already has this pokemon, try a second time;
    if (user.pokedex.includes(pokemonObj.id)) {
      pokemonObj = getRandomPokemon();
    }

    user.pokedex.push(pokemonObj.id);
    user = usersModel.updateUser({
      ...user,
      gold: user.gold - GOLD_COST_INVOC,
    });

    message.reply(`Tu as invoqué **[#${pokemonObj.id}] ${pokemonObj.name}**. Tu en as ${user.pokedex.filter((pokemon) => pokemonObj.id === pokemon).length}. Il te reste ${user.gold} ${COIN_EMOJI_ID}`);
    message.channel.send(buildCard(pokemonObj));

    addElementHistory({
      eventType: HISTORY_EVENT_TYPE.INVOC,
      userData: user,
      pokemonData: pokemonObj,
    });
  },
};
