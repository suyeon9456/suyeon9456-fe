import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { LoginResType } from '../types/user';

const sessionStorage = typeof window !== `undefined` ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'user-info-storage',
  storage: sessionStorage
});

export const myinfo = atom<LoginResType | null>({
  key: 'myinfo',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const myinfoState = selector({
  key: 'myinfoState',
  get: ({ get }) => {
    const info = get(myinfo);
    return info;
  },
});
