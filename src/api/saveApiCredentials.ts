import {apiRoutes} from "../settings/apiRoutes";
import {requestApi} from "./request";
import {RequestMethod} from "../types/apiType";
import {showToast} from "../helpers/toast";
import {ToastType} from "../types/toastType";
import {lang} from "../lang";

export const saveApiCredentials = async (encryptedData: string): Promise<void> => {
  try {
    const result = await requestApi({
      method: RequestMethod.Post,
      path: apiRoutes.credentials,
      body: {
        data: encryptedData,
        token: process.env.REACT_APP_TOKEN,
      },
    });

    showToast(ToastType.Success, lang.success.credentialSaved);
    console.log('save result', result);
  } catch (e) {
    showToast(ToastType.Error, lang.error.credentialNotSaved);
  }
};
