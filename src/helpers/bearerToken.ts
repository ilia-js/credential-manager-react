import { localStorageBearerToken } from "../settings/auth";

export const saveBearerToken = (token: string): void => {
  localStorage.setItem(localStorageBearerToken, token);
};

export const getBearerToken = (): string | null => {
  return localStorage.getItem(localStorageBearerToken);
};
