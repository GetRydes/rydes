import {
  IBuildMakeCustomer,
  ICustomerData,
  IMakeCustomer,
} from "../../../types";

export default function buildMakeCustomer({
  makeSource,
  createHash,
  sanitize,
  md5,
}: IBuildMakeCustomer) {
  return async ({
    id = "",
    source,
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
  }: ICustomerData): Promise<IMakeCustomer> => {
    /*
      todo: add validation for input from the frontend using joi or something
    */
    const validSource = makeSource(source);
    const passwordHash = await createHash(password);

    const generateCustomerHash = () => {
      return md5(firstName + lastName + email + phoneNumber);
    };

    return Object.freeze({
      getId: () => id,
      getSource: () => validSource,
      getFirstName: () => sanitize(firstName),
      getLastName: () => sanitize(lastName),
      getEmail: () => sanitize(email),
      getPassword: () => passwordHash,
      getPhoneNumber: () => sanitize(phoneNumber),
      getHash: () => generateCustomerHash(),
    });
  };
}
