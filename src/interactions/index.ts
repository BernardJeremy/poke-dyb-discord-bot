import { Interaction } from 'discord.js';
import { SafariActionTypes } from '../types/safari.types';
import { LivedexActionTypes, RatioActionTypes, StatsActionTypes } from '../types/stats.types';
import handleLivedexButtons from './livedex';
import handleRatioButtons from './ratio';
import handleSafariButtons from './safari';
import handleStatsButtons from './stats';

const handleButtonInteractions = (interaction: Interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId.includes('safari')) {
    handleSafariButtons(
      interaction.customId as SafariActionTypes,
      interaction,
    );
  }

  if (interaction.customId.includes('stats')) {
    handleStatsButtons(
      interaction.customId as StatsActionTypes,
      interaction,
    );
  }

  if (interaction.customId.includes('ratio')) {
    handleRatioButtons(
      interaction.customId as RatioActionTypes,
      interaction,
    );
  }

  if (interaction.customId.includes('livedex')) {
    handleLivedexButtons(
      interaction.customId as LivedexActionTypes,
      interaction,
    );
  }
};

export default handleButtonInteractions;
