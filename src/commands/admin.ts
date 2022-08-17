import { Message } from 'discord.js';
import * as usersModel from '../models/users';
import pokedex from '../data/pokedex.json';
import { removePokemonFromList } from '../tools/pokemon';

const {
  COIN_EMOJI_ID,
  DUST_EMOJI_ID,
} = process.env;

const FORMAT_MSG = 'format : `!admin [@someone] [pokemon|gold|dust|tickets|create] [id|value]`';

export default {
  name: '!admin',
  alias: '!root',
  noHelp: true,

  description: 'Administration du bot',

  async execute(message: Message, messageContext: MessageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);

    if (!user?.isAdmin) {
      message.channel.send('Bien tenté mais non');
      return;
    }

    if (messageContext.args.length < 2) {
      message.channel.send(FORMAT_MSG);
      return;
    }

    if (messageContext.mentions.length < 1 && messageContext.args[0] !== 'all') {
      message.channel.send(FORMAT_MSG);
      return;
    }

    const subcommand = messageContext.args[1];

    if (!['pokemon', 'gold', 'dust', 'tickets', 'create'].includes(subcommand)) {
      message.channel.send('Unknwown subcommand : `pokemon|gold|dust|tickets`');
      return;
    }

    if (subcommand === 'create' && messageContext.mentions.length >= 1) {
      if (usersModel.getAllUsers().filter(
        (oneUser) => oneUser.id === messageContext.mentions[0].id,
      ).length > 0) {
        message.channel.send(`${messageContext.mentions[0].username} existe déjà !`);

        return;
      }

      usersModel.createUser(messageContext.mentions[0]);
      message.channel.send(`${messageContext.mentions[0].username} a été crée ! Il faut aussi créer l'onglet dans le GDOC`);

      return;
    }

    const param = messageContext.args[2];

    if (!param) {
      message.channel.send(FORMAT_MSG);
      return;
    }

    let targetUserList: User[] = [];
    if (messageContext.mentions.length < 1 && messageContext.args[0] === 'all') {
      targetUserList = usersModel.getAllUsers();
    } else {
      const targetUser = usersModel.getOneUser(messageContext.mentions[0].id);

      if (!targetUser) {
        message.channel.send('Joueur ciblé non trouvé');
        return;
      }

      targetUserList = [targetUser];
    }

    targetUserList.forEach((currentUser) => {
      if (subcommand === 'pokemon') {
        let toRemove = false;
        let pokemonNbrParam = param;

        if (param[0] === '-') {
          toRemove = true;
          pokemonNbrParam = param.substring(1);
        }

        const pokemonNbr = parseInt(pokemonNbrParam, 10);

        if (Number.isNaN(pokemonNbr)) {
          message.channel.send('Pokemon ID not recognized');
          return;
        }

        const pokemonObj = pokedex.at(pokemonNbr - 1);

        if (!pokemonObj) {
          message.channel.send('Pokemon not found');
          return;
        }

        usersModel.updateUser({
          ...currentUser,
          pokedex: toRemove
            ? removePokemonFromList(currentUser.pokedex, pokemonNbr, 1)
            : [
              ...currentUser.pokedex,
              pokemonObj.id,
            ],
        });

        message.channel.send(`Un exemplaire de **[#${pokemonObj.id}] ${pokemonObj.name}** a été ${toRemove ? 'supprimé de' : 'ajouté à'} la collection de ${currentUser.username}`);
      }

      if (subcommand === 'gold') {
        const wantedNbr = parseInt(param, 10);

        if (Number.isNaN(wantedNbr)) {
          message.channel.send('Param number not recognized');
          return;
        }

        const updatedTargetUser = usersModel.updateUser({
          ...currentUser,
          gold: currentUser.gold + wantedNbr,
        });
        message.channel.send(`${currentUser.username} dispose maintenant de ${updatedTargetUser.gold} ${COIN_EMOJI_ID} (${wantedNbr > 0 ? '+' : ''}${wantedNbr} ${COIN_EMOJI_ID})`);
      }

      if (subcommand === 'dust') {
        const wantedNbr = parseInt(param, 10);

        if (Number.isNaN(wantedNbr)) {
          message.channel.send('Param number not recognized');
          return;
        }

        const updatedTargetUser = usersModel.updateUser({
          ...currentUser,
          dust: currentUser.dust + wantedNbr,
        });
        message.channel.send(`${currentUser.username} dispose maintenant de ${updatedTargetUser.dust} ${DUST_EMOJI_ID} (${wantedNbr > 0 ? '+' : ''}${wantedNbr} ${DUST_EMOJI_ID})`);
      }

      if (subcommand === 'tickets') {
        const wantedNbr = parseInt(param, 10);

        if (Number.isNaN(wantedNbr)) {
          message.channel.send('Param number not recognized');
          return;
        }

        const updatedTargetUser = usersModel.updateUser({
          ...currentUser,
          tickets: currentUser.tickets + wantedNbr,
        });
        message.channel.send(`${currentUser.username} dispose maintenant de ${updatedTargetUser.tickets} 🎫 (${wantedNbr > 0 ? '+' : ''}${wantedNbr} 🎫)`);
      }
    });
  },
};
