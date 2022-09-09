import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import useGetProduct from '../hooks/useGetProduct';
import { parsePrice } from '../utilities';

const Product = () => {
  const router = useRouter();
  const id = router.query.id
  const [product] = useGetProduct(id as string);

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

export default Product;

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