import React from "react";
import { Secret } from "../../types/table";

const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    //showToast({});
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

export const PassTemplate = (item: Secret) => {
  return (
    <div>
      *****
      <i
        className="pi pi-copy"
        style={{ marginLeft: "10px", cursor: "pointer" }}
        onClick={() => copyToClipboard(item.value)}
      />
    </div>
  );
};
