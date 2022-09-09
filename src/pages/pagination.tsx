import type { GetStaticProps, NextPage } from 'next';
import React from 'react';
import styled from 'styled-components';

import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import { ProductsResType } from '../types/product';
import useGetPaginationProducts from '../hooks/useGetPaginationProducts';

const PaginationPage: NextPage<{ productInfo: ProductsResType }> = ({ productInfo }: { productInfo: ProductsResType }) => {
  const [products, totalCount] = useGetPaginationProducts(productInfo);

  return (
    <Container>
      <ProductList products={products} />
      <Pagination totalCount={totalCount} />
    </Container>
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

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
