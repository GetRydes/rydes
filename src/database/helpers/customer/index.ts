import ipRegex from "ip-regex";
import argon2 from "argon2";
import crypto from "crypto";
import buildMakeCustomer from "./customer";
import buildMakeSource from "../generic/source";

const isValidIp = (ip: string) => {
  return ipRegex({ exact: true }).test(ip);
};

const createHash = async (text: string | Buffer): Promise<string> => {
  return await argon2.hash(text);
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
