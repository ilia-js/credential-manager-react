import axios from "axios";
import { RequestConfig, RequestMethod } from "../types/apiType";
import {getAuthToken} from "../helpers/auth";

export const requestApi = async (config: RequestConfig) => {
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
    // TODO: Should we process every status: 422, 401, etc separately?
    throw new Error("API error");
  }
};
