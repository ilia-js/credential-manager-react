import axios from "axios";
import { RequestConfig, RequestMethod } from "../types/apiType";

export const requestApi = async (config: RequestConfig) => {
  let result;
  const path = `${process.env.REACT_APP_API_URL}${config.path}`;

  try {
    switch (config.method) {
      case RequestMethod.Post:
        result = await axios.post(path, config.body ?? {}, {
          params: config.params ?? {},
        });
        break;
      case RequestMethod.Put:
      case RequestMethod.Patch:
      case RequestMethod.Delete:
      case RequestMethod.Get:
      default:
        result = await axios.get(path, {
          params: config.params ?? {},
        });

      //return "123";
    }

    console.log("hi", result);
    return result?.data ?? null;

    //console.log(result);
  } catch (e: any) {
    console.log(123, e?.response);
  }

  console.log("anywya");
};
