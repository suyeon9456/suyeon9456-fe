import React from 'react';
import styled from 'styled-components';

const Error = ({ message }: { message: string; }) => {
  return (
    <Container>
      <div>{message}</div>  
    </Container>
  );
};

export default Error;

const Container = styled.section`
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px 40px;
`;

