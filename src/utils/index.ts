import Logger from "./logger";

const utils = Object.freeze({
  Logger,
});
export default utils;

export { makeExpressCallback as makeCallback } from "./express-callback";
export { Logger };
