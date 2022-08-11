import { getConnection } from "typeorm";
import { Customer } from "../database/entity/Customer";
import { DeviceSource } from "../database/entity/DeviceSource";
import { ICustomerData } from "../types";

async function findAll() {
  const connection = getConnection();

  const repository = connection.getRepository(Customer);
  const result = await repository.find();
  return result;
}

async function findById({ customerId }: { customerId: string }) {
  const connection = getConnection();

  const repository = connection.getRepository(Customer);
  const customer = await repository.findOne({
    where: { id: customerId },
    relations: ["sources", "saved_addresses"],
  });
  if (customer === undefined) {
    return null;
  }
  return customer;
}

async function findByHash({ hash }: any): Promise<any> {
  const connection = getConnection();

  const repository = connection.getRepository(Customer);
  const result = await repository.findOne({ hash });
  if (result === undefined) {
    return null;
  }
  return result;
}

async function insert(
  data: ICustomerData & {
    hash: string;
  }
): Promise<any> {
  const connection = getConnection();
  const customerRepository = connection.getRepository(Customer);
  const sourceRepository = connection.getRepository(DeviceSource);

  // create customer
  const customer = new Customer();
  customer.hash = data.hash;
  customer.email = data.email;
  customer.first_name = data.firstName;
  customer.last_name = data.lastName;
  customer.password = data.password;
  customer.phone_number = data.phoneNumber;
  const customerResult = await customerRepository.save(customer);

  // save user device information to db
  const source = new DeviceSource();
  source.browser = data.source.browser;
  source.ip = data.source.ip;
  source.referrer = data.source.referrer;
  source.customer = customerResult;
  await sourceRepository.save(source);

  return customerResult;
}

async function remove({ customerId }: { customerId: string }) {
  const connection = getConnection();
  const customerRepository = connection.getRepository(Customer);

  const customerToDelete = await customerRepository.findOne(customerId);
  if (customerToDelete) await customerRepository.remove(customerToDelete);
}

async function update(data: ICustomerData) {
  const connection = getConnection();
  const customerRepository = connection.getRepository(Customer);

  const customerToUpdate: any = await customerRepository.findOne(data.id);
  customerToUpdate.hash = data.hash;
  customerToUpdate.email = data.email;
  customerToUpdate.first_name = data.firstName;
  customerToUpdate.last_name = data.lastName;
  customerToUpdate.password = data.password;
  customerToUpdate.phone_number = data.phoneNumber;

  const result = await customerRepository.save(customerToUpdate);

  return result;
}

const PassengerSchema = Object.freeze({
  update,
  remove,
  insert,
  findByHash,
  findAll,
  findById,
});

export default PassengerSchema;
export { update, remove, findByHash, findAll, findById, insert };
