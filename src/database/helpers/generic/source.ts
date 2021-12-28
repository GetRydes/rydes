import { IMakeSourceResult, ISource } from "../../../types";

export default function buildMakeSource({ isValidIp }: any) {
  return function makeSource(source: ISource): IMakeSourceResult {
    if (!source.ip) {
      throw new Error("Customer source must contain an IP.");
    }
    if (!isValidIp(source.ip)) {
      throw new RangeError("Customer source must contain a valid IP.");
    }
    return Object.freeze({
      getIp: () => source.ip,
      getBrowser: () => source.browser,
      getReferrer: () => source.referrer,
    });
  };
}
