import {
  addCustomer,
  listCustomers,
  retrieveCustomer,
  editCustomer,
  removeCustomer,
} from "../../../use-cases";
import { Logger } from "../../../utils";
import makePostCustomer from "./post-customer";
import makeGetCustomers from "./get-customers";
import makeGetCustomer from "./get-customer";
import makePatchCustomer from "./patch-customer";
import makeDeleteCustomer from "./delete-customer";

const postCustomer = makePostCustomer({ addCustomer, Logger });
const getCustomers = makeGetCustomers({ listCustomers, Logger });
const getCustomer = makeGetCustomer({ retrieveCustomer, Logger });
const patchCustomer = makePatchCustomer({ editCustomer, Logger });
const deleteCustomer = makeDeleteCustomer({ removeCustomer, Logger });

const userController = Object.freeze({
  postCustomer,
  getCustomers,
  getCustomer,
  patchCustomer,
  deleteCustomer,
});

export default userController;
export {
  postCustomer,
  getCustomers,
  getCustomer,
  patchCustomer,
  deleteCustomer,
};
