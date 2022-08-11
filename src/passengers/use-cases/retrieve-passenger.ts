import { IPassengerSchema } from "../../types";

const makeRetrieveCustomer = ({ PassengerSchema }: IPassengerSchema) => {
  return async ({ customerId }: { customerId: string }) => {
    if (!customerId) {
      throw new Error("You must supply a customer id.");
    }

    const customerData = await PassengerSchema.findById({ customerId });

    return customerData;
  };
};

export default makeRetrieveCustomer;
