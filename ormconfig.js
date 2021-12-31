const PostgressConnectionStringParser = require("pg-connection-string");
const dotenv = require("dotenv");
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

module.exports = {
  name: "default",
  type: process.env.DB_TYPE || "postgres",
  host: envString(getProdOptions().host, process.env.DB_HOST),
  port: envString(getProdOptions().port, process.env.DB_PORT),
  username: envString(getProdOptions().username, process.env.DB_USER),
  password: envString(getProdOptions().password, process.env.DB_PASSWORD),
  database: envString(getProdOptions().database, process.env.DB_NAME),
  synchronize: true,
  logging: false,
  //   extra: {
  //     ssl: { rejectUnauthorized: false },
  //   },
  entities: [
    envString("build/database/entity/**/*.js", "src/database/entity/**/*.ts"),
  ],
  migrations: [
    envString(
      "build/database/migration/**/*.js",
      "src/database/migration/**/*.ts"
    ),
  ],
  cli: {
    migrationsDir: envString(
      "build/database/migration",
      "src/database/migration"
    ),
  },
  subscribers: [
    envString(
      "build/database/subscriber/**/*.js",
      "src/database/subscriber/**/*.ts"
    ),
  ],
  cli: {
    entitiesDir: envString("build/database/entity", "src/database/entity"),
    migrationsDir: envString(
      "build/database/migration",
      "src/database/migration"
    ),
    subscribersDir: envString(
      "build/database/subscriber",
      "src/database/subscriber"
    ),
  },
};
