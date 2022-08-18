/* eslint-disable no-nested-ternary */
import { ButtonInteraction } from 'discord.js';
import buildRatio from '../messages/ratioBuilder';
import { RatioActionTypes } from '../types/stats.types';

const handleRatioButtons = (
  action: RatioActionTypes,
  interaction: ButtonInteraction,
) => {
  if (action === RatioActionTypes.REFRESH) {
    interaction.update(buildRatio());
  }
};

export default handleRatioButtons;
