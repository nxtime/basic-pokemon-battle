import Elysia from "elysia";
import Router from ".";
import { repositories } from "../repositories/main";
import { models, TModels } from "../models/instance";

const initializeRoutes = (app: Elysia) => {
  (Object.keys(models) as TModels[]).forEach((route) => {
    new Router(app, route, repositories[route]);
  });

}

export default initializeRoutes;
