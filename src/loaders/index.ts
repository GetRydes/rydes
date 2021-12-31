import { Application } from "express";
import { Logger } from "../utils";
import expressLoader from "./express";

const init = async ({ app }: { app: Application }) => {
  await expressLoader({ app });
  Logger.info("Express Initialized");
};

const loaders = Object.freeze({
  init,
});

export default loaders;
export { init };
