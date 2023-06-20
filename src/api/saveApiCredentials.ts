import {apiRoutes} from "../settings/apiRoutes";
import {requestApi} from "./request";
import {RequestMethod} from "../types/apiType";
import {showToast} from "../helpers/toast";
import {ToastType} from "../types/toastType";
import {lang} from "../lang";

export const saveApiCredentials = async (encryptedData: string): Promise<void> => {
  try {
    await requestApi({
      method: RequestMethod.Post,
      path: apiRoutes.credentials,
      body: {
        data: encryptedData,
      },
    });

    showToast(ToastType.Success, lang.success.credentialSaved);
  } catch (e) {
    showToast(ToastType.Error, lang.error.credentialNotSaved);
  }
};
