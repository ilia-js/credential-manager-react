import axios from "axios";
import { RequestConfig, RequestMethod } from "../types/apiType";
import {getAuthToken, resetAuthToken, resetAuthUser} from "../helpers/auth";
import {localRoutes} from "../settings/localRoutes";

export const requestApi = async (config: RequestConfig, redirectToLoginOnUnauthorized = true) => {
  let result;
  const path = `${process.env.REACT_APP_API_URL}${config.path}`;
  const headers = { Authorization: `Bearer ${getAuthToken() ?? ""}` };

  try {
    switch (config.method) {
      case RequestMethod.Post:
        result = await axios.post(path, config.body ?? {}, {
          params: config.params ?? {},
          headers,
        });
        break;
      case RequestMethod.Put:
      case RequestMethod.Patch:
      case RequestMethod.Delete:
      case RequestMethod.Get:
      default:
        result = await axios.get(path, {
          params: config.params ?? {},
          headers
        });
    }

    return result?.data ?? null;
  } catch (e: any) {
    if (e?.response?.status === 401) {
      resetAuthToken();
      resetAuthUser();

      if (redirectToLoginOnUnauthorized) {
        window.location.href = localRoutes.login;
      }
    }

    throw new Error("API error");
  }
};
