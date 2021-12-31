import "reflect-metadata";
import express from "express";
import { db } from "./database";
import logger from "./utils/logger";
import loaders from "./loaders";

const startServer = async () => {
  const port = process.env.PORT || 1337;

  const app = express();

  await loaders.init({ app });

  app.listen(port, async () => {
    logger.info(`Server is running on port ${port}`);
    await db.connectToDB();
  });
};

startServer();
