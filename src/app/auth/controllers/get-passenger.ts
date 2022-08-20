import jwt from "jsonwebtoken";
import { DecodedTokenData } from "../../../types";
import { TokenService } from "../../../utils";
import { AuthControllerFactory } from "./controllers.type";

const makeGetPassenger: AuthControllerFactory = (response, Logger, options) => {
  return async (request) => {
    try {
      const { retrievePassenger } = options?.useCases!;

      const token = TokenService.retrieve(request);
      const decodedToken = TokenService.verify(token);
      const { id } = decodedToken as DecodedTokenData;

      const passenger = await retrievePassenger?.({ customerId: id! });

      return response(
        {
          success: true,
          data: passenger,
        },
        200
      );
    } catch (err: any) {
      Logger.error(err);
      return response(
        {
          success: false,
          message: err.message,
        },
        400
      );
    }
  };
};

export default makeGetPassenger;
