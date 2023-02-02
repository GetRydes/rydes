import PassengerSchema from "../../passengers/pasengers.data-access";
import { AuthControllerFactory } from "./controllers.type";

const makeRegisterPassenger: AuthControllerFactory = (
  response,
  Logger,
  options
) => {
  return async (request) => {
    // save user information and also generate access and refresh token

    try {
      const { source = {}, ...passengerInfo } = request.body;
      const { addPassenger } = options?.useCases!;

      source.ip = request.ip;
      source.browser = request.headers["User-Agent"];
      if (request.headers["Referer"]) {
        source.referrer = request.headers["Referer"];
      }

      const passenger = await addPassenger?.({
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
