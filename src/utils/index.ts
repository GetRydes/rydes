import Logger from "./logger";
import response from "./response";
import { makeExpressCallback as makeCallback } from "./express-callback";

const utils = Object.freeze({
  Logger,
  response,
  makeCallback,
});

export default utils;
export { Logger, response, makeCallback };
