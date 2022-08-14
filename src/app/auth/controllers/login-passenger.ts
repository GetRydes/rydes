import { HttpRequest, HttpResponse } from "../../../types";
import { AuthControllerFactory } from "./controllers.type";
import PassengerSchema from "../../passengers/pasengers.data-access";

const makeLoginPassenger: AuthControllerFactory = (response, Logger) => {
  return async (request: HttpRequest): Promise<HttpResponse> => {
    try {
      switch (request.params.status) {
        case "success":
          const { id, email } = request.query;
          const passengerTokenData = PassengerSchema.createToken({ id, email });

          return response(
            {
              status: true,
              data: {
                ...passengerTokenData,
              },
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
          status: false,
          message: e.message,
        },
        400
      );
    }
  };
};

export default makeLoginPassenger;
