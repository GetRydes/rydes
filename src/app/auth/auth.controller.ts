import { Logger, response } from "../../utils";
import {
  addCustomer as addPassenger,
  retrieveCustomer as retrievePassenger,
} from "../passengers/use-cases";
import makeGetPassenger from "./controllers/get-passenger";
import makeLoginPassenger from "./controllers/login-passenger";
import makeRegisterPassenger from "./controllers/register-passenger";
import makeVerifyToken from "./controllers/verify-token";

const registerPassenger = makeRegisterPassenger(response, Logger, {
  useCases: {
    addPassenger,
  },
});
const loginPassenger = makeLoginPassenger(response, Logger);
const getPassenger = makeGetPassenger(response, Logger, {
  useCases: {
    retrievePassenger,
  },
});
const verifyToken = makeVerifyToken(response, Logger);

const authController = Object.freeze({
  registerPassenger,
  loginPassenger,
  getPassenger,
  verifyToken,
});
export default authController;
export { registerPassenger, loginPassenger, getPassenger, verifyToken };
