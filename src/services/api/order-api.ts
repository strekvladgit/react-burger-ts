import type { TOrderResponse, TOrderData } from '@/utils/types';

class OrderAPI {
  baseAPI: string;

  constructor() {
    this.baseAPI = 'https://norma.nomoreparties.space/api/orders';
  }

  public postOrder = async (data: TOrderData): Promise<TOrderResponse> => {
    console.log(JSON.stringify(data));
    console.log(data);
    const response = await fetch(this.baseAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Http error status: ${response.status}`);
    }

    return (await response.json()) as Promise<TOrderResponse>;
  };
}

export default new OrderAPI();
