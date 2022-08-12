import { Application } from "express";
import { Logger } from "../utils";
import authLoader from "./auth";
import configLoader from "./config";
import expressLoader from "./express";
import routeLoader from "./route";

const init = async ({ app }: { app: Application }) => {
  configLoader(() => Logger.info("Config Module Initialized"));
  await expressLoader(app, () =>
    Logger.info("Express Middlewares Initialized")
  );
  await authLoader(app, () => Logger.info("Auth Module Initialized"));
  routeLoader(app);
};

const loaders = Object.freeze({
  init,
});

export default loaders;
export { init };
