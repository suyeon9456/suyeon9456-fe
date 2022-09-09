import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

import { Product } from '../types/product';
import { parsePrice } from '../utilities';

type ProductItemProps = {
  product: Product;
  setTarget?: Dispatch<SetStateAction<HTMLElement | null | undefined>>;
  onRoute?: () => void;
};

const ProductItem = ({ product: { id, name, thumbnail, price }, setTarget, onRoute }: ProductItemProps) => (
  <Container ref={setTarget} onClick={onRoute}>
    <Thumbnail src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'} />
    <Name>{name}</Name>
    <Price>{parsePrice(price)}</Price>
  </Container>
);

export default ProductItem;

const Container = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;
