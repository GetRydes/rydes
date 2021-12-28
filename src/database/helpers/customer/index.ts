import ipRegex from "ip-regex";
import bcrypt from "bcrypt";
import crypto from "crypto";
import buildMakeCustomer from "./customer";
import buildMakeSource from "../generic/source";

const isValidIp = (ip: string) => {
  return ipRegex({ exact: true }).test(ip);
};

const createHash = async (text: string | Buffer): Promise<string> => {
  return await bcrypt.hash(text, 10);
};

const sanitize = (text: string) => {
  // TODO: allow more coding embeds
  return text.trim();
};

const md5 = (text: string) => {
  return crypto.createHash("md5").update(text, "utf-8").digest("hex");
};

const makeSource = buildMakeSource({ isValidIp });
const makeCustomer = buildMakeCustomer({
  makeSource,
  createHash,
  sanitize,
  md5,
});

export default makeCustomer;
