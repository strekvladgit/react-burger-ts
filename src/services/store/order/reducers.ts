import { createSlice } from '@reduxjs/toolkit';

import { sendOrder } from './actions';

type TOrderState = {
  loading: boolean;
  error: string | null;
  orderNumber: number | null;
};

const initialState: TOrderState = {
  loading: false,
  error: null,
  orderNumber: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrderNum: (state) => state.orderNumber,
    getOrderLoading: (state) => state.loading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderNumber = null;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orderNumber = action.payload;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? 'Unknown Error';
        state.orderNumber = null;
      });
  },
});

export const { getOrderNum, getOrderLoading } = orderSlice.selectors;
