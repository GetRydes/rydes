import dayjs from "dayjs";
import {
  HttpRequest,
  HttpResponse,
  IMakePostUserController,
} from "../../../types";

const makePostCustomer = ({
  addCustomer,
  response,
  Logger,
}: IMakePostUserController) => {
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

      return response(
        {
          passenger: createdCustomer,
        },
        201,
        {
          "Last-Modified": `${dayjs(createdCustomer.updated_at).format(
            "ddd, DD MMM YYYY HH:mm:ss"
          )} GMT`,
          "Content-Type": "application/json",
        }
      );
    } catch (e: any) {
      Logger.error(e);
      return response({ message: e.message }, 400);
    }
  };
};

export default makePostCustomer;
