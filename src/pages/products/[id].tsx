import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import products from '../../api/data/products.json';
import { getProduct } from '../../fetchData';
import { Product } from '../../types/product';
import { parsePrice } from '../../utilities';

const ProductDetailPage: NextPage<{ preproduct: Product }> = ({ preproduct }: { preproduct: Product }) => {
  const router = useRouter();
  const id = router.query.id
  const [product, setProduct] = useState<Product | null>(null);

  const onLoadProduct = useCallback(async () => {
    if (!id) return;
    const productResData: Product = await getProduct({ id: id as string });
    setProduct(productResData);
  }, [id]);

  useEffect(() => {
    onLoadProduct();
  }, [id]);

  return (
    <>
      <Thumbnail src={product?.thumbnail ? product.thumbnail : '/defaultThumbnail.jpg'} />
      <ProductInfoWrapper>
        <Name>{product?.name}</Name>
        <Price>{parsePrice(product?.price ?? 0)}원</Price>
      </ProductInfoWrapper>
    </>
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

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;
