import Logger from "./logger";
import response from "./response";
import { makeExpressCallback as makeCallback } from "./express-callback";
import TokenService from "./token";

const utils = Object.freeze({
  Logger,
  response,
  makeCallback,
  TokenService,
});

export default utils;
export { Logger, response, makeCallback, TokenService };
