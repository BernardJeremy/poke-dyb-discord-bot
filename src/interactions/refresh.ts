/* eslint-disable no-nested-ternary */
import { ButtonInteraction } from 'discord.js';
import buildStats from '../messages/statsBuilder';
import buildOptiHv from '../messages/optiHvBuilder';
import buildLivedex from '../messages/livedexBuilder';
import buildRatio from '../messages/ratioBuilder';
import {
  LivedexActionTypes,
  OptiHvActionTypes,
  RatioActionTypes,
  StatsActionTypes,
} from '../types/stats.types';

const handleRefreshButtons = (
  action: StatsActionTypes | RatioActionTypes | OptiHvActionTypes | LivedexActionTypes,
  interaction: ButtonInteraction,
) => {
  if (action === StatsActionTypes.REFRESH) {
    interaction.update(buildStats());
  } else if (action === OptiHvActionTypes.REFRESH) {
    interaction.update(buildOptiHv());
  } else if (action === LivedexActionTypes.REFRESH) {
    interaction.update(buildLivedex());
  } else if (action === RatioActionTypes.REFRESH) {
    interaction.update(buildRatio());
  }
};

export default handleRefreshButtons;
