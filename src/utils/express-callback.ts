import { Request, Response } from "express";
import { HttpRequest, ControllerType } from "../types";

export const makeExpressCallback = (controller: ControllerType) => {
  return (req: Request, res: Response): Response | void => {
    const httpRequest: HttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        "Content-Type": req.get("Content-Type")!,
        Referer: req.get("referer")!,
        "User-Agent": req.get("User-Agent")!,
      },
    };

    controller(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type("json");
        return res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((e) => {
        return res
          .status(500)
          .send({ message: "An unkown error occurred.", status: false });
      });
  };
};
