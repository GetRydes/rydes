import {
  addCustomer,
  listCustomers,
  retrieveCustomer,
  editCustomer,
  removeCustomer,
} from "./use-cases";
import { Logger } from "../utils";
import makePostCustomer from "./controllers/post-customer";
import makeGetCustomers from "./controllers/get-customers";
import makeGetCustomer from "./controllers/get-customer";
import makePatchCustomer from "./controllers/patch-customer";
import makeDeleteCustomer from "./controllers/delete-customer";

const postCustomer = makePostCustomer({ addCustomer, Logger });
const getCustomers = makeGetCustomers({ listCustomers, Logger });
const getCustomer = makeGetCustomer({ retrieveCustomer, Logger });
const patchCustomer = makePatchCustomer({ editCustomer, Logger });
const deleteCustomer = makeDeleteCustomer({ removeCustomer, Logger });

const passengerController = Object.freeze({
  postCustomer,
  getCustomers,
  getCustomer,
  patchCustomer,
  deleteCustomer,
});

export default passengerController;
export {
  postCustomer,
  getCustomers,
  getCustomer,
  patchCustomer,
  deleteCustomer,
};
