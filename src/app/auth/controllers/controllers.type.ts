import pino from "pino";
import { ControllerType, ICustomerData } from "../../../types";
import { ResponseGenerator } from "../../../utils/response";

export type AuthControllerFactory = (
  response: ResponseGenerator,
  Logger: pino.Logger,
  options?: {
    useCases?: {
      retrievePassenger?: RetrievePassenger;
      addPassenger?: AddPassenger;
    };
  }
) => ControllerType;

export type AddPassenger = (customerInfo: ICustomerData) => Promise<any>;
export type RetrievePassenger = ({
  customerId,
}: {
  customerId: string;
}) => Promise<any>;
