import cryptoJs from "crypto-js";

export const aesEncrypt = (text: string, key: string): string => {
  return cryptoJs.AES.encrypt(text, key).toString();
};

export const aesDecrypt = (text: string, key: string): string => {
  try {
    let bytes = cryptoJs.AES.decrypt(text, key);
    return bytes.toString(cryptoJs.enc.Utf8);
  } catch (e) {
    return "";
  }
};
