import orderApi from '@/services/api/order-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { clearContructorIngredients } from '../constructor-ingredients/reducers';

import type { TOrderData } from '@/utils/types';

export const sendOrder = createAsyncThunk(
  'order/sendOrder',
  async (data: TOrderData, { dispatch }) => {
    return orderApi
      .postOrder(data)
      .then(({ order }) => {
        dispatch(clearContructorIngredients());
        return order.number;
      })
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }
);
