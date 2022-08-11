import dotenv from "dotenv";

export default (callback?: () => void) => {
  dotenv.config();
  // you might also want to add config validation,
  // also all the config should be loaded into a json object
  // so that we dont have to access the variables from process.env
  callback?.();
};
