import { HttpRequest, HttpResponse } from "./reqRes.type";
import logger from "pino";
import { ResponseGenerator } from "../utils/response";

export type ControllerType = (request: HttpRequest) => Promise<HttpResponse>;

export interface IMakePostUserController {
  addCustomer: any;
  response: ResponseGenerator;
  Logger: logger.Logger;
}
