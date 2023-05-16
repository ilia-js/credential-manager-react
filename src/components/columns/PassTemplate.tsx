import React from "react";
import { PasswordItem } from "../../types/tableType";
import { showToast } from "../../helpers/toast";
import { ToastType } from "../../types/toastType";
import { lang } from "../../lang";

const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
    showToast(ToastType.info, lang.message.passwordCopiedToClipboard);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

export const PassTemplate = (item: PasswordItem) => {
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
