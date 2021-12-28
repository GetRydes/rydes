import { Customer } from "../database/entity/Customer";

export interface ICustomerEntity {
  Customer: Customer;
}

export interface ICustomerSchema {
  customerSchema: {
    findAll: () => Promise<unknown[] | undefined>;
    findByHash: ({ hash }: any) => Promise<any>;
    findById: (data: any) => Promise<any>;
    insert: (
      data: ICustomerData & {
        hash: string;
      }
    ) => Promise<any>;
    remove: () => Promise<void>;
    update: () => Promise<void>;
  };
}

export interface ICustomerData {
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
