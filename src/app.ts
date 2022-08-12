import "reflect-metadata";
import express from "express";
import { db } from "./database";
import { Logger } from "./utils";
import loaders from "./loaders";

const startServer = async () => {
  const port = process.env.PORT || 1337;

  const app = express();

  await loaders.init({ app });

  app.listen(port, async () => {
    Logger.info(`Server is running on port ${process.env.APP_URL}:${port}`);
    await db.connectToDB();
  });
};

startServer();
