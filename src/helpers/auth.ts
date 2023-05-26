import { localStorageBearerToken } from "../settings/auth";

export const saveAuthToken = (token: string): void => {
  localStorage.setItem(localStorageBearerToken, token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(localStorageBearerToken);
};
