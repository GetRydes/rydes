import { HttpRequest, HttpResponse } from "../../../types";

const makeGetCustomer = ({ retrieveCustomer, Logger }: any) => {
  return async (httpRequest: HttpRequest): Promise<HttpResponse> => {
    try {
      const { id } = httpRequest.params;
      const customers = await retrieveCustomer({ customerId: id });

      return {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": "",
        },
        statusCode: 200,
        body: {
          customers,
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
          message: e.message,
        },
      };
    }
  };
};

export default makeGetCustomer;
