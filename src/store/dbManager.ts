import * as fs from 'fs';

import JSONdb from 'simple-json-db';

const JSON_DATA_FILE_PATH = process.env.JSON_DB_FILE || './data.json';

fs.closeSync(fs.openSync(JSON_DATA_FILE_PATH, 'a'));

const db = new JSONdb(JSON_DATA_FILE_PATH);

const getAllUsersFromDb = (): User[] => {
  const users: User[] = db.get('users') || [];

  return users.filter((user) => user.pokedex.length > 0);
};

const updateUsersFromDb = (users: User[]): User[] => {
  db.set('users', users);

  return users;
};

const getAllTradesFromDb = (): Trade[] => {
  const users: Trade[] = db.get('trades') || [];

  return users;
};

const updateTradesFromDb = (trades: Trade[]): Trade[] => {
  db.set('trades', trades);

  return trades;
};

export default {
  getAllUsersFromDb,
  updateUsersFromDb,
  getAllTradesFromDb,
  updateTradesFromDb,
};
