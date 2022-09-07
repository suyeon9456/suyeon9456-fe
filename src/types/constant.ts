import { idCheck, passwordCheck } from "../utilities/validator";

export const LoginValidation = {
  id: idCheck,
  pw: passwordCheck,
} as const;