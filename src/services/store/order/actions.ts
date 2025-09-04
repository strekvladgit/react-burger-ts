import orderApi from '@/services/api/order-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { clearContructorIngredients } from '../constructor-ingredients/reducers';

import type { TOrderData, TOrderInfo } from '@/utils/types';

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

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async (number: number): Promise<TOrderInfo> => {
    return orderApi
      .getOrder(number)
      .then(({ orders }) => {
        return orders[0];
      })
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }
);
