import {
  LoginRequest,
  ApiLoginResponse,
  RequestMethod,
} from "../types/apiType";
import { requestApi } from "../api/requestApi";
import { apiRoutes } from "../settings/apiRoutes";
import { showToast } from "../helpers/toast";
import { ToastType } from "../types/toastType";
import { lang } from "../lang";
import {
  resetAuthToken,
  resetAuthUser,
  saveAuthToken,
  saveAuthUser,
} from "../helpers/auth";
import { localRoutes } from "../settings/localRoutes";

export const useLogin = async (
  navigate: any,
  user: string,
  password: string
): Promise<void> => {
  try {
    const result: ApiLoginResponse | null = await requestApi(
      {
        method: RequestMethod.Post,
        path: apiRoutes.login,
        body: { user, password } as LoginRequest,
      },
      false
    );

    if (result) {
      saveAuthToken(result.jwt);
      saveAuthUser(result.user);
      showToast(ToastType.Success, lang.success.login);
      navigate(localRoutes.home);
    }
  } catch (e) {
    resetAuthToken();
    resetAuthUser();
    showToast(ToastType.Error, lang.error.loginFailed);
  }
};
