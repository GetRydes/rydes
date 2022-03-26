import cors from "cors";
import express, { Application, Response } from "express";
import routes from "../api/routes";

export default async ({ app }: { app: Application }) => {
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );

  app.use("/api/v1", routes);

  app.all("*", (_, res: Response) => {
    res.status(400).send({
      message: "Invalid api route",
    });
  });
};
