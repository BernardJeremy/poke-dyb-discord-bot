/* eslint-disable no-nested-ternary */
import { ButtonInteraction } from 'discord.js';
import buildCard from '../messages/cardBuilder';
import buildSafari from '../messages/safariBuilder';
import * as usersModel from '../models/users';
import * as safariesModel from '../models/safaries';
import { getRandomInt } from '../tools/utils';
import DisplayTypes from '../types/display.enum';
import { SafariActionTypes, SafariEncounterData } from '../types/safari.types';

const {
  SAFARI_TICKETS_COST,
} = process.env;

const handleSafariBall = (
  safariEncounterData: SafariEncounterData,
  user: User,
): SafariEncounterData => {
  const hasBeenCaught = getRandomInt(1, 100) <= safariEncounterData.captureRate;
  const hasRun = getRandomInt(1, 100) <= safariEncounterData.escapeRate;
  const sucessStr = `Félicitation ! [#${safariEncounterData.pokemon.id}] ${safariEncounterData.pokemon.name} a été capturé !`;
  const failuretr = `[#${safariEncounterData.pokemon.id}] ${safariEncounterData.pokemon.name} n'a pas été capturé !`;
  let runStr = `[#${safariEncounterData.pokemon.id}] ${safariEncounterData.pokemon.name} s'est enfuit !`;
  let noNoreBall = false;

  if (hasBeenCaught) {
    usersModel.updateUser({
      ...user,
      pokedex: [
        ...user.pokedex,
        safariEncounterData.pokemon.id,
      ],
    });
  } else if (safariEncounterData.ballRemaining === 1) {
    runStr = `Plus de Safari Ball, il n'est plus possible de capturer [#${safariEncounterData.pokemon.id}] ${safariEncounterData.pokemon.name} !`;
    noNoreBall = true;
  }

  return {
    ...safariEncounterData,
    ballRemaining: safariEncounterData.ballRemaining - 1,
    ongoing: !hasBeenCaught && !hasRun && !noNoreBall,
    escapeRate: safariEncounterData.escapeRate + 5,
    statusText: (hasBeenCaught ? sucessStr : (hasRun || noNoreBall ? runStr : failuretr)),
    hasBeenCaught,
  };
};

const handleBait = (safariEncounterData: SafariEncounterData): SafariEncounterData => {
  const hasRun = getRandomInt(1, 100) <= safariEncounterData.escapeRate;
  const sucessStr = `[#${safariEncounterData.pokemon.id}] ${safariEncounterData.pokemon.name} se calme un peu.`;
  const runStr = `[#${safariEncounterData.pokemon.id}] ${safariEncounterData.pokemon.name} s'est enfuit !`;

  return {
    ...safariEncounterData,
    ongoing: !hasRun,
    captureRate: Math.max(0, safariEncounterData.captureRate - 5),
    escapeRate: Math.max(0, safariEncounterData.escapeRate - 10),
    statusText: (hasRun ? runStr : sucessStr),
  };
};

const handleRock = (safariEncounterData: SafariEncounterData): SafariEncounterData => {
  const hasRun = getRandomInt(1, 100) <= safariEncounterData.escapeRate;
  const sucessStr = `[#${safariEncounterData.pokemon.id}] ${safariEncounterData.pokemon.name} s'énerve !`;
  const runStr = `[#${safariEncounterData.pokemon.id}] ${safariEncounterData.pokemon.name} s'est enfuit !`;

  return {
    ...safariEncounterData,
    ongoing: !hasRun,
    captureRate: safariEncounterData.captureRate + 10,
    escapeRate: safariEncounterData.escapeRate + 10,
    statusText: (hasRun ? runStr : sucessStr),
  };
};

const handleRun = (
  safariEncounterData: SafariEncounterData,
  user: User,
): SafariEncounterData => {
  const returnTicketsNbr = Math.floor(parseInt(SAFARI_TICKETS_COST, 10) / 2);
  const sucessStr = `Vous fuyez face à [#${safariEncounterData.pokemon.id}] ${safariEncounterData.pokemon.name}.
  ${returnTicketsNbr} 🎫 vous ont été restitués.`;

  usersModel.updateUser({
    ...user,
    tickets: user.tickets + returnTicketsNbr,
  });

  return {
    ...safariEncounterData,
    ongoing: false,
    statusText: sucessStr,
  };
};

const handleSafariButtons = (
  action: SafariActionTypes,
  interaction: ButtonInteraction,
) => {
  const user = usersModel.getOneUser(interaction.user.id);

  if (!user) {
    interaction.message.channel.send('User not found');
    return;
  }

  const currentUserSafari = safariesModel.getOneSafariByOwnerId(user.id);

  if (!currentUserSafari || !user) {
    return;
  }

  let newSafariEncounterData: SafariEncounterData = currentUserSafari;
  switch (action) {
    case SafariActionTypes.BALL:
      newSafariEncounterData = handleSafariBall(currentUserSafari, user);
      break;
    case SafariActionTypes.BAIT:
      newSafariEncounterData = handleBait(currentUserSafari);
      break;
    case SafariActionTypes.ROCK:
      newSafariEncounterData = handleRock(currentUserSafari);
      break;
    case SafariActionTypes.RUN:
      newSafariEncounterData = handleRun(currentUserSafari, user);
      break;
    default:
      break;
  }

  if (newSafariEncounterData.ongoing) {
    safariesModel.updateSafari(newSafariEncounterData);
  } else {
    safariesModel.deleteSafari(newSafariEncounterData);
  }

  interaction.update(buildSafari(newSafariEncounterData));

  if (newSafariEncounterData.hasBeenCaught) {
    interaction.message.channel.send(
      buildCard(
        newSafariEncounterData.pokemon,
        { displayType: DisplayTypes.CaughtPokemon },
      ),
    );
  }
};

export default handleSafariButtons;
