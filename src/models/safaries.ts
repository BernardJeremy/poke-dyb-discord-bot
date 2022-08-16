import dbManager from '../store/dbManager';
import { SafariEncounterData } from '../types/safari.types';

const getAllSafaries = () => {
  const safaries = dbManager.getAllSafariesFromDb();

  return safaries;
};

const getOneSafariByOwnerId = (ownerId: string) => {
  const safaries = getAllSafaries();

  const safari = safaries.find((oneSafari) => oneSafari.ownerId === ownerId);

  return safari || null;
};

const createSafari = (safariData: SafariEncounterData) => {
  const safaries = getAllSafaries();
  safaries.push(safariData);

  dbManager.updateSafariesFromDb(safaries);

  return safariData;
};

const updateSafari = (safariData: SafariEncounterData) => {
  const safaries = getAllSafaries();

  safaries.splice(safaries.findIndex((safari) => safariData.ownerId === safari.ownerId), 1);
  safaries.push(safariData);

  dbManager.updateSafariesFromDb(safaries);

  return safariData;
};

const deleteSafari = (safariData: SafariEncounterData) => {
  const safaries = getAllSafaries();

  safaries.splice(safaries.findIndex((safari) => safariData.ownerId === safari.ownerId), 1);

  dbManager.updateSafariesFromDb(safaries);

  return safariData;
};

export {
  getAllSafaries,
  getOneSafariByOwnerId,
  createSafari,
  updateSafari,
  deleteSafari,
};
