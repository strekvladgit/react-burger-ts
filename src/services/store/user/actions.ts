import authApi from '@/services/api/auth-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { TAuthResponse, TUserData } from '@/utils/types';

export const login = createAsyncThunk('user/login', async (data: TUserData) => {
  return authApi.postLogin(data).then(({ user }) => user);
});

export const logout = createAsyncThunk(
  'user/logout',
  async (data: TUserData) => {
    await authApi.postLogin(data);
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (data: TUserData) => {
    return authApi
      .postRegister(data)
      .then((res: TAuthResponse) => {
        const { accessToken, refreshToken } = res;
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('accessToken', accessToken);
        return res;
      })
      .then(({ user }) => user);
  }
);
