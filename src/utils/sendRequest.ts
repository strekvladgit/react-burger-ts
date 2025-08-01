const BASE_URL = 'https://norma.nomoreparties.space/api';

export const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok
    ? res.json()
    : Promise.reject(new Error(`Ошибка ${res.status}`));
};

export const sendRequest = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  return await fetch(`${BASE_URL}${url}`, options).then((res: Response) => {
    return checkResponse<T>(res);
  });
};
