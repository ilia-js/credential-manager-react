import React from "react";
import { CredentialPostItem} from "../../types/tableType";
import {CredentialsTableColumns} from "../../settings/credentialsTable";

export const TypeTemplate = (item: CredentialPostItem) => {
  return <div>{item[CredentialsTableColumns.Type]}</div>;
};
