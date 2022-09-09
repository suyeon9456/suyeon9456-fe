import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { infiniteScrollState, prevPageState } from '../states';

import { Product } from '../types/product';
import ProductItem from './ProductItem';

type ProductListProps = {
  products: Product[];
  setTarget?: Dispatch<SetStateAction<HTMLElement | null | undefined>>;
  // onRouteCallback?: () => void;
};

const ProductList = ({ products, setTarget }: ProductListProps) => {
  const router = useRouter();
  const [scrollInfo, setScrollInfo] = useRecoilState(infiniteScrollState);
  const [prevPage, setPrevPage] = useRecoilState(prevPageState);
  const onRouteCallback = (id: string) => {
    setScrollInfo({ products, scrollY: window.scrollY });
    setPrevPage(`/products/${id}`);
    router.push(`/products/${id}`);
  }

  return (
    <Container>
      {products?.map((product) => {
        return onRouteCallback ? (
          <ProductItem
            key={product.id}
            product={product}
            setTarget={setTarget}
            onRoute={() => onRouteCallback(product.id)}
          />
        ) : (
          <Link href={`/products/${product.id}`} passHref>
            <ProductItem key={product.id} product={product} setTarget={setTarget} />
          </Link>
        );
      })}
    </Container>
  );
};

export default ProductList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;
