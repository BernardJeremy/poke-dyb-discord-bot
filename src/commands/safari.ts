import { Message } from 'discord.js';
import buildSafari from '../messages/safariBuilder';
import * as usersModel from '../models/users';
import * as safariesModel from '../models/safaries';
import { getRandomPokemonWithRarity } from '../tools/pokemon';
import { SafariEncounterData } from '../types/safari.types';

const {
  SAFARI_TICKETS_COST,
  SAFARI_STARTING_BALL_NBR,
  SAFARI_STARTING_CATCH_RATE,
  SAFARI_STARTING_ESCAPE_RATE,
  SAFARI_POKEMON_MIN_RARITY,
  SAFARI_POKEMON_MAX_RARITY,
} = process.env;

export default {
  name: '!safari',
  allowedChannels: ['parc-safari'],

  description: 'Lance une rencontre du Parc Safari',

  async execute(message: Message, messageContext: MessageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);
    const currentUserSafari = safariesModel.getOneSafariByOwnerId(messageContext.author.id);
    const safariCost = parseInt(SAFARI_TICKETS_COST, 10);

    if (!user) {
      message.reply('User not found');
      return;
    }

    if (currentUserSafari) {
      message.reply('Tu as déja un combat du Parc Safari en cours');
      return;
    }

    if (user.tickets < safariCost) {
      message.reply(`Tu n'as pas assez de 🎫. Il te faut au moins ${safariCost} 🎫 pour accéder au Parc Safari`);
      return;
    }

    const pokemonObj: Pokemon = getRandomPokemonWithRarity(
      parseInt(SAFARI_POKEMON_MIN_RARITY, 10),
      parseInt(SAFARI_POKEMON_MAX_RARITY, 10),
    );

    const safariEncounterData: SafariEncounterData = {
      ownerId: messageContext.author.id,
      pokemon: pokemonObj,
      ballRemaining: parseInt(SAFARI_STARTING_BALL_NBR, 10),
      captureRate: parseInt(SAFARI_STARTING_CATCH_RATE, 10),
      escapeRate: parseInt(SAFARI_STARTING_ESCAPE_RATE, 10),
      statusText: `
      ${safariCost} 🎫 t'ont été prélevés.
      [#${pokemonObj.id}] ${pokemonObj.name} vous regarde attentivement.
      Tu ${user.pokedex.includes(pokemonObj.id) ? `disposes de ${user.pokedex.filter((pokemonId) => pokemonId === pokemonObj.id).length} exemplaire(s) de ce Pokemon` : 'ne dispose pas de ce Pokemon'}`,
      ongoing: true,
      hasBeenCaught: false,
    };

    const safariEncounterMessage = await message.reply(buildSafari(safariEncounterData));

    safariEncounterData.safariEncounterMessageId = safariEncounterMessage.id;

    usersModel.updateUser({
      ...user,
      tickets: user.tickets - safariCost,
      ratio: {
        ...user.ratio,
        safari: user.ratio.safari + 1,
      },
    });

    safariesModel.createSafari(safariEncounterData);
  },
};
