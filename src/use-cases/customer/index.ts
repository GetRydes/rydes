import { customerSchema } from "../../database";
import makeAddCustomer from "./add-customer";
import makeListCustomers from "./list-customers";
import makeRetrieveCustomer from "./retrieve-customer";

const addCustomer = makeAddCustomer({ customerSchema });
const retrieveCustomer = makeRetrieveCustomer({
  customerSchema,
});
const listCustomers = makeListCustomers({ customerSchema });

const userService = Object.freeze({
  addCustomer,
  retrieveCustomer,
  listCustomers,
});

export default userService;
export { addCustomer, retrieveCustomer, listCustomers };
