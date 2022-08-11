import { HttpRequest, HttpResponse, ICustomerData } from "../../types";

const makePatchCustomer = ({ editCustomer, Logger }: any) => {
  return async (httpRequest: HttpRequest): Promise<HttpResponse> => {
    try {
      const { source = {}, ...customerInfo } = httpRequest.body;

      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers["User-Agent"];
      if (httpRequest.headers["Referer"]) {
        source.referrer = httpRequest.headers["Referer"];
      }

      const toEdit: ICustomerData & { id: string } = {
        ...customerInfo,
        source,
        id: httpRequest.params.id,
      };

      const patched = await editCustomer(toEdit);

      return {
        headers: {
          "Content-Type": "application/json",
          "Last-Modified": new Date(patched.modifiedOn).toUTCString(),
        },
        statusCode: 200,
        body: {
          customer: {
            ...patched,
          },
        },
      };
    } catch (e: any) {
      Logger.error(e);
      if (e.name === "RangeError") {
        return {
          headers: {
            "Content-Type": "application/json",
          },
          statusCode: 404,
          body: {
            error: e.message,
          },
        };
      }
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

export default makePatchCustomer;
