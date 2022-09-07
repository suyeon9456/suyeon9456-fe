export const idCheck = (id: string) => {
    const regExp = /^[a-zA-Z0-9]{5,30}$/g;
    if (regExp.test(id)) {
      return null;
    }
    return {
      status: !regExp.test(id),
      message: '올바른 아이디 형식으로 입력해주세요.',
    };
};

export const passwordCheck = (password: string) => {
    const regExp = /^[a-zA-Z0-9]{8,30}$/g;
 
    return {
      status: regExp.test(password),
      message: '올바른 아이디 형식으로 입력해주세요.',
    };
};

export const require = (value: string) => {
  return value ? { idCheck, passwordCheck } : false;
};
