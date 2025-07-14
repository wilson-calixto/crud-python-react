import type { AxiosRequestConfig } from "axios";
import { appAxios } from "../../axios";
import type { INewProductForm, PaginatedResponse, Product } from "./IProduct";

export const URL = {
  getProductsData: () => `api/products`,
  createProduct: () => `api/products/create`,
  editProduct: (id:number) => `api/products/update/${id}/`,
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
  NewProduct: INewProductForm,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const { signal, abort } = new AbortController();

  const response = appAxios
    .post<INewProductForm>(URL.createProduct(), NewProduct, {
      signal: axiosRequestConfig?.signal || signal,
      ...axiosRequestConfig,
    })
    .then((response) => response.data);

  return {
    response,
    abort,
  };
};


export const editProduct = (
  id:number,
  NewProduct: INewProductForm,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const { signal, abort } = new AbortController();

  const response = appAxios
    .put<INewProductForm>(URL.editProduct(id), NewProduct, {
      signal: axiosRequestConfig?.signal || signal,
      ...axiosRequestConfig,
    })
    .then((response) => response.data);

  return {
    response,
    abort,
  };
};
