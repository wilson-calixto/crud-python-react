import type { AxiosRequestConfig } from "axios";
import { appAxios } from "../../axios";
import type { IProduct, INewProductForm, PaginatedResponse } from "./IProduct";

export const URL = {
  getProductsData: () => `api/products`,
  createProduct: () => `api/products/create`,
  editProduct: (id:number) => `api/products/update/${id}/`,
  deleteProduct: (id:number) => `api/products/delete/${id}/`,
};

 

export const getProductsData = (
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const { signal, abort } = new AbortController();
  const response = appAxios
    .get<PaginatedResponse<IProduct>>(URL.getProductsData(), {
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
  NewProduct: IProduct,
  axiosRequestConfig?: AxiosRequestConfig
) => {
  const { signal, abort } = new AbortController();

  const response = appAxios
    .put<IProduct>(URL.editProduct(NewProduct.id), NewProduct, {
      signal: axiosRequestConfig?.signal || signal,
      ...axiosRequestConfig,
    })
    .then((response) => response.data);

  return {
    response,
    abort,
  };
};



export const deleteProduct = (
  id: number,
  axiosRequestConfig?: AxiosRequestConfig
) => {
   const { signal, abort } = new AbortController();

  const response = appAxios
    .delete(URL.deleteProduct(id),  {
      signal: axiosRequestConfig?.signal || signal,
      ...axiosRequestConfig,
    })
    .then((response) => response.data);

  return {
    response,
    abort,
  };
};