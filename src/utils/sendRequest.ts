const BASE_URL = 'https://norma.nomoreparties.space/api';

export const sendRequest = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  return await fetch(`${BASE_URL}${url}`, options).then((res: Response) => {
    if (res.ok) {
      return res.json() as Promise<T>;
    }

    return Promise.reject(new Error(`Ошибка ${res.status}`));
  });
};
