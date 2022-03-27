import cors from "cors";
import express, { Application, Response } from "express";
import swaggerUi from "swagger-ui-express";
import routes from "../api/routes";
import swaggerFile from "../../swagger-output.json";

export default async ({ app }: { app: Application }) => {
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );

  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerFile));

  app.use("/api/v1", routes);

  app.all("*", (_, res: Response) => {
    res.status(400).send({
      message: "Invalid api route",
    });
  });
};
