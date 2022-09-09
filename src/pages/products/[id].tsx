import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import Product from '../../components/Product';

import { Product as ProductType } from '../../types/product';

const ProductDetailPage: NextPage<{ preproduct: ProductType }> = ({ preproduct }: { preproduct: ProductType }) => {
  return (
    <ErrorBoundary>
      <Product />
    </ErrorBoundary>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.query.id;
  // const product = await getProduct({ id });
  const product = {};
  return {
    props: {
      preproduct: product,
    },
  };
};

export default ProductDetailPage;
