import { CredentialPostItem } from "./tableType";

export enum RequestMethod {
  Get = "get",
  Post = "post",
  Delete = "delete",
  Patch = "patch",
  Put = "put",
}

export interface RequestConfig {
  method?: RequestMethod;
  path: string;
  body?: any;
  params?: any;
}

export interface LoginRequest {
  password: string;
  user: string;
}

export interface ApiLoginResponse {
  jwt: string;
  user: ApiUserResponse;
}

export interface ApiUserResponse {
  created_at: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  updated_at: string;
  username: string;
}

export interface CredentialType {
  id: string;
  label: string;
}

export interface PostDataApi {
  items: CredentialPostItem[];
  updated: string;
  credentialTypes: CredentialType[];
}
