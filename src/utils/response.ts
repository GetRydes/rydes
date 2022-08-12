import dayjs from "dayjs";
import { HttpResponse, ResponseHeader } from "../types";

const response: ResponseGenerator = (body = {}, statusCode, headers) => {
  return {
    body,
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Last-Modified": dayjs().format("ddd, DD MMM YYYY HH:mm:ss"),
      ...headers,
    },
  };
};

export type ResponseGenerator = (
  body: { [key: string]: any },
  statusCode: number,
  headers?: ResponseHeader & { [key: string]: any }
) => HttpResponse;

export default response;
