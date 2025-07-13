import { AxiosError } from "axios";
import { useToastFactory, type ToastFactoryArgs } from "./useToastFactory";
import { notification } from "antd";

export default function useAxiosErrorHandler(
  { ...args }: ToastFactoryArgs = { message: "Erro!" }
) {
  const errorToast = useToastFactory({
    toastType: "error",
    ...args,
  });

  function axiosErrorDetailsMessage(error: AxiosError) {
    return error.message;
  }

  function showErrorMessage(
    error: AxiosError,
    errorDescription: string | undefined,
    duration: number
  ) {
    if (errorDescription) {
      errorToast({ message: "Erro!", description: errorDescription, duration });
      console.log("11111", error, errorDescription, duration);
      notification.open({
        placement: "topRight",
        ...args,
        message: "",
      });
      return;
    }
    if (error.response?.statusText) {
      console.log("2222", error, errorDescription, duration);

      errorToast({
        message: "Erro!",
        description: error.response.statusText,
        duration,
      });
      return;
    }
    if (error.message) {
      errorToast({ message: "Erro!", description: error.message, duration });
      console.log("2333", error, errorDescription, duration);

      return;
    }
    console.log("4444", error, errorDescription, duration);

    errorToast({
      message: "Erro!",
      description: "Erro desconhecido contate o administrador do sistema",
      duration,
    });
  }

  function onError(error: any, duration = 3) {
    if (error instanceof AxiosError) {
      const errorDescription = axiosErrorDetailsMessage(error);
      console.log(errorDescription);

      showErrorMessage(error, errorDescription, duration);
    }

    return error;
  }

  return { onError, axiosErrorDetailsMessage };
}
