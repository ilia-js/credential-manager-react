import { apiRoutes } from "../settings/apiRoutes";
import { aesDecrypt } from "../helpers/encryption";
import { requestApi } from "./request";
import { PostDataApi } from "../types/apiType";

export const getApiCredentials = async (secretKey: string): Promise<PostDataApi | null> => {
  try {
    const result = await requestApi({
      path: apiRoutes.credentials,
      params: {
        token: process.env.REACT_APP_TOKEN,
      },
    });

    const encryptedData = result?.data?.data;
    return JSON.parse(aesDecrypt(encryptedData, secretKey));
  } catch (e) {
    // TODO: Handle errors;
    return null;
  }
};
