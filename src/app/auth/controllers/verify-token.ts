import { TokenService } from "../../../utils";
import { AuthControllerFactory } from "./controllers.type";

const makeVerifyToken: AuthControllerFactory = (response, Logger) => {
  return async (request) => {
    try {
      const token = TokenService.retrieve(request);
      const decodedToken = TokenService.verify(token);

      return response(
        {
          success: true,
          data: decodedToken,
        },
        200
      );
    } catch (error: any) {
      Logger.error(error);
      return response(
        {
          success: false,
          message: error.message,
        },
        400
      );
    }
  };
};

export default makeVerifyToken;
