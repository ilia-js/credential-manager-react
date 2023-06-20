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
  email: string;
}

export interface LoginResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  user: UserResponse;
}

export interface UserResponse {
  created_at: string;
  email: string;
  email_verified_at: string | null;
  id: number;
  name: string;
  updated_at: string;
}

export interface PostDataApi {
  items: any; // TODO: REturn back CredentialItem[];
  updated: string;
}
