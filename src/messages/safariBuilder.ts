import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageActionRowComponentBuilder,
} from 'discord.js';
import DisplayTypes from '../types/display.enum';
import { SafariActionTypes, SafariEncounterData } from '../types/safari.types';
import buildCard from './cardBuilder';

const buildSafari = (safariEncounterData: SafariEncounterData) => {
  const buttons = new ActionRowBuilder<MessageActionRowComponentBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(SafariActionTypes.BALL)
        .setLabel(`Safari Ball (x${safariEncounterData.ballRemaining})`)
        .setStyle(ButtonStyle.Success),
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(SafariActionTypes.BAIT)
        .setLabel('Appât')
        .setStyle(ButtonStyle.Primary),
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(SafariActionTypes.ROCK)
        .setLabel('Caillou')
        .setStyle(ButtonStyle.Primary),
    )
    .addComponents(
      new ButtonBuilder()
        .setCustomId(SafariActionTypes.RUN)
        .setLabel('Fuite')
        .setStyle(ButtonStyle.Danger),
    );

  if (!safariEncounterData.ongoing) {
    return {
      content: `**${safariEncounterData.statusText}**`,
      components: [],
      embeds: [],
    };
  }

  return {
    content: `**${safariEncounterData.statusText}**`,
    components: [buttons],
    ...buildCard(
      safariEncounterData.pokemon,
      {
        displayType: DisplayTypes.SafariEncounter,
        safariEncounterData,
      },
    ),
  };
};

export default buildSafari;
