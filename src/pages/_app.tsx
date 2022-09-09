import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import styled from 'styled-components';

import setupMSW from '../api/setup';
import ErrorBoundary from '../components/common/ErrorBoundary';
import Header from '../components/common/Header';
import GlobalStyle from '../styles/GlobalStyle';

setupMSW();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Background />
      <Content>
        <RecoilRoot>
          <Header/>
          {/* <ErrorBoundary> */}
            <Component {...pageProps} />
          {/* </ErrorBoundary> */}
        </RecoilRoot>
      </Content>
    </>
  );
}

export default MyApp;

const Background = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #f0f0f5;
`;

const Content = styled.div`
  width: 420px;
  min-height: 100%;
  margin: 0 auto;
  background-color: #fff;
`;
