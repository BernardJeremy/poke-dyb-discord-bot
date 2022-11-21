import { Message } from 'discord.js';
import buildCard from '../messages/cardBuilder';
import { getRandomPokemon } from '../tools/pokemon';
import * as usersModel from '../models/users';
import * as invocationsModel from '../models/invocations';
import DisplayTypes from '../types/display.enum';
import { InvocationData } from '../types/invocation.types';

const {
  COIN_EMOJI_ID,
  RANDOM_CARD_COST,
} = process.env;

const GOLD_COST_INVOC = parseInt(RANDOM_CARD_COST, 10);

export default {
  name: '!invoc',
  allowedChannels: ['invoc-craft-dez'],

  description: 'Invoque un pokemon aléatoire',

  async execute(message: Message, messageContext: MessageContext) {
    let user = usersModel.getOneUser(messageContext.author.id);

    if (!user) {
      message.reply('User not found');
      return;
    }

    if (user.gold < GOLD_COST_INVOC) {
      message.reply(`Tu n'as pas assez de ${COIN_EMOJI_ID} pour invoquer, il te faut ${GOLD_COST_INVOC} ${COIN_EMOJI_ID}`);
      return;
    }

    const pokemonObj: Pokemon = getRandomPokemon();
    const alreadyHasIt: boolean = user.pokedex.includes(pokemonObj.id);

    user = usersModel.updateUser({
      ...user,
      gold: user.gold - GOLD_COST_INVOC,
      ratio: {
        ...user.ratio,
        invoc: user.ratio.invoc + 1,
        invocSuccess:
          !alreadyHasIt
            ? user.ratio.invocSuccess + 1
            : user.ratio.invocSuccess,
      },
    });

    const invocationMessage = await message.reply(
      buildCard(pokemonObj, {
        displayType: DisplayTypes.Invocation,
        content: `Tu as invoqué **[#${pokemonObj.id}] ${pokemonObj.name}**. Tu en as actuellement ${user.pokedex.filter((pokemon) => pokemonObj.id === pokemon).length}. Il te reste ${user.gold} ${COIN_EMOJI_ID}`,
      }),
    );

    const invocationData: InvocationData = {
      ownerId: messageContext.author.id,
      pokemon: pokemonObj,
      invocationMessageId: invocationMessage.id,
      ongoing: true,
      nbrTimeRefreshed: 0,
    };
    invocationsModel.createInvocation(invocationData);

    const usersList = usersModel.getAllUsers();
    const totalInvoc = usersList.reduce((total, oneUser) => (
      oneUser.ratio.invoc + total
    ), 0);

    if (totalInvoc % 1000 === 0) {
      usersList.forEach((currentUser) => {
        usersModel.updateUser({
          ...currentUser,
          claims: {
            ...currentUser.claims,
            gold: currentUser.claims.gold + 1000,
          },
        });
      });
      message.channel.send(`${message.author} vient de réaliser la ${totalInvoc}eme invocations ! Il permet à tous le monde d'obtenir 1000 ${COIN_EMOJI_ID} (\`!claim\` pour les récupérer) ! Merci à lui.`);
    }
  },
};
