import type { NextPage } from 'next';
import React, { useState, useCallback, useEffect } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import ErrorBoundary from '../components/common/ErrorBoundary';

import ProductList from '../components/ProductList';
import useGetInfiniteScrollProducts from '../hooks/useGetInfiniteScrollProducts';
import useIntersectionObserver from '../hooks/useIntersectionObserver ';
import { infiniteScrollState } from '../states';

const InfiniteScrollPage: NextPage = () => {
  const scrollInfo = useRecoilValue(infiniteScrollState);
  const ScrollReset = useResetRecoilState(infiniteScrollState);
  const [page, setPage] = useState(1);
  
  const onIntersect: IntersectionObserverCallback = (entries) => {
    const first = entries[0];
    if (first.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  const { setTarget, isNextGroup, setIsNextGroup } = useIntersectionObserver({ onIntersect });


  const [products, setProducts, onLoadProducts] = useGetInfiniteScrollProducts({ page, isNextGroup, setIsNextGroup });

  const onScrollTo = useCallback(() => {
    const { scrollY } = scrollInfo;
    window.scrollTo({ left: 0, top: scrollY });
  }, [scrollInfo]);

  useEffect(() => {
    const { products } = scrollInfo;
    if (products.length <= 0) {
      onLoadProducts();
    } else {
      setProducts(products);
    }
  }, [page, scrollInfo])

  useEffect(() => {
    if (scrollInfo.scrollY === 0) return;
    onScrollTo();
    ScrollReset();
  }, [products, scrollInfo]);



  return (
    <Container>
      <ProductList
        products={products}
        setTarget={setTarget}
      />
    </Container>
  );
};

export default InfiniteScrollPage;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;
