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

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
};
