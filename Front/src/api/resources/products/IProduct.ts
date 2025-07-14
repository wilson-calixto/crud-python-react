export interface INewProductForm {
  name: string;
  description: string;
  stock: number;
  price: number;
  is_active:boolean;
}

export interface IEditProductForm extends INewProductForm {
  id : number;
}


export interface Product {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  is_active?:boolean;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}