const towerDailyResetController = require('./towerDailyReset');
const towerWeeklyResetController = require('./towerWeeklyReset');

const {
  HTTP_ROUTE_SUFFIX,
} = process.env;

const setupHttpRoutes = (app) => {
  app.get(`/tower/daily/${HTTP_ROUTE_SUFFIX}`, (req, res) => {
    towerDailyResetController.execute();
    res.send('OK');
  });

  app.get(`/tower/weekly/${HTTP_ROUTE_SUFFIX}`, (req, res) => {
    towerWeeklyResetController.execute();
    res.send('OK');
  });

  app.get(`/ping/${HTTP_ROUTE_SUFFIX}`, (req, res) => {
    res.send('PONG');
  });
};

module.exports = setupHttpRoutes;
