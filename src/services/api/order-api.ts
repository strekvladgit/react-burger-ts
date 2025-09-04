import { sendRequest } from '@/utils/sendRequest';
import { sendRequestWithNewToken } from '@/utils/sendRequestWithNewToken';

import type {
  TOrderResponse,
  TOrderData,
  TOrdersResponse,
} from '@/utils/types';

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

  public getOrder(number: number): Promise<TOrdersResponse> {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
    return sendRequest<TOrdersResponse>(`/orders/${number}`, options);
  }
}

export default new OrderAPI();
