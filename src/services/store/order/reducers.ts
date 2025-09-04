import { createSlice } from '@reduxjs/toolkit';

import { getOrder, sendOrder } from './actions';

import type { TOrderInfo } from '@/utils/types';

type TOrderState = {
  loading: boolean;
  error: string | null;
  orderNumber: number | null;
  currentOrder: null | TOrderInfo;
};

const initialState: TOrderState = {
  loading: false,
  error: null,
  orderNumber: null,
  currentOrder: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrderNum: (state) => state.orderNumber,
    getOrderLoading: (state) => state.loading,
    getCurrentOrder: (state) => state.currentOrder,
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
      })
      .addCase(getOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentOrder = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentOrder = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? 'Unknown Error';
        state.currentOrder = null;
      });
  },
});

export const { getOrderNum, getOrderLoading, getCurrentOrder } =
  orderSlice.selectors;
