const dbManager = require('../store/dbManager');
const gdocStore = require('../store/gdoc');

const NBR_DAILY_TO_ENABLE_BONUS = 7;

const getAllUsers = () => {
  const users = dbManager.getAllUsers();

  return users;
};

const getOneUser = (id) => {
  const users = getAllUsers();

  const user = users.find((oneUser) => oneUser.id === id);

  return user || null;
};

const createUser = (userAccountData) => {
  const users = getAllUsers();
  const userData = {
    ...userAccountData,
    pokedex: [],
    lastDailyDate: null,
    gold: 2000,
    dust: 0,
    nbrDailyDone: 0,
    nbrBonusDone: 0,
    claims: {
      gold: 0,
      dust: 0,
    },
    isAdmin: false,
  };

  users.push(userData);

  dbManager.updateUsers(users);

  return userData;
};

const updateUser = (userData) => {
  const users = getAllUsers();

  users.splice(users.findIndex((user) => userData.id === user.id), 1);
  users.push(userData);

  dbManager.updateUsers(users);
  gdocStore.updatePlayerSheet(userData);

  return userData;
};

const isBonusUsable = (userData) => (
  userData.nbrDailyDone >= NBR_DAILY_TO_ENABLE_BONUS
  && userData.nbrBonusDone < Math.trunc(userData.nbrDailyDone / NBR_DAILY_TO_ENABLE_BONUS)
);

const nbrDailyBeforeBonus = (userData) => (
  userData.nbrDailyDone === 0
    ? NBR_DAILY_TO_ENABLE_BONUS
    : NBR_DAILY_TO_ENABLE_BONUS - (userData.nbrDailyDone % NBR_DAILY_TO_ENABLE_BONUS)
);

const hasClaims = (userData) => {
  if (!userData.claims) {
    return false;
  }

  return (
    userData.claims.gold > 0
    || userData.claims.dust > 0
  );
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  isBonusUsable,
  nbrDailyBeforeBonus,
  hasClaims,
};
