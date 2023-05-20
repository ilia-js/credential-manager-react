import { LoginRequest, LoginResponse, RequestMethod } from "../types/apiType";
import { requestApi } from "../api/request";
import { apiRoutes } from "../settings/apiRoutes";
import { showToast } from "../helpers/toast";
import { ToastType } from "../types/toastType";
import { lang } from "../lang";

export const useLogin = async (
  email: string,
  password: string
): Promise<void> => {
  const result: LoginResponse | null = await requestApi({
    method: RequestMethod.Post,
    path: apiRoutes.login,
    body: { email, password } as LoginRequest,
  });

  if (result?.access_token) {
    showToast(ToastType.Success, lang.success.login);
  } else {
    showToast(ToastType.Error, lang.error.loginFailed);
  }
};
