import authApi from '@/services/api/auth-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { TAuthResponse, TUserData } from '@/utils/types';

export const signIn = createAsyncThunk(
  'user/signIn',
  async (data: TUserData) => {
    return authApi
      .postLogin(data)
      .then((res: TAuthResponse) => {
        const { accessToken, refreshToken } = res;
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('accessToken', accessToken.slice(7));
        return res;
      })
      .then(({ user }) => user);
  }
);

export const signOut = createAsyncThunk('user/signOut', async () => {
  await authApi.postLogout();
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');
});

export const signUp = createAsyncThunk(
  'user/signUp',
  async (data: TUserData) => {
    return authApi
      .postRegister(data)
      .then((res: TAuthResponse) => {
        const { accessToken, refreshToken } = res;
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('accessToken', accessToken.slice(7));
        return res;
      })
      .then(({ user }) => user);
  }
);

export const checkAuth = createAsyncThunk('user/getUser', async () => {
  if (localStorage.getItem('accessToken')) {
    return authApi.getUser().then(({ user }) => user);
  }

  return null;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TUserData) => {
    return authApi.patchUser(data).then(({ user }) => user);
  }
);
