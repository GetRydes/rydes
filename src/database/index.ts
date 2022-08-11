import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import logger from "../utils/logger";

class Database {
  public connection: Connection | null = null;

  public async connectToDB(): Promise<Connection> {
    try {
      const response = await createConnection();
      this.connection = response;
      logger.info("DB connected");
      return response;
    } catch (e) {
      logger.error("Error connecting to DB: ", e);
      process.exit(1);
    }
  }
}

const db = new Database();

const dbService = Object.freeze({
  db,
});

export default dbService;
export { db };
