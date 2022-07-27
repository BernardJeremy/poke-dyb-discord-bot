const dbManager = require('../store/dbManager');

const getAllTrades = () => {
  const trades = dbManager.getAllTrades();

  return trades;
};

const getOneTradeByOwnerId = (ownerId) => {
  const trades = getAllTrades();

  const trade = trades.find((oneTrade) => oneTrade.ownerId === ownerId);

  return trade || null;
};

const createTrade = ({
  tradeStr,
  ownerId,
  offer,
  demand,
}) => {
  const trades = getAllTrades();
  const tradeData = {
    tradeStr,
    ownerId,
    offer,
    demand,
  };

  trades.push(tradeData);

  dbManager.updateTrades(trades);

  return tradeData;
};

const updateTrade = (tradeData) => {
  const trades = getAllTrades();

  trades.splice(trades.findIndex((trade) => tradeData.ownerId === trade.ownerId), 1);
  trades.push(tradeData);

  dbManager.updateTrades(trades);

  return tradeData;
};

const deleteTrade = (tradeData) => {
  const trades = getAllTrades();

  trades.splice(trades.findIndex((trade) => tradeData.ownerId === trade.ownerId), 1);

  dbManager.updateTrades(trades);

  return tradeData;
};

module.exports = {
  getAllTrades,
  getOneTradeByOwnerId,
  createTrade,
  updateTrade,
  deleteTrade,
};
