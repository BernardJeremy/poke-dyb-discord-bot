import * as usersModel from '../models/users';
import pokedex from '../data/pokedex.json';
import { Message } from 'discord.js';
import { removePokemonFromList } from '../tools/pokemon';

const {
  COIN_EMOJI_ID,
  DUST_EMOJI_ID,
} = process.env;

const FORMAT_MSG = 'format : `!admin [@someone] [pokemon|gold|dust] [id|value]`';

export default {
  name: '!admin',
  alias: '!root',
  noHelp: true,

  description: 'Administration du bot',

  async execute(message: Message, messageContext: MessageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);

    if (!user?.isAdmin) {
      message.reply('Bien tenté mais non');
      return;
    }

    if (messageContext.mentions.length < 1) {
      message.reply(FORMAT_MSG);
      return;
    }

    if (messageContext.args.length < 3) {
      message.reply(FORMAT_MSG);
      return;
    }

    const targetUser = usersModel.getOneUser(messageContext.mentions[0].id);

    if (!targetUser) {
      message.reply('Joueur ciblé non trouvé');
      return;
    }

    const subcommand = messageContext.args[1];
    let param = messageContext.args[2];

    if (!['pokemon', 'gold', 'dust'].includes(subcommand)) {
      message.reply('Unknwown subcommand : `pokemon|gold|dust`');
      return;
    }

    if (subcommand === 'pokemon') {
      let toRemove = false;
      if (param[0] === '-') {
        toRemove = true;
        param = param.substring(1);
      }

      const pokemonNbr = parseInt(param, 10);

      if (Number.isNaN(pokemonNbr)) {
        message.reply('Pokemon ID not recognized');
        return;
      }

      const pokemonObj = pokedex.at(pokemonNbr - 1);

      if (!pokemonObj) {
        message.reply('Pokemon not found');
        return;
      }

      if (toRemove) {
        targetUser.pokedex = removePokemonFromList(targetUser.pokedex, pokemonNbr, 1);
      } else {
        targetUser.pokedex.push(pokemonObj.id);
      }

      usersModel.updateUser(targetUser);

      message.reply(`Un exemplaire de **[#${pokemonObj.id}] ${pokemonObj.name}** a été ${toRemove ? 'supprimé de' : 'ajouté à'} sa collection`);
    }

    if (subcommand === 'gold') {
      const wantedNbr = parseInt(param, 10);

      if (Number.isNaN(wantedNbr)) {
        message.reply('Param number not recognized');
        return;
      }

      const updatedTargetUser = usersModel.updateUser({
        ...targetUser,
        gold: targetUser.gold + wantedNbr,
      });
      message.reply(`Ce joueur dispose maintenant de ${updatedTargetUser.gold} ${COIN_EMOJI_ID} (${wantedNbr > 0 ? '+' : ''}${wantedNbr} ${COIN_EMOJI_ID})`);
    }

    if (subcommand === 'dust') {
      const wantedNbr = parseInt(param, 10);

      if (Number.isNaN(wantedNbr)) {
        message.reply('Param number not recognized');
        return;
      }

      const updatedTargetUser = usersModel.updateUser({
        ...targetUser,
        dust: targetUser.dust + wantedNbr,
      });
      message.reply(`Ce joueur dispose maintenant de ${updatedTargetUser.dust} ${DUST_EMOJI_ID} (${wantedNbr > 0 ? '+' : ''}${wantedNbr} ${DUST_EMOJI_ID})`);
    }
  },
};
