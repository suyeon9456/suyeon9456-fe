import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { Product } from '../types/product';
import { LoginResType } from '../types/user';

const sessionStorage = typeof window !== `undefined` ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'user-info-storage',
  storage: sessionStorage
});

export const myinfoState = atom<LoginResType | null>({
  key: 'myinfo',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const pageState = atom<number>({
  key: 'productPage',
  default: 1,
});

export const infiniteScrollState = atom<{
  products: Product[],
  scrollY: number, 
}>({
  key: 'infiniteScroll',
  default: {
    products: [],
    scrollY: 0, 
  },
});

export const prevPageState = atom<string>({
  key: 'productprevPage',
  default: '',
});
