import {
  HttpRequest,
  HttpResponse,
  IMakePostUserController,
} from "../../types";

const makePostCustomer = ({ addCustomer, Logger }: IMakePostUserController) => {
  return async (httpRequest: HttpRequest): Promise<HttpResponse> => {
    try {
      const { source = {}, ...customerInfo } = httpRequest.body;

      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers["User-Agent"];
      if (httpRequest.headers["Referer"]) {
        source.referrer = httpRequest.headers["Referer"];
      }

      const createdCustomer = await addCustomer({
        ...customerInfo,
        source,
      });

      return {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": "",
        },
        statusCode: 201,
        body: {
          customer: createdCustomer,
        },
      };
    } catch (e: any) {
      Logger.error(e);
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
};

export default makePostCustomer;
