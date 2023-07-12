import { LoginRequest, LoginResponse, RequestMethod } from "../types/apiType";
import { requestApi } from "../api/requestApi";
import { apiRoutes } from "../settings/apiRoutes";
import { showToast } from "../helpers/toast";
import { ToastType } from "../types/toastType";
import { lang } from "../lang";
import {resetAuthToken, resetAuthUser, saveAuthToken, saveAuthUser} from "../helpers/auth";
import { localRoutes } from "../settings/localRoutes";

export const useLogin = async (
  navigate: any,
  email: string,
  password: string
): Promise<void> => {
  try {
    const result: LoginResponse | null = await requestApi({
      method: RequestMethod.Post,
      path: apiRoutes.login,
      body: {email, password} as LoginRequest,
    });

    if (result) {
      saveAuthToken(result.access_token);
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
