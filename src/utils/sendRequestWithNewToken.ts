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

  return await sendRequest<TRefreshTokenResponse>('/auth/token', options);
};

export const sendRequestWithNewToken = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (error) {
    if (error == 'jwt expired') {
      const refreshData = await refreshToken();

      const newOptions: RequestInit = {
        ...options,
        headers: {
          ...options?.headers,
          Authorization: refreshData.accessToken,
        },
      };
      const res = await fetch(url, newOptions);
      return await checkResponse<T>(res);
    } else {
      throw new Error(error as string);
    }
  }
};
