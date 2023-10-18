import { AES, enc } from "crypto-js";

export const aesEncrypt = (text: string, key: string): string => {
  return AES.encrypt(text, key).toString();
};

export const aesDecrypt = (text: string, key: string): string => {
  try {
    let bytes = AES.decrypt(text, key);
    return bytes.toString(enc.Utf8);
  } catch (e) {
    return "";
  }
};
