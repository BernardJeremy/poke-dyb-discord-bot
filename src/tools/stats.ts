import completePokedex from '../data/pokedex.json';
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
        ): number => totalCost + currentPokemon.craftingPrice, 0),
        totalCostPokedex,
        gold: currentUser.gold,
        dust: currentUser.dust,
        tickets: currentUser.tickets || 0,
      },
    ];
  }, []);
};

export {
  getPokedexStatByUsers,
  countDustCostOfAllPokedex,
};
