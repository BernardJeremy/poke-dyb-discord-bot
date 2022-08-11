const usersModel = require('../models/users');
const { getRandomInt } = require('../tools/utils');
const buildCard = require('../messages/cardBuilder');

const towerData = require('../data/tower.json');
const { getRandomPokemonWithRarity } = require('../tools/pokemon');

const {
  TOWER_REP_GAIN_TRY,
  TOWER_REP_GAIN_CLEAR,
  TOWER_REP_GAIN_CLEAR_LAST_FLOOR,
} = process.env;

module.exports = {
  name: '!tour',
  alias: '!tower',

  description: 'Tente de gravir la tour Pokemon',

  async execute(message, messageContext) {
    const user = usersModel.getOneUser(messageContext.author.id);
    let pokemonObj = null;

    if (!user.tower) {
      user.tower = usersModel.getInitTowerValue();
    }

    if (user.tower.ticketsToday > 0) {
      const floorData = towerData.floors[user.tower.currentFloor - 1];
      const clearRateBonus = towerData.reputations.find((reputation) => (
        user.tower.reputation <= reputation.pointAccumulation
      )).bonusRateValue;
      const randomClearValue = getRandomInt(1, 100);
      const clearChance = floorData.successRate + clearRateBonus;
      const hasClearedFloor = randomClearValue <= clearChance;
      let reputationGain = parseInt(TOWER_REP_GAIN_TRY, 10);

      if (hasClearedFloor) {
        if (user.tower.currentFloor === towerData.floors.length) {
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

        const targetRarity = rarityList.find((rarity) => randomValue <= rarity.randMaxValue);

        pokemonObj = getRandomPokemonWithRarity(targetRarity.min, targetRarity.max);
        user.pokedex.push(pokemonObj.id);
      }

      const updatedUser = usersModel.updateUser({
        ...user,
        tower: {
          ...user.tower,
          ticketsTotal: user.tower.ticketsTotal - 1,
          ticketsToday: user.tower.ticketsToday - 1,
          reputation: user.tower.reputation + reputationGain,
          currentFloor: hasClearedFloor
            ? Math.min(user.tower.currentFloor + 1, towerData.floors.length)
            : user.tower.currentFloor,
        },
      });

      const strReward = `
      **${floorData.name} (${floorData.successRate + clearRateBonus}% de chance d'ascension) - ${updatedUser.tower.ticketsTotal} essais restants**
      Réputation "Mr Fuji" augmentée de ${reputationGain}
      \`${hasClearedFloor ? 'Félicication, tu as réussi à passer cette étage !' : 'Dommage, tu reste bloqué à cette étage pour l\'instant.'}\``;

      message.reply(strReward);
      if (hasClearedFloor) {
        message.channel.send(buildCard(pokemonObj));
      }

      return;
    }

    message.reply('Tu as atteint la limite d\'ascension pour aujourd\'hui. Reset à midi chaque jour.');
  },
};
