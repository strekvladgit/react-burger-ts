import { BASE_URL } from './constants';

import type { TErrorResponse } from './types';

export const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }

  return res.json().then(({ message }: TErrorResponse) => {
    throw new Error(message);
  });
};

export const sendRequest = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  return await fetch(`${BASE_URL}${url}`, options).then((res: Response) => {
    return checkResponse<T>(res);
  });
};
