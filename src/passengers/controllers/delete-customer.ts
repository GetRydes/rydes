import { HttpRequest, HttpResponse } from "../../types";

const makeDeleteCustomer = ({ removeCustomer, Logger }: any) => {
  return async (httpRequest: HttpRequest): Promise<HttpResponse> => {
    try {
      const deleted = await removeCustomer({ id: httpRequest.params.id });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: deleted.deletedCount === 0 ? 404 : 200,
        body: { deleted },
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

export default makeDeleteCustomer;
