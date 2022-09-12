/* eslint-disable no-nested-ternary */
import { ButtonInteraction } from 'discord.js';
import optiHvBuilder from '../messages/optiHvBuilder';
import { OptiHvActionTypes } from '../types/stats.types';

const handleOptiHvButtons = (
  action: OptiHvActionTypes,
  interaction: ButtonInteraction,
) => {
  if (action === OptiHvActionTypes.REFRESH) {
    interaction.update(optiHvBuilder());
  }
};

export default handleOptiHvButtons;
