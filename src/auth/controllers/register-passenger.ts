import { HttpRequest, HttpResponse } from "../../types";
import { AuthControllerFactory } from "./controllers.type";

const makeRegisterPassenger: AuthControllerFactory = (response, Logger) => {
  return async (request: HttpRequest): Promise<HttpResponse> => {
    // save user information and also generate access and refresh token

    try {
      return response({ status: true }, 201);
    } catch (e: any) {
      Logger.error(e);
      return response({ message: e.message, status: false }, 400);
    }
  };
};

export default makeRegisterPassenger;
