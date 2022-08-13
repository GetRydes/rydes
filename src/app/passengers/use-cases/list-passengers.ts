import { IPassengerSchema, IGetCustomersData } from "../../../types";

const makeListCustomers = ({ PassengerSchema }: IPassengerSchema) => {
  return ({ customerId }: IGetCustomersData) => {
    if (!customerId) {
      return PassengerSchema.findAll();
    }

    return PassengerSchema.findById({
      customerId,
    });
  };
};

export default makeListCustomers;
