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
