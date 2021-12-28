import { ICustomerSchema, IGetCustomersData } from "../../types";

const makeListCustomers = ({ customerSchema }: ICustomerSchema) => {
  return ({ customerId }: IGetCustomersData) => {
    if (!customerId) {
      return customerSchema.findAll();
    }

    return customerSchema.findById({
      customerId,
    });
  };
};

export default makeListCustomers;
