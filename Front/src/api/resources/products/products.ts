import type { AxiosRequestConfig } from "axios";
import { appAxios } from "../../axios";
import type { INewOrderForm, PaginatedResponse, Product } from "./IProduct";

export const URL = {
  getProductsData: () => `api/products`,
  createProduct: () => `api/products/create`,
};

 

export const getProductsData = (
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const { signal, abort } = new AbortController();
  const response = appAxios
    .get<PaginatedResponse<Product>>(URL.getProductsData(), {
      signal,
      ...axiosRequestConfig,
    })
    .then((response) => response.data.results);
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
