import { CredentialPostItem} from "../../types/tableType";
import React from "react";
import {CredentialsTableColumns} from "../../settings/credentialsTable";

export const NameTemplate = (item: CredentialPostItem) => {
  return <div>{item[CredentialsTableColumns.Username]}</div>;
};
