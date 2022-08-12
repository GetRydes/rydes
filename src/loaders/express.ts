import cors from "cors";
import express, { Application } from "express";
import session from "express-session";

export default async (app: Application, callback?: () => void) => {
  app.use(cors());
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );
  app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY as string,
      resave: false,
      saveUninitialized: false,
    })
  );

  callback?.();
};
