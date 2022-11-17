import { Application } from 'express';
import { readFileSync } from 'fs';
import towerResetController from './towerReset';
import adventCalendarController from './adventCalendar';

const {
  HTTP_ROUTE_SUFFIX,
  JSON_DB_FILE,
} = process.env;

const setupHttpRoutes = (app: Application) => {
  app.get(`/tower/reset/${HTTP_ROUTE_SUFFIX}`, (req, res) => {
    towerResetController.execute();
    res.send('OK');
  });

  app.get(`/event/advent/${HTTP_ROUTE_SUFFIX}`, (req, res) => {
    adventCalendarController.execute();
    res.send('OK');
  });

  app.get(`/json/${HTTP_ROUTE_SUFFIX}`, (req, res) => {
    const rawdata = readFileSync(JSON_DB_FILE || './data.json');
    const jsonData = JSON.parse(rawdata.toString());

    res.json(jsonData);
  });

  app.get(`/ping/${HTTP_ROUTE_SUFFIX}`, (req, res) => {
    res.send('PONG');
  });
};

export default setupHttpRoutes;
