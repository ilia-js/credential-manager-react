import {showToast} from "./toast";
import {ToastType} from "../types/toastType";
import {lang} from "../lang";

export const copyToClipboard = async (text: string): Promise<void> => {
    try {
        await navigator.clipboard.writeText(text);
        showToast(ToastType.Info, lang.message.passwordCopiedToClipboard);
        console.log("Copied");
    } catch (err) {
        console.error("Failed to copy: ", err);
    }
};