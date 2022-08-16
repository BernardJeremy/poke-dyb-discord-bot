import { Interaction } from 'discord.js';
import { SafariActionTypes } from '../types/safari.types';
import handleSafariButtons from './safari';

const handleButtonInteractions = (interaction: Interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId.includes('safari')) {
    handleSafariButtons(
      interaction.customId as SafariActionTypes,
      interaction,
    );
  }
};

export default handleButtonInteractions;
