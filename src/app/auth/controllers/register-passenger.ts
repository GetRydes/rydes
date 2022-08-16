import { HttpRequest, HttpResponse } from "../../../types";
import PassengerSchema from "../../passengers/pasengers.data-access";
import { AuthControllerFactory } from "./controllers.type";

const makeRegisterPassenger: AuthControllerFactory = (
  addCustomer,
  response,
  Logger
) => {
  return async (request: HttpRequest): Promise<HttpResponse> => {
    // save user information and also generate access and refresh token

    try {
      const { source = {}, ...passengerInfo } = request.body;

      source.ip = request.ip;
      source.browser = request.headers["User-Agent"];
      if (request.headers["Referer"]) {
        source.referrer = request.headers["Referer"];
      }

      const passenger = await addCustomer?.({
        ...passengerInfo,
        source,
      });

      const tokenData = PassengerSchema.createToken({
        email: passenger.email,
        id: passenger.id,
      });

      return response(
        {
          success: true,
          data: { passenger, ...tokenData },
        },
        201
      );
    } catch (e: any) {
      Logger.error(e);
      return response({ message: e.message, success: false }, 400);
    }
  };
};

export default makeRegisterPassenger;
