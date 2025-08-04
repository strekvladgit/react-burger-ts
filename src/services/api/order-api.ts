import { sendRequestWithNewToken } from '@/utils/sendRequestWithNewToken';

import type { TOrderResponse, TOrderData } from '@/utils/types';

class OrderAPI {
  public postOrder = async (data: TOrderData): Promise<TOrderResponse> => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(data),
    };
    return await sendRequestWithNewToken<TOrderResponse>('/orders', options);
  };
}

export default new OrderAPI();
