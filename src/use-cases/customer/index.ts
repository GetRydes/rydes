import { customerSchema } from "../../database";
import makeAddCustomer from "./add-customer";
import makeEditCustomer from "./edit-customer";
import makeListCustomers from "./list-customers";
import makeRemoveCustomer from "./remove-customer";
import makeRetrieveCustomer from "./retrieve-customer";

const addCustomer = makeAddCustomer({ customerSchema });
const retrieveCustomer = makeRetrieveCustomer({
  customerSchema,
});
const listCustomers = makeListCustomers({ customerSchema });
const editCustomer = makeEditCustomer({ customerSchema });
const removeCustomer = makeRemoveCustomer({ customerSchema });

const userService = Object.freeze({
  addCustomer,
  retrieveCustomer,
  listCustomers,
  editCustomer,
  removeCustomer,
});

export default userService;
export {
  addCustomer,
  retrieveCustomer,
  listCustomers,
  editCustomer,
  removeCustomer,
};
