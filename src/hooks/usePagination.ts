import { useRouter } from 'next/router';
import { useState, useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { pageState } from '../states';

const usePagination = (totalCount?: number) => {
  const router = useRouter();
  const queryPage = router.query.page;
  const [page, setPage] = useRecoilState<number>(pageState);

  useEffect(() => {
    if (!queryPage) return;
    setPage(parseInt(queryPage as string, 10));
  }, [queryPage]);

  const pageNums = useMemo(() => {
    if (!totalCount) return;
    const totalPage = Math.ceil(totalCount / 10);
    const pageGroup = Math.ceil(page / 5);
    const end = pageGroup * 5 > totalPage ? totalPage : pageGroup * 5;
    const start = (pageGroup * 5) - 4;
    return { start, end };
  }, [totalCount, page]);

  const goNextPageNums = () => {
    if (!pageNums) return;
    const start = pageNums.end + 1;
    goPageNumber(start);
  };

  const goPrevPageNums = () => {
    if (!pageNums) return;
    const end = pageNums.start - 1;
    goPageNumber(end);
  };

  const goPageNumber = (pageNum: number) => {
    router.push({
      pathname: router.pathname, 
      query: { ...router.query, page: pageNum },
    }, undefined, { shallow: true });
  };

  return {
    page,
    pageNums, 
    goPageNumber,
    goNextPageNums,
    goPrevPageNums,
  };
};

export default usePagination;
