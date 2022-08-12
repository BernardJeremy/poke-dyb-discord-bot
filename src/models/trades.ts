import dbManager from '../store/dbManager';

const getAllTrades = () => {
  const trades = dbManager.getAllTradesFromDb();

  return trades;
};

const getOneTradeByOwnerId = (ownerId: string) => {
  const trades = getAllTrades();

  const trade = trades.find((oneTrade) => oneTrade.ownerId === ownerId);

  return trade || null;
};

const createTrade = ({
  tradeStr,
  ownerId,
  offer,
  demand,
}: Trade) => {
  const trades = getAllTrades();
  const tradeData = {
    tradeStr,
    ownerId,
    offer,
    demand,
  };

  trades.push(tradeData);

  dbManager.updateTradesFromDb(trades);

  return tradeData;
};

const updateTrade = (tradeData: Trade) => {
  const trades = getAllTrades();

  trades.splice(trades.findIndex((trade) => tradeData.ownerId === trade.ownerId), 1);
  trades.push(tradeData);

  dbManager.updateTradesFromDb(trades);

  return tradeData;
};

const deleteTrade = (tradeData: Trade) => {
  const trades = getAllTrades();

  trades.splice(trades.findIndex((trade) => tradeData.ownerId === trade.ownerId), 1);

  dbManager.updateTradesFromDb(trades);

  return tradeData;
};

export {
  getAllTrades,
  getOneTradeByOwnerId,
  createTrade,
  updateTrade,
  deleteTrade,
};
