import cors from "cors";
import express, { Application, Response } from "express";
import routes from "../app.route";

export default async (app: Application, callback?: () => void) => {
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );

  app.get("/", (_, res: Response) => {
    return res.redirect("/api/v1/docs");
  });

  app.use("/api/v1", routes);

  app.all("*", (_, res: Response) => {
    res.status(400).send({
      message: "Invalid api route",
      status: false,
    });
  });

  callback?.();
};
