import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import { myinfoState } from '../states';
import { LoginResType } from '../types/user';

const Header = () => {
  const [me, setMe] = useState<LoginResType | null>(null);
  const myinfo = useRecoilValue<LoginResType | null>(myinfoState);
  const myinfoReset = useResetRecoilState(myinfoState);

  useEffect(() => {
    if (!myinfo) return;
    setMe(myinfo);
  }, [myinfo]);

  return (
      <CommonHeader>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        {me
          ? (
            <ButtonWrap>
              <p>{me.user.NAME}</p>
              <a onClick={myinfoReset}>logout</a>
            </ButtonWrap>
          )
          : (
            <Link href='/login' passHref>
              <a>login</a>
            </Link>
          )}
      </CommonHeader>
  );
};

export default Header;

const CommonHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const ButtonWrap = styled.div`
  text-align: right;
`;
