import { apiRoutes } from "../settings/apiRoutes";
import { aesDecrypt } from "../helpers/encryption";
import { requestApi } from "./requestApi";
import { PostDataApi } from "../types/apiType";
import {showToast} from "../helpers/toast";
import {ToastType} from "../types/toastType";
import {lang} from "../lang";

export const getApiCredentials = async (secretKey: string): Promise<PostDataApi | void> => {
  try {
    const result = await requestApi({
      path: apiRoutes.credentials,
    });

    const encryptedData = result?.data?.data;
    return JSON.parse(aesDecrypt(encryptedData, secretKey));
  } catch (e) {
    showToast(ToastType.Error, lang.error.cannotGetCredentials);
  }
};
