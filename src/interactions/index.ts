import { Interaction } from 'discord.js';
import { SafariActionTypes } from '../types/safari.types';
import { StatsActionTypes } from '../types/stats.types';
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
};

export default handleButtonInteractions;
