import { idCheck, passwordCheck } from "../utilities/validator";

export const LoginValidation = {
  id: idCheck,
  pw: passwordCheck,
} as const;

/* Error 관련 상수  */
export const ErrorMessage = {
  404: '존재하지 않는 페이지입니다.',
} as const;