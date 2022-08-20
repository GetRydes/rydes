import { JwtPayload } from "jsonwebtoken";

export interface HttpRequest {
  body: any;
  query: any;
  params: any;
  ip: any;
  method: string;
  path: string;
  headers: RequestHeader;
}

export interface HttpResponse {
  headers: ResponseHeader;
  statusCode: number;
  body: any;
}

export interface ResponseHeader {
  "Content-Type": string;
  "Last-Modified"?: string;
}

export interface RequestHeader {
  "Content-Type": string;
  Referer: string;
  "User-Agent": string;
  Authorization?: string;
}

export interface DecodedTokenData extends JwtPayload {
  id?: string;
  email?: string;
}
