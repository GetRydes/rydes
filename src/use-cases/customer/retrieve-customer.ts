import { ICustomerSchema } from "../../types";

const makeRetrieveCustomer = ({ customerSchema }: ICustomerSchema) => {
  return async ({ customerId }: { customerId: string }) => {
    if (!customerId) {
      throw new Error("You must supply a customer id.");
    }

    const customerData = await customerSchema.findById({ customerId });

    return customerData;
  };
};

export default makeRetrieveCustomer;
