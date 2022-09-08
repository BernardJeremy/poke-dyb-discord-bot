import dbManager from '../store/dbManager';
import gdocStore from '../store/gdoc';

const NBR_DAILY_TO_ENABLE_BONUS = 7;

const {
  TOWER_ENTRIES_EACH_DAY,
} = process.env;

const getAllUsers = ({ noFilter }: { noFilter?: boolean } = {}) => {
  const users = dbManager.getAllUsersFromDb({ noFilter });

  return users;
};

const getOneUser = (id: string) => dbManager.getOneUserByIdFromDB(id);

const getInitTowerValue = () => (
  {
    ticketsTotal: parseInt(TOWER_ENTRIES_EACH_DAY, 10),
    currentFloor: 1,
    maxClearFloor: 0,
    reputation: 0,
  });

const getInitRatioValue = () => (
  {
    invoc: 0,
    invocSuccess: 0,
    tower: 0,
    towerSuccess: 0,
    safari: 0,
    safariSuccess: 0,
  });

const createUser = (userAccountData: DiscordUserData) => {
  const users = getAllUsers({ noFilter: true });
  const userData = {
    ...userAccountData,
    pokedex: [],
    lastDailyDate: null,
    gold: 2000,
    dust: 0,
    tickets: 0,
    nbrDailyDone: 0,
    nbrBonusDone: 0,
    claims: {
      gold: 0,
      dust: 0,
      tickets: 0,
    },
    tower: getInitTowerValue(),
    ratio: getInitRatioValue(),
    isAdmin: false,
    isBan: false,
  };

  users.push(userData);

  dbManager.updateUsersFromDb(users);

  return userData;
};

const updateUser = (userData: User, withGdocUpdate = true) => {
  const users = getAllUsers({ noFilter: true });

  users.splice(users.findIndex((user) => userData.id === user.id), 1);
  users.push(userData);

  dbManager.updateUsersFromDb(users);
  if (withGdocUpdate) {
    gdocStore.updatePlayerSheet(userData);
  }

  return userData;
};

const isBonusUsable = (userData: User) => (
  userData.nbrDailyDone >= NBR_DAILY_TO_ENABLE_BONUS
  && userData.nbrBonusDone < Math.trunc(userData.nbrDailyDone / NBR_DAILY_TO_ENABLE_BONUS)
);

const nbrDailyBeforeBonus = (userData: User) => (
  userData.nbrDailyDone === 0
    ? NBR_DAILY_TO_ENABLE_BONUS
    : NBR_DAILY_TO_ENABLE_BONUS - (userData.nbrDailyDone % NBR_DAILY_TO_ENABLE_BONUS)
);

const hasClaims = (userData: User) => {
  if (!userData.claims) {
    return false;
  }

  return (
    userData.claims.gold > 0
    || userData.claims.dust > 0
    || userData.claims.tickets > 0
  );
};

export {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  isBonusUsable,
  nbrDailyBeforeBonus,
  hasClaims,
  getInitTowerValue,
  getInitRatioValue,
};
