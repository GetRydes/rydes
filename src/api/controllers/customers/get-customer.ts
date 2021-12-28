import { HttpRequest, HttpResponse } from "../../../types";

const makeGetCustomer = ({ retrieveCustomer, Logger }: any) => {
  return async (httpRequest: HttpRequest): Promise<HttpResponse> => {
    try {
      const customers = await retrieveCustomer();

      return {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": "",
        },
        statusCode: 200,
        body: customers,
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

export default makeGetCustomer;
