import { Interaction } from 'discord.js';
import { SafariActionTypes } from '../types/safari.types';
import {
  LivedexActionTypes,
  OptiHvActionTypes,
  RatioActionTypes,
  StatsActionTypes,
} from '../types/stats.types';
import handleSafariButtons from './safari';
import handleRefreshButtons from './refresh';

const handleButtonInteractions = (interaction: Interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId.includes('safari')) {
    handleSafariButtons(
      interaction.customId as SafariActionTypes,
      interaction,
    );
  }

  if (interaction.customId.includes('stats')) {
    handleRefreshButtons(
      interaction.customId as StatsActionTypes,
      interaction,
    );
  }

  if (interaction.customId.includes('ratio')) {
    handleRefreshButtons(
      interaction.customId as RatioActionTypes,
      interaction,
    );
  }

  if (interaction.customId.includes('livedex')) {
    handleRefreshButtons(
      interaction.customId as LivedexActionTypes,
      interaction,
    );
  }

  if (interaction.customId.includes('optihv')) {
    handleRefreshButtons(
      interaction.customId as OptiHvActionTypes,
      interaction,
    );
  }
};

export default handleButtonInteractions;
