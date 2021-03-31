import express from "express";
import bodyParser from "body-parser";
import acl from "express-acl";
import routes from "./routes";
import database from "./database";
import authMiddleware from "./middlewares/auth";

const app = express();

acl.config({
  baseUrl: "/",
  path: "config",
});

const configureExpress = () => {
  app.use(bodyParser.json());
  app.use(authMiddleware);
  app.use(acl.authorize.unless({ path: ["/users/authenticate"] }));
  app.use("/", routes);
  app.database = database;

  return app;
};

export default async () => {
  const appConfig = configureExpress();
  await appConfig.database.connect();

  return appConfig;
};
