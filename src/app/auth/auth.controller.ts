import { Logger } from "../../utils";
import response from "../../utils/response";
import { addCustomer } from "../passengers/use-cases";
import makeLoginPassenger from "./controllers/login-passenger";
import makeRegisterPassenger from "./controllers/register-passenger";

const registerPassenger = makeRegisterPassenger(addCustomer, response, Logger);
const loginPassenger = makeLoginPassenger(null, response, Logger);

const authController = Object.freeze({ registerPassenger, loginPassenger });
export default authController;
export { registerPassenger, loginPassenger };
