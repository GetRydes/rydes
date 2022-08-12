import pino from "pino";
import { ControllerType } from "../../types";
import { ResponseGenerator } from "../../utils/response";

export type AuthControllerFactory = (
  response: ResponseGenerator,
  Logger: pino.Logger
) => ControllerType;
