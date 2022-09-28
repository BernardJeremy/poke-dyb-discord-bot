/* eslint-disable no-nested-ternary */
import { ButtonInteraction } from 'discord.js';
import buildCard from '../messages/cardBuilder';
import * as usersModel from '../models/users';
import * as invocationsModel from '../models/invocations';
import { InvocationActionTypes } from '../types/invocation.types';
import { getRandomPokemon } from '../tools/pokemon';
import DisplayTypes from '../types/display.enum';

const {
  COIN_EMOJI_ID,
} = process.env;

const handleInvocationButtons = (
  action: InvocationActionTypes,
  interaction: ButtonInteraction,
) => {
  const user = usersModel.getOneUser(interaction.user.id);

  if (!user) {
    interaction.message.channel.send('User not found');
    return;
  }

  const currentInvocation = invocationsModel.getOneInvocationByMessageId(interaction.message.id);

  if (!currentInvocation || !user || currentInvocation.ownerId !== user.id) {
    return;
  }

  let caughtPokemon = currentInvocation.pokemon;

  if (action === InvocationActionTypes.REROLL) {
    caughtPokemon = getRandomPokemon();
  }

  user.pokedex.push(caughtPokemon.id);
  usersModel.updateUser({
    ...user,
  });

  interaction.update(buildCard(caughtPokemon, {
    displayType: DisplayTypes.CaughtPokemon,
    content: `Tu as invoqué **[#${caughtPokemon.id}] ${caughtPokemon.name}**. Tu en as maintenant ${user.pokedex.filter((pokemon) => caughtPokemon.id === pokemon).length}. Il te reste ${user.gold} ${COIN_EMOJI_ID}`,
  }));

  invocationsModel.deleteInvocation(currentInvocation);
};

export default handleInvocationButtons;
