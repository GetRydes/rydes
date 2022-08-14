import { getConnection } from "typeorm";
import jwt from "jsonwebtoken";
import { Passenger } from "./entities/passenger.entity";
import { Device } from "../devices/entities/device.entity";
import { ICustomerData } from "../../types";
import dayjs from "dayjs";

async function findAll() {
  const connection = getConnection();

  const repository = connection.getRepository(Passenger);
  const result = await repository.find();
  return result;
}

async function findById({ customerId }: { customerId: string }) {
  const connection = getConnection();

  const repository = connection.getRepository(Passenger);
  const customer = await repository.findOne({
    where: { id: customerId },
    relations: ["devices", "saved_addresses"],
  });
  if (customer === undefined) {
    return null;
  }
  return customer;
}

async function findOne(
  query: { email?: string; phone_number?: string },
  callback?: (err: boolean, passenger?: Passenger) => void
) {
  const connection = getConnection();
  const repository = connection.getRepository(Passenger);

  const passenger = await repository.findOne({
    where: { ...query },
    relations: ["devices", "saved_addresses"],
  });
  if (passenger === undefined) {
    callback?.(true);
    return null;
  }
  callback?.(false, passenger);
  return passenger;
}

async function findByHash({ hash }: any): Promise<any> {
  const connection = getConnection();

  const repository = connection.getRepository(Passenger);
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
  // create customer
  const customer = new Passenger(
    (({ hash, email, firstName, lastName, password, phoneNumber }) => ({
      hash,
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      phone_number: phoneNumber,
    }))(data)
  );
  const customerResult = await customer.save();

  // save user device information to db
  const source = new Device(
    (({ browser, ip, referrer }) => ({
      browser,
      ip,
      referrer,
      passenger: customerResult,
    }))(data.source)
  );
  await source.save();

  return customerResult;
}

async function remove({ customerId }: { customerId: string }) {
  const customerToDelete = await Passenger.findOne(customerId);
  if (customerToDelete) await Passenger.remove(customerToDelete);
}

async function update(data: ICustomerData) {
  const connection = getConnection();
  const customerRepository = connection.getRepository(Passenger);

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

function createToken(data: { id: string; email: string }) {
  // save tokens to database with their expiry
  // so that when we want to handle jwt revocation on logout or blakclisting the refresh token

  const accessToken = jwt.sign(
    { ...data, sub: data.id },
    process.env.TOKEN_SECRET_KEY as string,
    {
      expiresIn: "3d",
      issuer: "",
    }
  );
  const refreshToken = jwt.sign(
    { ...data, sub: data.id },
    process.env.TOKEN_SECRET_KEY as string,
    {
      expiresIn: "7d",
    }
  );

  return {
    accessToken,
    accessTokenExpiresIn: dayjs().add(3, "day"),
    refreshToken,
    refreshTokenExpiresIn: dayjs().add(7, "day"),
  };
}

const PassengerSchema = Object.freeze({
  update,
  remove,
  insert,
  findByHash,
  findAll,
  findById,
  findOne,
  createToken,
});

export default PassengerSchema;
export {
  update,
  remove,
  findByHash,
  findAll,
  findById,
  insert,
  findOne,
  createToken,
};
