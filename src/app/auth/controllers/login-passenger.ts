import { HttpRequest, HttpResponse } from "../../../types";
import { AuthControllerFactory } from "./controllers.type";
import PassengerSchema from "../../passengers/pasengers.data-access";

const makeLoginPassenger: AuthControllerFactory = (_, response, Logger) => {
  return async (request: HttpRequest): Promise<HttpResponse> => {
    try {
      switch (request.params.status) {
        case "success":
          const { id, email } = request.query;
          const passengerTokenData = PassengerSchema.createToken({ id, email });

          return response(
            {
              success: true,
              data: {
                ...passengerTokenData,
              },
            },
            200
          );
        default:
          return response(
            { message: "Unauthorised request", success: false },
            401
          );
      }
    } catch (e: any) {
      Logger.error(e);
      return response(
        {
          success: false,
          message: e.message,
        },
        400
      );
    }
  };
};

export default makeLoginPassenger;
