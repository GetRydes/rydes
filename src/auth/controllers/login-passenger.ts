import { HttpRequest, HttpResponse } from "../../types";
import { AuthControllerFactory } from "./controllers.type";

const makeLoginPassenger: AuthControllerFactory = (response, Logger) => {
  return async (request: HttpRequest): Promise<HttpResponse> => {
    try {
      switch (request.params.status) {
        case "success":
          // generate access and refresh token

          return response(
            {
              status: true,
            },
            200
          );
        default:
          return response(
            { message: "Unauthorised request", status: false },
            401
          );
      }
    } catch (e: any) {
      Logger.error(e);
      return response(
        {
          message: e.message,
        },
        400
      );
    }
  };
};

export default makeLoginPassenger;
