import cors from "cors";
import express, { Application, Request, Response } from "express";
import { customerRoutes } from "../api/routes";

export default async ({ app }: { app: Application }) => {
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );

  app.get("/status", (_, res) => {
    return res.status(200).json({
      message: "Rydes trip gateway service is up and running ",
    });
  });

  app.use("/api/v1/customers", customerRoutes);

  app.all("*", (_, res: Response) => {
    res.status(400).send({
      message: "Invalid api route",
    });
  });
};
