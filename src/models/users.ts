import dbManager from '../store/dbManager';
import gdocStore from '../store/gdoc';

const NBR_DAILY_TO_ENABLE_BONUS = 7;

const {
  TOWER_TICKETS_EACH_DAY,
} = process.env;

const getAllUsers = () => {
  const users = dbManager.getAllUsersFromDb();

  return users;
};

const getOneUser = (id: string) => {
  const users = getAllUsers();

  const user = users.find((oneUser) => oneUser.id === id);

  return user || null;
};

const getInitTowerValue = () => (
  {
    ticketsTotal: parseInt(TOWER_TICKETS_EACH_DAY, 10),
    currentFloor: 1,
    maxClearFloor: 0,
    reputation: 0,
  });

const createUser = (userAccountData: DiscordUserData) => {
  const users = getAllUsers();
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
    },
    tower: getInitTowerValue(),
    isAdmin: false,
  };

  users.push(userData);

  dbManager.updateUsersFromDb(users);

  return userData;
};

const updateUser = (userData: User, withGdocUpdate = true) => {
  const users = getAllUsers();

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
};
