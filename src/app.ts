import "reflect-metadata";
import express from "express";
import cors from "cors";
import { db } from "./database";
import logger from "./utils/logger";
import { customerRoutes } from "./api/routes";

const port = process.env.PORT || 1337;

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.get("/", (_, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to the rydes api",
  });
});

app.use("/api/v1/customers", customerRoutes);

app.listen(port, async () => {
  logger.info(`Server is running on port ${port}`);
  await db.connectToDB();
});
