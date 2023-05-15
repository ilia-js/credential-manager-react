export const showToast = (toast: any, type: string, message: string) => {
  if (toast.current) {
    (toast.current as any)?.show({
      severity: type,
      detail: message,
    });
  }
};
