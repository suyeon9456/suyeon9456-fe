import {
  useCallback,
  useState,
  useEffect,
} from 'react';
import { useRecoilValue } from 'recoil';
import { getProducts } from '../fetchData';
import { pageState } from '../states';
import { Product, ProductsResType } from '../types/product';

type PropTypes = ProductsResType;

type ReturnTypes = [
  Product[],
  number
];

const useGetPaginationProducts = (productInfo: PropTypes): ReturnTypes => {
  const page = useRecoilValue<number>(pageState);
  const [products, setProducts] = useState<Product[]>(productInfo?.products || []);
  const [totalCount, setTotalCount] = useState<number>(productInfo?.totalCount);

  const onGetProducts = useCallback(async () => {
    if (!page) return;
    const productsResData: ProductsResType = await getProducts({ page, size: 10 });-
    setProducts(productsResData.products);
    setTotalCount(productsResData.totalCount);
  }, [page]);

  useEffect(() => {
    onGetProducts();
  }, [page]);

  return [products, totalCount];
};

export default useGetPaginationProducts;
