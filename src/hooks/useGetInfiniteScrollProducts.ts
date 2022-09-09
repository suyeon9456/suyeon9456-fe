import {
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { getProducts } from '../fetchData';
import { Product, ProductsResType } from '../types/product';

type PropTypes = { 
  page: number;
  isNextGroup: boolean;
  setIsNextGroup: Dispatch<SetStateAction<boolean>>;
}

type ReturnTypes = [
  Product[],
  Dispatch<SetStateAction<Product[]>>,
  () => void
];

const useGetInfiniteScrollProducts = ({ page, isNextGroup, setIsNextGroup }: PropTypes): ReturnTypes => {
  const [products, setProducts] = useState<Product[]>([]);

  const onGetProducts = useCallback(async () => {
    if (!isNextGroup) return;
    const { products: data, totalCount }: ProductsResType = await getProducts({ page, size: 16 });
    if ([...products, ...data].length === totalCount) {
      setIsNextGroup(false);
    }
    setProducts((prev) => [...prev, ...data]);
  }, [isNextGroup, page, products]);

  return [products, setProducts, onGetProducts];
};

export default useGetInfiniteScrollProducts;
