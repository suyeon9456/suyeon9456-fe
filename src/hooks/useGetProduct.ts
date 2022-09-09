import {
  useCallback,
  useState,
  useEffect,
} from 'react';
import { getProduct } from '../fetchData';
import { ErrorType } from '../types/Error';
import { Product } from '../types/product';

type ReturnTypes = [
  Product | null
];

const useGetProduct = (id: string): ReturnTypes => {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<boolean>(false);

  const onGetProduct = useCallback(async () => {
    if (!id) return;
    const productResData: Product | ErrorType = await getProduct({ id: id as string });
    if (productResData === 404) {
      setError(true);
      return;
    }
    setProduct(productResData);
  }, [id]);

  useEffect(() => {
    onGetProduct();
  }, [id]);

  useEffect(() => {
    if (!error) return;
    throw new Error();
  }, [error]);

  return [product];
};

export default useGetProduct;
