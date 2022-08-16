import pino from "pino";
import { ControllerType, ICustomerData } from "../../../types";
import { ResponseGenerator } from "../../../utils/response";

export type AuthControllerFactory = (
  useCase: AddPassenger | null,
  response: ResponseGenerator,
  Logger: pino.Logger
) => ControllerType;

export type AddPassenger = (customerInfo: ICustomerData) => Promise<any>;
