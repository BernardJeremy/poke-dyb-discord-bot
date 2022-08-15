import { Application } from 'express';
import towerResetController from './towerReset';

const {
  HTTP_ROUTE_SUFFIX,
} = process.env;

const setupHttpRoutes = (app: Application) => {
  app.get(`/tower/reset/${HTTP_ROUTE_SUFFIX}`, (req, res) => {
    towerResetController.execute();
    res.send('OK');
  });

  app.get(`/ping/${HTTP_ROUTE_SUFFIX}`, (req, res) => {
    res.send('PONG');
  });
};

export default setupHttpRoutes;
