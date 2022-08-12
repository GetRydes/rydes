import { Logger } from "../utils";
import response from "../utils/response";
import makeLoginPassenger from "./controllers/login-passenger";
import makeRegisterPassenger from "./controllers/register-passenger";

const registerPassenger = makeRegisterPassenger(response, Logger);
const loginPassenger = makeLoginPassenger(response, Logger);

const authController = Object.freeze({ registerPassenger, loginPassenger });
export default authController;
export { registerPassenger, loginPassenger };
