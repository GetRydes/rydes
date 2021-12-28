import { HttpRequest, HttpResponse } from "./reqRes.type";
import logger from "pino";

export type ControllerType = (request: HttpRequest) => Promise<HttpResponse>;

export interface IMakePostUserController {
  addCustomer: any;
  Logger: logger.Logger;
}
