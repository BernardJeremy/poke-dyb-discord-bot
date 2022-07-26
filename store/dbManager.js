const fs = require('fs');
const JSONdb = require('simple-json-db');

const JSON_DATA_FILE_PATH = process.env.JSON_DB_FILE;

fs.closeSync(fs.openSync(JSON_DATA_FILE_PATH, 'a'));

const db = new JSONdb(JSON_DATA_FILE_PATH);

const getAllUsers = () => {
  const users = db.get('users') || [];

  return users;
};

const updateUsers = (users) => {
  db.set('users', users);

  return users;
};

module.exports = {
  getAllUsers,
  updateUsers,
};
