import { CredentialItem } from "../../types/tableType";
import React from "react";

export const NameTemplate = (item: CredentialItem) => {
  return <div>{item.name}</div>;
};
