import orderApi from '@/services/api/order-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { TOrderData } from '@/utils/types';

export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  async (data: TOrderData) => {
    return orderApi
      .postOrder(data)
      .then(({ order }) => order.number)
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }
);
