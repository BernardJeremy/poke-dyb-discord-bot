import { Message } from 'discord.js';
import * as usersModel from '../models/users';
import { getRandomInt } from '../tools/utils';
import buildCard from '../messages/cardBuilder';

import towerData from '../data/tower.json';
import messagesList from '../data/successFailureMessages.json';
import { getRandomPokemonWithRarity } from '../tools/pokemon';
import towerStatusBuilder from '../messages/towerStatusBuilder';

const {
  TOWER_REP_GAIN_TRY,
  TOWER_REP_GAIN_CLEAR,
  TOWER_REP_GAIN_CLEAR_LAST_FLOOR,
} = process.env;

export default {
  name: '!tour',
  alias: '!tower',
  allowedChannels: ['tour-pokemon'],

  description: 'Tente de gravir la tour Pokemon',

  async execute(message: Message, messageContext: MessageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);
    let pokemonObj = null;

    if (!user) {
      message.reply('User not found');
      return;
    }

    if (messageContext.args && messageContext.args.length > 0) {
      const arg = messageContext.args[0];

      if (arg !== 'statut' && arg !== 'status') {
        message.reply('format : !tour statut');
        return;
      }

      message.channel.send(towerStatusBuilder());
      return;
    }

    if (user.tower.maxClearFloor === towerData.floors.length) {
      message.reply('Tu as déjà gravi le dernier étage de la tour cette semaine. Reset à midi le lundi.');
      return;
    }

    if (user.tower.ticketsTotal > 0) {
      const floorData = towerData.floors[user.tower.currentFloor - 1];
      const currentReputationData = towerData.reputations.find((reputation) => (
        user.tower.reputation <= reputation.pointAccumulation
      ));
      const clearRateBonus = currentReputationData?.bonusRateValue || 0;
      const randomClearValue = getRandomInt(1, 100);
      const clearChance = floorData.successRate + clearRateBonus;
      const hasClearedFloor = randomClearValue <= clearChance;
      const isAtLastFloor = user.tower.currentFloor === towerData.floors.length;
      let reputationGain = parseInt(TOWER_REP_GAIN_TRY, 10);

      if (hasClearedFloor) {
        if (isAtLastFloor) {
          reputationGain = parseInt(TOWER_REP_GAIN_CLEAR_LAST_FLOOR, 10);
        } else {
          reputationGain = parseInt(TOWER_REP_GAIN_CLEAR, 10);
        }

        let tempRandMaxValue = 0;
        const rarityList = floorData.rarityList.sort((a, b) => (a.rate > b.rate ? 1 : -1))
          .map((rarity) => {
            tempRandMaxValue += rarity.rate;

            return { ...rarity, randMaxValue: tempRandMaxValue };
          });

        const randomValue = getRandomInt(0, 100);

        const targetRarity = rarityList.find(
          (rarity) => randomValue <= rarity.randMaxValue,
        ) || { min: 0, max: 100 };

        pokemonObj = getRandomPokemonWithRarity(targetRarity.min, targetRarity.max);
        user.pokedex.push(pokemonObj.id);
      }

      const updatedUser = usersModel.updateUser({
        ...user,
        tower: {
          ...user.tower,
          ticketsTotal: user.tower.ticketsTotal - 1,
          reputation: user.tower.reputation + reputationGain,
          currentFloor: hasClearedFloor
            ? Math.min(user.tower.currentFloor + 1, towerData.floors.length)
            : user.tower.currentFloor,
          maxClearFloor: hasClearedFloor
            ? user.tower.maxClearFloor + 1
            : user.tower.maxClearFloor,
        },
      });

      const messageContent = hasClearedFloor
        ? messagesList.success[Math.floor(Math.random() * messagesList.success.length)]
        : messagesList.failure[Math.floor(Math.random() * messagesList.failure.length)];

      const strReward = `
      **${floorData.name} (${floorData.successRate + clearRateBonus}% de chance d'ascension) - ${updatedUser.tower.ticketsTotal} essai(s) restant(s)**
      Réputation "Mr Fuji" augmentée de ${reputationGain}
      \`${messageContent}\``;

      message.reply(strReward);
      if (hasClearedFloor && pokemonObj) {
        message.channel.send(buildCard(pokemonObj, { catched: true }));
      }

      return;
    }

    message.reply('Tu as atteint la limite d\'ascension pour aujourd\'hui. Reset à midi chaque jour.');
  },
};
