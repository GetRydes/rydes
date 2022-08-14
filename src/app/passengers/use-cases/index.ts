import PassengerSchema from "../pasengers.data-access";
import makeAddCustomer from "./add-passenger";
import makeEditCustomer from "./edit-passenger";
import makeListCustomers from "./list-passengers";
import makeRemoveCustomer from "./remove-passenger";
import makeRetrieveCustomer from "./retrieve-passenger";

const addCustomer = makeAddCustomer({ PassengerSchema });
const retrieveCustomer = makeRetrieveCustomer({
  PassengerSchema,
});
const listCustomers = makeListCustomers({ PassengerSchema });
const editCustomer = makeEditCustomer({ PassengerSchema });
const removeCustomer = makeRemoveCustomer({ PassengerSchema });

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
