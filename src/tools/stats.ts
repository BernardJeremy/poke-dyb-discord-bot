import completePokedex from '../data/pokedex.json';
import { UserStats } from '../types/stats.types';
import { getCleanUserPokedexArray } from './pokemon';

const countDustCostOfAllPokedex = () => completePokedex.reduce((
  totalCost,
  currentPokemon,
): number => totalCost + currentPokemon.craftingPrice, 0);

const getPokedexStatByUsers = (usersList: User[]): UserStats[] => {
  const totalCostPokedex = countDustCostOfAllPokedex();

  return usersList.reduce((usersStats: UserStats[], currentUser) => {
    const formattedUserPokedex = getCleanUserPokedexArray(currentUser.pokedex);

    return [
      ...usersStats,
      {
        name: currentUser.username,
        nbrPokemon: formattedUserPokedex.length,
        totalCostUserPokemon: formattedUserPokedex.reduce((
          totalCost,
          currentPokemon,
        ): number => {
          const currentCraftingPrice = currentPokemon.craftingPrice;
          const multiplePokemonResellPrice = currentPokemon.nbr > 1
            ? ((currentPokemon.nbr - 1) * (currentCraftingPrice / 2)) : 0;
          return totalCost + currentCraftingPrice + multiplePokemonResellPrice;
        }, currentUser.dust),
        totalCostPokedex,
        gold: currentUser.gold,
        dust: currentUser.dust,
        tickets: currentUser.tickets || 0,
        towerTryRemaining: currentUser.tower.ticketsTotal,
        invoc: currentUser.ratio.invoc,
        invocSuccess: currentUser.ratio.invocSuccess,
        tower: currentUser.ratio.tower,
        towerSuccess: currentUser.ratio.towerSuccess,
        safari: currentUser.ratio.safari,
        safariSuccess: currentUser.ratio.safariSuccess,
        invocSuccessPercent: Math.round(
          (currentUser.ratio.invocSuccess / currentUser.ratio.invoc) * 100,
        ),
        towerSuccessPercent: Math.round(
          (currentUser.ratio.towerSuccess / currentUser.ratio.tower) * 100,
        ),
        safariSuccessPercent: Math.round(
          (currentUser.ratio.safariSuccess / currentUser.ratio.safari) * 100,
        ),
      },
    ];
  }, []);
};

const getAverageRatio = (usersList: User[]): UserRatio => {
  const totalInvoc = usersList.reduce((total, user) => (
    user.ratio.invoc + total
  ), 0);
  const totalInvocSuccess = usersList.reduce((total, user) => (
    user.ratio.invocSuccess + total
  ), 0);
  const totalTower = usersList.reduce((total, user) => (
    user.ratio.tower + total
  ), 0);
  const totalTowerSuccess = usersList.reduce((total, user) => (
    user.ratio.towerSuccess + total
  ), 0);
  const totalSafari = usersList.reduce((total, user) => (
    user.ratio.safari + total
  ), 0);
  const totalSafariSuccess = usersList.reduce((total, user) => (
    user.ratio.safariSuccess + total
  ), 0);
  const totalArceus = usersList.reduce((total, user) => (
    user.ratio.arceus + total
  ), 0);

  return {
    invoc: totalInvoc,
    invocSuccess: totalInvocSuccess,
    invocSuccessPercentage: Math.round(
      (totalInvocSuccess / totalInvoc) * 100,
    ),
    tower: totalTower,
    towerSuccess: totalTowerSuccess,
    towerSuccessPercentage: Math.round(
      (totalTowerSuccess / totalTower) * 100,
    ),
    safari: totalSafari,
    safariSuccess: totalSafariSuccess,
    safariSuccessPercentage: Math.round(
      (totalSafariSuccess / totalSafari) * 100,
    ),
    arceus: totalArceus,
  };
};

export {
  getPokedexStatByUsers,
  countDustCostOfAllPokedex,
  getAverageRatio,
};
