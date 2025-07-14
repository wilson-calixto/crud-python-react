export interface INewOrderForm {
  name: string;
  description: string;
  stock: number;
  price: number;
  is_active:boolean;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}