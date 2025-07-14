export interface INewProductForm {
  name: string;
  description: string;
  stock: number;
  price: number;
  is_active:boolean;
}

export interface IProduct extends INewProductForm {
  id : number|undefined;
}


 

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}