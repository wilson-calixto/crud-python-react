import type { AxiosRequestConfig } from "axios";
import { appAxios } from "../../axios";
import type { INewOrderForm } from "./IProduct";

export const URL = {
  getRequestOrdersData: () => `api/products`,
  createProduct: () => `api/products/create`,
};

 

export const getRequestOrdersData = (
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const { signal, abort } = new AbortController();
  const response = appAxios
    .get<[]>(URL.getRequestOrdersData(), {
      signal,
      ...axiosRequestConfig,
    })
    .then((response) => response.data);
  return {
    response,
    abort,
  };
};

export const createProduct = (
  newOrder: INewOrderForm,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const { signal, abort } = new AbortController();

  const response = appAxios
    .post<INewOrderForm>(URL.createProduct(), newOrder, {
      signal: axiosRequestConfig?.signal || signal,
      ...axiosRequestConfig,
    })
    .then((response) => response.data);

  return {
    response,
    abort,
  };
};
