import axios, { AxiosError, AxiosResponse } from 'axios';
import { ProductReqType, ProductsReqType } from '../types/product';
import { LoginReqType, LoginResType } from '../types/user';

axios.defaults.headers.common['Content-Type'] = 'application/json';

export const postLogin = async (data: LoginReqType) => {
  try {
    const res: AxiosResponse = await axios.post('/login', data);
    return res.data.data;
  } catch (error) {
    const { response } = error as unknown as AxiosError;

    if (response) {
      throw { status: response.status, data: response.data };
    }

    throw error;
  }
}

export const getProducts = async ({ page, size }: ProductsReqType) => {
  try {
    const res: AxiosResponse = await axios.get(`/products?page=${page}&size=${size}`);
    return res.data.data;
  } catch (error) {
    const { response } = error as unknown as AxiosError;

    if (response) {
      throw { status: response.status, data: response.data };
    }

    throw error;
  }
};

export const getProduct = async ({ id }: ProductReqType) => {
  try {
    const res: AxiosResponse = await axios.get(`/products/${id}`);
    return res.data.data.product;
  } catch (error) {
    const { response } = error as unknown as AxiosError;

    if (response) {
      return response.status;
    }

    throw error;
  }
};