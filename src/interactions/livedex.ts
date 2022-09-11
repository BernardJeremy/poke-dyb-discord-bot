/* eslint-disable no-nested-ternary */
import { ButtonInteraction } from 'discord.js';
import livedexBuilder from '../messages/livedexBuilder';
import { LivedexActionTypes } from '../types/stats.types';

const handleLivedexButtons = (
  action: LivedexActionTypes,
  interaction: ButtonInteraction,
) => {
  if (action === LivedexActionTypes.REFRESH) {
    interaction.update(livedexBuilder());
  }
};

export default handleLivedexButtons;
