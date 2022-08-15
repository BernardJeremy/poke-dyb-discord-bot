import completePokedex from '../data/pokedex.json';
import { getCleanUserPokedexArray } from './pokemon';

const countDustCostOfAllPokedex = () => completePokedex.reduce((
  totalCost,
  currentPokemon,
): number => totalCost + currentPokemon.craftingPrice, 0);

const getPokedexStatByUsers = (usersList: User[]): UserStats[] => {
  const totalCostPokedex = countDustCostOfAllPokedex();

  return usersList.filter(
    (currentUser) => currentUser.pokedex.length > 0,
  )
    .reduce((usersStats: UserStats[], currentUser) => {
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
        },
      ];
    }, []);
};

export {
  getPokedexStatByUsers,
  countDustCostOfAllPokedex,
};