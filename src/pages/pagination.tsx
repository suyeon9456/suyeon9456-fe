import type { GetStaticProps, NextPage } from 'next';
import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import mockProduct from '../api/data/products.json';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { Product, ProductsResType } from '../types/product';
import { useRecoilValue } from 'recoil';
import { pageState } from '../states';
import { getProducts } from '../fetchData';

const PaginationPage: NextPage<{ productInfo: ProductsResType }> = ({ productInfo }: { productInfo: ProductsResType }) => {
  const page = useRecoilValue<number>(pageState);
  const [products, setProducts] = useState<Product[]>(productInfo?.products);
  const [totalCount, setTotalCount] = useState<number>(productInfo?.totalCount);

  const onLoadProducts = useCallback(async () => {
    if (!page) return;
    const productsResData: ProductsResType = await getProducts({ page, size: 10 });-
    setProducts(productsResData.products);
    setTotalCount(productsResData.totalCount);
  }, [page]);

  useEffect(() => {
    onLoadProducts();
  }, [page]);

  return (
    <>
      <Container>
        <ProductList products={products} />
        <Pagination totalCount={totalCount} />
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // const products = await getProducts({ page: 1, size: 10 });
  // const products = { products: mockProduct.slice(1, 10), totalCount: 105 };
  const products = { products: [], totalCount: 105 };
  return {
    props: {
      productInfo: products,
    },
    revalidate: 10,
  };
};

export default PaginationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
