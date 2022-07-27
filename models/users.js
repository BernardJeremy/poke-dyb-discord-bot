const dbManager = require('../store/dbManager');

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
    gold: 0,
    dust: 0,
    nbrDailyDone: 0,
    nbrBonusDone: 0,
    isAdmin: false,
  };

  console.log(userData);

  users.push(userData);

  dbManager.updateUsers(users);

  return userData;
};

const updateUser = (userData) => {
  const users = getAllUsers();

  users.splice(users.findIndex((user) => userData.id === user.id), 1);
  users.push(userData);

  dbManager.updateUsers(users);

  return userData;
};

const isBonusUsable = (userData) => (
  userData.nbrDailyDone >= 7 && userData.nbrBonusDone < Math.trunc(userData.nbrDailyDone / 7)
);

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  isBonusUsable,
};