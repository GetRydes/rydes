import "reflect-metadata";
import { createConnection, Connection, getConnection } from "typeorm";
import { ICustomerData } from "../types";
import logger from "../utils/logger";
import { Customer } from "./entity/Customer";
import { DeviceSource } from "./entity/DeviceSource";

class Database {
  public connection: Connection | null = null;

  public async connectToDB(): Promise<Connection> {
    try {
      const response = await createConnection();
      this.connection = response;
      logger.info("DB connected");
      return response;
    } catch (e) {
      console.error("Error connecting to DB: ", e);
      process.exit(1);
    }
  }

  public makeRydesDb(Entity: any) {
    return Object.freeze({
      findAll,
      findByHash,
      findById,
      // findByPostId,
      // findReplies,
      insert,
      remove,
      update,
    });

    async function findAll() {
      const connection = getConnection();

      const repository = connection.getRepository(Entity);
      const result = await repository.find();
      return result;
    }

    async function findById({ customerId }: any) {
      const connection = getConnection();

      const repository = connection.getRepository(Entity);
      const customer = await repository.findOne({
        where: { id: customerId },
        relations: ["sources"],
      });
      if (customer === undefined) {
        return null;
      }
      return customer;
    }

    async function findByHash({ hash }: any): Promise<any> {
      const connection = getConnection();

      const repository = connection.getRepository(Entity);
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
      const customerRepository = connection.getRepository(Entity);
      const sourceRepository = connection.getRepository(DeviceSource);

      // create customer
      const customer = new Entity();
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
      source.customer = customerResult.id;
      await sourceRepository.save(source);

      return customerResult;
    }

    async function remove() {}

    async function update() {}
  }
}

const db = new Database();
const customerSchema = db.makeRydesDb(Customer);

const dbService = Object.freeze({
  db,
  customerSchema,
});

export default dbService;
export { db, customerSchema };
