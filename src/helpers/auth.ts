import {localStorageJwt, localStorageUser} from "../settings/auth";
import {ApiUserResponse} from "../types/apiType";

export const saveAuthToken = (token: string): void => {
  localStorage.setItem(localStorageJwt, token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(localStorageJwt);
};

export const resetAuthToken = (): void => {
  localStorage.removeItem(localStorageJwt)
}

export const saveAuthUser = (user: ApiUserResponse): void => {
  localStorage.setItem(localStorageUser, JSON.stringify(user));
}

export const getAuthUser = (): ApiUserResponse | null => {
  const userJson = localStorage.getItem(localStorageUser);
  return userJson ? JSON.parse(userJson) : null;
}

export const resetAuthUser = (): void => {
  localStorage.removeItem(localStorageUser)
}
