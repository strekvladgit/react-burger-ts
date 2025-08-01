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
    return await sendRequest<TOrderResponse>('/orders', options);
  };
}

export default new OrderAPI();
