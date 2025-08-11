import { BASE_URL } from './constants';
import { checkResponse, sendRequest } from './sendRequest';

import type { TRefreshTokenResponse } from './types';

const refreshToken = async (): Promise<TRefreshTokenResponse> => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  };

  return await sendRequest<TRefreshTokenResponse>(`/auth/token`, options);
};

export const sendRequestWithNewToken = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const res = await fetch(`${BASE_URL}${url}`, options);
    return await checkResponse(res);
  } catch (error) {
    if (error instanceof Error && error.message == 'jwt expired') {
      await refreshToken().then(({ accessToken, refreshToken }) => {
        localStorage.setItem('accessToken', accessToken.slice(7));
        localStorage.setItem('refreshToken', refreshToken);
      });

      const newOptions: RequestInit = {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      };
      const res = await fetch(`${BASE_URL}${url}`, newOptions);
      return await checkResponse<T>(res);
    } else {
      throw error;
    }
  }
};
