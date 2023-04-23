import { Message } from 'discord.js';
import * as usersModel from '../models/users';
import { removePokemonFromList, getCleanUserPokedexArray } from '../tools/pokemon';

const {
  DUST_EMOJI_ID,
} = process.env;

export default {
  name: '!dezalldouble',
  allowedChannels: ['invoc-craft-dez'],

  description: 'Decraft tous les pokemons en plus d\'un exemplaire',

  async execute(message: Message, messageContext: MessageContext) {
    let user = usersModel.getOneUser(messageContext.author.id);

    if (!user) {
      message.reply('User not found');
      return;
    }

    const userPokedex = getCleanUserPokedexArray(user.pokedex);
    let wonDustTotal = 0;
    let nbrDezTotal = 0;
    let nbrUniquePokemonTotal = 0;

    for (let i = 0; i < userPokedex.length; i += 1) {
      const currentPokemon = userPokedex[i];
      if (currentPokemon.nbr > 1) {
        const nbrToDez = currentPokemon.nbr - 1;
        nbrDezTotal += nbrToDez;
        nbrUniquePokemonTotal += 1;
        user.pokedex = removePokemonFromList(user.pokedex, currentPokemon.id, nbrToDez);
        wonDustTotal += Math.round((currentPokemon.craftingPrice * nbrToDez) / 2);
      }
    }

    if (nbrDezTotal === 0) {
      message.reply('Tu n\'as aucun doublon !');

      return;
    }

    user = usersModel.updateUser({
      ...user,
      dust: user.dust + wonDustTotal,
    });

    message.reply(`Tu as decraft **${nbrDezTotal} pokemon au total réparties sur ${nbrUniquePokemonTotal}** pour ${wonDustTotal} ${DUST_EMOJI_ID}. Tu disposes maintenant de ${user.dust} ${DUST_EMOJI_ID}`);
  },
};
