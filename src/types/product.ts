export type Product = {
  id: string;
  name: string;
  thumbnail: string | null;
  price: number;
}

export interface ProductsReqType {
  page: number;
  size: number;
}
export interface ProductsResType {
  products: Product[];
  totalCount: number;
}

