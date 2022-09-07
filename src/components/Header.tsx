import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { myinfoState } from '../states';

const Header = ({ children }: { children: React.ReactNode }) => {
  const me = useRecoilValue(myinfoState);

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
            <>
              <p>{me.user.NAME}</p>
              <p>logout</p>
            </>
          )
          : (
            <Link href='/login'>
              <p>login</p>
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
