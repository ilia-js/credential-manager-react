import React from "react";
import { PasswordItem } from "../../types/tableType";

export const TypeTemplate = (item: PasswordItem) => {
  return <div>{item.type}</div>;
};
