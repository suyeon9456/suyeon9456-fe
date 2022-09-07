import type { NextPage } from 'next';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { myinfo } from '../states';
import { useRouter } from 'next/router';
import { postLogin } from '../fetchData';
import { LoginResType } from '../types/user';
import Input from '../components/Input';
import { LoginValidation } from '../types/constant';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [me, setMe] = useRecoilState<LoginResType | null>(myinfo);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data: LoginResType = await postLogin({ id, password });
      setMe(data);
      router.push('/');
  }, [id, password, router, setMe]);

  return (
    <Form onSubmit={onLogin}>
      <Input title="아이디" setValue={setId} validate={LoginValidation.id} />
      <Input title="비밀번호" setValue={setPassword} validate={LoginValidation.pw} />
      <LoginButton type="submit">로그인</LoginButton>
    </Form>
  );
};

export default LoginPage;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  cursor: pointer;

  &:disabled {
    background-color: #e2e2ea;
  }
`;
