import Link from 'next/link';
import React, { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { myinfo } from '../states';
import { LoginResType } from '../types/user';

const Header = ({ children }: { children: React.ReactNode }) => {
  const [me, setMe] = useRecoilState<LoginResType | null>(myinfo);

  const onLogout = useCallback(() => setMe(null), [setMe]);

  useEffect(() => {
    console.log('me', me);
  }, [me])
  return (
    <>
      <CommonHeader>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        {me
          ? (
            <ButtonWrap>
              <p>{me.user.NAME}</p>
              <a onClick={onLogout}>logout</a>
            </ButtonWrap>
          )
          : (
            <Link href='/login' passHref>
              <a>login</a>
            </Link>
          )}
      </CommonHeader>
      {children}
    </>
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
