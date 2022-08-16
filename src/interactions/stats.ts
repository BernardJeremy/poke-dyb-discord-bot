/* eslint-disable no-nested-ternary */
import { ButtonInteraction } from 'discord.js';
import buildStats from '../messages/statsBuilder';
import { StatsActionTypes } from '../types/stats.types';

const handleStatsButtons = (
  action: StatsActionTypes,
  interaction: ButtonInteraction,
) => {
  if (action === StatsActionTypes.REFRESH) {
    interaction.update(buildStats());
  }
};

export default handleStatsButtons;
