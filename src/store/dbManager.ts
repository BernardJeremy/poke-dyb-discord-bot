import * as fs from 'fs';

import JSONdb from 'simple-json-db';
import { InvocationData } from '../types/invocation.types';
import { SafariEncounterData } from '../types/safari.types';

const JSON_DATA_FILE_PATH = process.env.JSON_DB_FILE || './data.json';

fs.closeSync(fs.openSync(JSON_DATA_FILE_PATH, 'a'));

const db = new JSONdb(JSON_DATA_FILE_PATH);

const getOneUserByIdFromDB = (id: string): User | null => {
  const users: User[] = db.get('users') || [];

  return users.find((user) => user.id === id) || null;
};

const getAllUsersFromDb = ({ noFilter }: { noFilter?: boolean } = {}): User[] => {
  const users: User[] = db.get('users') || [];

  return noFilter ? users : users.filter((user) => user.pokedex.length > 0);
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

const getAllInvocationsFromDb = (): InvocationData[] => {
  const invocations: InvocationData[] = db.get('invocations') || [];

  return invocations;
};

const updateInvocationsFromDb = (invocations: InvocationData[]): InvocationData[] => {
  db.set('invocations', invocations);

  return invocations;
};

export default {
  getOneUserByIdFromDB,
  getAllUsersFromDb,
  updateUsersFromDb,
  getAllTradesFromDb,
  updateTradesFromDb,
  getAllSafariesFromDb,
  updateSafariesFromDb,
  getAllInvocationsFromDb,
  updateInvocationsFromDb,
};
