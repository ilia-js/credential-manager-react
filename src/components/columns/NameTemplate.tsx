import { Secret } from "../../types/table";
import React from "react";

export const NameTemplate = (item: Secret) => {
  return <div>{item.name}</div>;
};
