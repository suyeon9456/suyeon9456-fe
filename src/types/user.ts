export interface LoginReqType {
  id: string;
  password: string;
}

export interface LoginResType {
  accessToken: string;
  user: {
    id: string;
    NAME: string;
  };
}
