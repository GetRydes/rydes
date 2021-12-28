import {
  addCustomer,
  listCustomers,
  retrieveCustomer,
} from "../../../use-cases";
import { Logger } from "../../../utils";
import makePostCustomer from "./post-customer";
import makeGetCustomers from "./get-customers";
import makeGetCustomer from "./get-customer";

const postCustomer = makePostCustomer({ addCustomer, Logger });
const getCustomers = makeGetCustomers({ listCustomers, Logger });
const getCustomer = makeGetCustomer({ retrieveCustomer, Logger });

const userController = Object.freeze({
  postCustomer,
  getCustomers,
  getCustomer,
});

export default userController;
export { postCustomer, getCustomers, getCustomer };
