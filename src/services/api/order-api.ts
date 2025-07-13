import { sendRequest } from '@/utils/sendRequest';

import type { TOrderResponse, TOrderData } from '@/utils/types';

class OrderAPI {
  public postOrder = async (data: TOrderData): Promise<TOrderResponse> => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    };

    try {
      return await sendRequest<TOrderResponse>('/orders', options);
    } catch (error) {
      console.error('Failed to fetch ingredients:', error);
      throw error;
    }
  };
}

export default new OrderAPI();
