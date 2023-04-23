import { Message } from 'discord.js';
import * as usersModel from '../models/users';
import { getRandomPokemonWithRarity } from '../tools/pokemon';
import buildCard from '../messages/cardBuilder';
import DisplayTypes from '../types/display.enum';

type OfferingData = {
  min: number;
  max: number;
  dustCost: number;
};

const {
  DUST_EMOJI_ID,
} = process.env;

const offeringListArray: OfferingData[] = [
  {
    min: 41,
    max: 60,
    dustCost: 100,
  },
  {
    min: 21,
    max: 40,
    dustCost: 200,
  },
  {
    min: 6,
    max: 20,
    dustCost: 300,
  },
  {
    min: 0,
    max: 5,
    dustCost: 500,
  },
];

export default {
  name: '!offrande',
  alias: '!arceus',
  allowedChannels: ['place-arceus'],

  description: 'Dépose de la dust en offrande à Arceus',

  async execute(message: Message, messageContext: MessageContext) {
    if (!messageContext.args || messageContext.args.length < 1) {
      message.reply('format : !offrande [nbr]');
      return;
    }

    const dustNbr = parseInt(messageContext.args[0], 10);

    if (Number.isNaN(dustNbr)) {
      message.reply('format : !offrande [nbr]');
      return;
    }

    let user = usersModel.getOneUser(messageContext.author.id);

    if (!user) {
      message.reply('User not found');
      return;
    }

    if (user.dust < dustNbr) {
      message.reply(`Tu n'as pas assez de ${DUST_EMOJI_ID}`);
      return;
    }

    const offeringData = offeringListArray.find((offer) => offer.dustCost === dustNbr);
    if (!offeringData) {
      message.reply(`Quantité de ${DUST_EMOJI_ID} proposée invalide ! Quantité viable : ${offeringListArray.map((offer) => `${offer.dustCost}${DUST_EMOJI_ID}`).join(' / ')}`);
      return;
    }

    const pokemonObj: Pokemon = getRandomPokemonWithRarity(offeringData.min, offeringData.max);
    if (!pokemonObj) {
      message.reply(`Unable to fin pokemon to generate : ${offeringData.min}% / ${offeringData.max}%`);
      return;
    }
    user.pokedex.push(pokemonObj.id);

    user = usersModel.updateUser({
      ...user,
      dust: user.dust - dustNbr,
      ratio: {
        ...user.ratio,
        arceus: (user.ratio.arceus || 0) + 1,
      },
    });

    await message.reply(
      buildCard(pokemonObj, {
        displayType: DisplayTypes.CaughtPokemon,
        content: `**Arceus** t'offre en remerciement **[#${pokemonObj.id}] ${pokemonObj.name}**. Tu en as actuellement ${user.pokedex.filter((pokemon) => pokemonObj.id === pokemon).length} et il te reste ${user.dust}${DUST_EMOJI_ID}`,
      }),
    );
  },
};
