import makeCustomer from "../../database/helpers/customer";
import { ICustomerData, ICustomerSchema } from "../../types";

const makeAddCustomer = ({ customerSchema }: ICustomerSchema) => {
  return async (customerInfo: ICustomerData) => {
    const customer = await makeCustomer(customerInfo);

    const exists = await customerSchema.findByHash({
      hash: customer.getHash(),
    });
    if (exists) {
      return exists;
    }

    const customerSource = customer.getSource();

    return customerSchema.insert({
      firstName: customer.getFirstName(),
      lastName: customer.getLastName(),
      email: customer.getEmail(),
      password: customer.getPassword(),
      phoneNumber: customer.getPhoneNumber(),
      source: {
        ip: customerSource.getIp(),
        browser: customerSource.getBrowser(),
        referrer: customerSource.getReferrer(),
      },
      hash: customer.getHash(),
    });
  };
};

export default makeAddCustomer;
