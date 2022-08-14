const PostgressConnectionStringParser = require("pg-connection-string");
const dotenv = require("dotenv");
const { join } = require("path");
dotenv.config();

const getProdOptions = () => {
  const databaseUrl = process.env.DATABASE_URL;
  if (databaseUrl !== undefined) {
    const connectionOptions =
      PostgressConnectionStringParser.parse(databaseUrl);
    const typeOrmOptions = {
      host: connectionOptions.host,
      port: connectionOptions.port,
      username: connectionOptions.user,
      password: connectionOptions.password,
      database: connectionOptions.database,
    };

    return typeOrmOptions;
  }
  return {
    host: "",
    port: "",
    username: "",
    password: "",
    database: "",
  };
};

const envString = (prodString, devString) => {
  return process.env.NODE_ENV === "production" ? prodString : devString;
};

const sslConfig = envString({ ssl: { rejectUnauthorized: false } }, {});

module.exports = {
  name: "default",
  type: process.env.DB_TYPE || "postgres",
  host: envString(getProdOptions().host, process.env.DB_HOST),
  port: envString(getProdOptions().port, process.env.DB_PORT),
  username: envString(getProdOptions().username, process.env.DB_USER),
  password: envString(getProdOptions().password, process.env.DB_PASSWORD),
  database: envString(getProdOptions().database, process.env.DB_NAME),
  synchronize: false,
  logging: false,
  entities: [
    envString(
      join(__dirname, "build/**", "*.entity.{ts,js}"),
      join(__dirname, "**", "*.entity.{ts,js}")
    ),
  ],
  migrations: [
    envString(
      join(__dirname, "build/**", "database/migrations", "**", "*.{ts,js}"),
      join(__dirname, "**", "database/migrations", "**", "*.{ts,js}")
    ),
  ],
  subscribers: [
    envString(
      join(__dirname, "build/**", "subscribers", "**", "*.{ts,js}"),
      join(__dirname, "**", "subscribers", "**", "*.{ts,js}")
    ),
  ],
  cli: {
    entitiesDir: envString(
      join(__dirname, "build/**", "entities"),
      join(__dirname, "**", "entities")
    ),
    migrationsDir: envString(
      join(__dirname, "build/src", "database/migrations"),
      join(__dirname, "src", "database/migrations")
    ),
    subscribersDir: envString(
      join(__dirname, "build/src", "subscribers"),
      join(__dirname, "src", "database/subscribers")
    ),
  },
  ...sslConfig,
};
