import * as fs from 'fs';

import JSONdb from 'simple-json-db';
import { SafariEncounterData } from '../types/safari.types';

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
  const trades: Trade[] = db.get('trades') || [];

  return trades;
};

const updateTradesFromDb = (trades: Trade[]): Trade[] => {
  db.set('trades', trades);

  return trades;
};

const getAllSafariesFromDb = (): SafariEncounterData[] => {
  const safaries: SafariEncounterData[] = db.get('safaries') || [];

  return safaries;
};

const updateSafariesFromDb = (safaries: SafariEncounterData[]): SafariEncounterData[] => {
  db.set('safaries', safaries);

  return safaries;
};

export default {
  getAllUsersFromDb,
  updateUsersFromDb,
  getAllTradesFromDb,
  updateTradesFromDb,
  getAllSafariesFromDb,
  updateSafariesFromDb,
};
