import React from "react";
import { Secret } from "../../types/table";

export const TypeTemplate = (item: Secret) => {
  return <div>{item.type}</div>;
};
