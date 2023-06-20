export interface CredentialItem {
  id: number | null;
  type: string;
  name: string;
  value: string;
}

export interface CredentialPostItem {
  id: number | null;
  type: string;
  username: string;
  password: string;
}
