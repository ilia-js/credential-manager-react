import { PasswordItem } from "../../types/tableType";
import React from "react";

export const NameTemplate = (item: PasswordItem) => {
  return <div>{item.name}</div>;
};
