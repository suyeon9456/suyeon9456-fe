import React, { useEffect } from 'react';
import styled from 'styled-components';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import usePagination from '../hooks/usePagination';

const Pagination = ({ totalCount }: { totalCount: number }) => {
  const { page, pageNums, goPageNumber, goNextPageNums, goPrevPageNums } = usePagination(totalCount);
  return (
    <Container>
      <Button onClick={goPrevPageNums} disabled={Math.ceil(page / 5) === 1}>
        <VscChevronLeft />
      </Button>
      <PageWrapper>
        {!!pageNums && Array.from({ length: (pageNums.end - pageNums.start) + 1 }, (_, i) => i + pageNums.start).map((pageNum) => (
          <Page 
            key={pageNum}
            selected={pageNum === page}
            disabled={pageNum === page}
            onClick={() => goPageNumber(pageNum)}
          >
            {pageNum}
          </Page>
        ))}
      </PageWrapper>
      <Button onClick={goNextPageNums} disabled={page === Math.ceil(totalCount / 10)}>
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
