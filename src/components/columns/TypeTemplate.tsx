import React from "react";
import { CredentialItem } from "../../types/tableType";

export const TypeTemplate = (item: CredentialItem) => {
  return <div>{item.type}</div>;
};
