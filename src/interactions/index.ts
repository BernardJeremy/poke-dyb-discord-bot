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
import handleInvocationButtons from './invocation';
import { InvocationActionTypes } from '../types/invocation.types';

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

  if (interaction.customId.includes('invocation')) {
    handleInvocationButtons(
      interaction.customId as InvocationActionTypes,
      interaction,
    );
  }
};

export default handleButtonInteractions;
