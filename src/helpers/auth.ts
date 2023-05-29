import {localStorageBearerToken, localStorageUser} from "../settings/auth";
import {UserResponse} from "../types/apiType";

export const saveAuthToken = (token: string): void => {
  localStorage.setItem(localStorageBearerToken, token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(localStorageBearerToken);
};

export const resetAuthToken = (): void => {
  localStorage.removeItem(localStorageBearerToken)
}

export const saveAuthUser = (user: UserResponse): void => {
  localStorage.setItem(localStorageUser, JSON.stringify(user));
}

export const getAuthUser = (): UserResponse | null => {
  const userJson = localStorage.getItem(localStorageUser);
  return userJson ? JSON.parse(userJson) : null;
}

export const resetAuthUser = (): void => {
  localStorage.removeItem(localStorageUser)
}
