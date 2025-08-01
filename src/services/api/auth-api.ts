import { sendRequest } from '@/utils/sendRequest';
import { sendRequestWithNewToken } from '@/utils/sendRequestWithNewToken';

import type {
  TUserData,
  TAuthResponse,
  TUserResponse,
  TResetResponse,
  TResetRequestData,
  TResetData,
  TLogoutResponse,
} from '@/utils/types';

class AuthAPI {
  public async postRegister(data: TUserData): Promise<TAuthResponse> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    };
    return await sendRequest<TAuthResponse>('/auth/register', options);
  }

  public async postLogin(data: TUserData): Promise<TAuthResponse> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    };
    return await sendRequest<TAuthResponse>('/auth/login', options);
  }

  public async getUser(): Promise<TUserResponse> {
    const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    };
    return await sendRequestWithNewToken<TUserResponse>('/auth/user', options);
  }

  public async patchUser(data: TUserData): Promise<TUserResponse> {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(data),
    };
    return await sendRequestWithNewToken<TUserResponse>('/auth/user', options);
  }

  public async postResetRequest(
    email: TResetRequestData
  ): Promise<TResetResponse> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(email),
    };
    return await sendRequest<TResetResponse>('/password-reset', options);
  }

  public async postReset(data: TResetData): Promise<TResetResponse> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    };
    return await sendRequest<TResetResponse>('/password-reset/reset', options);
  }

  public async postLogout(): Promise<void> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken'),
      }),
    };
    await sendRequest<TLogoutResponse>('/auth/logout', options);
  }
}

export default new AuthAPI();
