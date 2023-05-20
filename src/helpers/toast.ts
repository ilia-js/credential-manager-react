import { ExtendedDocument } from "../types/documentType";

export const showToast = (type: string, message: string) => {
  const toast = (document as ExtendedDocument).$toast;
  if (toast.current) {
    (toast.current as any)?.show({
      severity: type,
      detail: message,
    });
  }
};

export const setGlobalToastObject = (toast: any): void => {
  (document as ExtendedDocument).$toast = toast;
};
