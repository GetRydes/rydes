import { Application } from "express";

export default async (app: Application, callback?: () => void) => {
  // this will be used to handle loader for passport and co
  callback?.();
};
