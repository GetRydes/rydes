import { Customer } from "../database/entity/Customer";

export interface ICustomerEntity {
  Customer: Customer;
}

export interface IPassengerSchema {
  PassengerSchema: {
    findAll: () => Promise<unknown[] | undefined>;
    findByHash: ({ hash }: any) => Promise<any>;
    findById: ({ customerId }: { customerId: string }) => Promise<any>;
    insert: (
      data: ICustomerData & {
        hash: string;
      }
    ) => Promise<any>;
    remove: (data: { customerId: string }) => Promise<void>;
    update: (data: ICustomerData) => Promise<ICustomerData>;
  };
}

export interface ICustomerData {
  id?: string;
  hash?: string;
  source: ISource;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface ISource {
  ip: string;
  browser: string;
  referrer?: string;
}

export interface IMakeSourceResult {
  getIp: () => string;
  getBrowser: () => string;
  getReferrer: () => string | undefined;
}

export interface IBuildMakeCustomer {
  makeSource: (source: ISource) => IMakeSourceResult;
  createHash: (text: string | Buffer) => Promise<string>;
  sanitize: (text: string) => string;
  md5: (text: string) => string;
}

export interface IMakeCustomer {
  getId: () => string;
  getSource: () => IMakeSourceResult;
  getFirstName: () => string;
  getLastName: () => string;
  getEmail: () => string;
  getPassword: () => string;
  getPhoneNumber: () => string;
  getHash: () => string;
}

export interface IGetCustomersData {
  customerId?: string;
}
