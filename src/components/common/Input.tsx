import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import styled, { css } from 'styled-components';
import useInput from '../../hooks/useInput';
import { idCheck } from '../../utilities/validator';

interface InputProps {
  title: string;
  setValue: Dispatch<SetStateAction<string>>;
  validate?: (value: string) => { status: boolean; message: string; } | null;
};

const Input = ({ title, setValue, validate }: InputProps) => {
  const [value, onChangeValue] = useInput('');
  const [error, setError] = useState<{
    status: boolean;
    message: string;
  } | null>(null);

  const onBlur = useCallback(() => {
    if (!validate) {
      setValue(value);
      return;
    }
    const result = validate(value);
    if (result) {
      setError(result);
      return;
    }
    setValue(value);
  }, [setValue, validate, value]);

  return (
    <InputWrap>
      <Label>{title}</Label>
      <TextInput
        type='text'
        value={value}
        onChange={onChangeValue}
        onBlur={onBlur}
        error={error}
      />
      {error?.status && <ErrorMessage>{error?.message}</ErrorMessage>}
    </InputWrap>
  );
};

export default Input;

const InputWrap = styled.div`
  & + & {
    margin-top: 16px;
  }
`;

const Label = styled.label`
  font-weight: 700;
  font-size: 13px;
  color: #6C6C7D;
`;

const TextInput = styled.input<{ error: {
  status: boolean;
  message: string;
} | null }>`
  margin-top: 8px;
  background: #F7F7FA;
  border-radius: 12px;
  padding: 16px;
  width: 100%;
  ${({ error }) => error && css`
    background: #FDEDEE;
  `}
`;

const ErrorMessage = styled.div`
  margin-top: 8px;
  font-weight: 400;
  font-size: 13px;
  color: #ED4E5C;
`;
