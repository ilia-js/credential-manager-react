import { apiRoutes } from "../settings/apiRoutes";
import axios from "axios";
import { aesDecrypt } from "../helpers/encryption";

export const getSecrets = async (secretKey: string): Promise<any> => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/${apiRoutes.secrets}`,
      {
        params: {
          token: process.env.REACT_APP_TOKEN,
        },
      }
    );

    const encryptedData = res?.data?.data?.data;
    return JSON.parse(aesDecrypt(encryptedData, secretKey));
  } catch (e) {
    // TODO: Handle errors;
  }
};
