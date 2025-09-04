import { createSlice } from '@reduxjs/toolkit';

import { onFeedError, onFeedMessage } from './actions';

import type { TFeedState } from '@/utils/types';

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  selectors: {
    getFeedOrders: (state) => state.orders,
    getFeedTotal: (state) => state.total,
    getFeedTotalToday: (state) => state.totalToday,
    getFeedError: (state) => state.error,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(onFeedError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(onFeedMessage, (state, action) => {
        const { orders, total, totalToday } = action.payload;
        state.orders = orders;
        state.total = total;
        state.totalToday = totalToday;
      });
  },
});

export const { getFeedOrders, getFeedTotal, getFeedTotalToday, getFeedError } =
  feedSlice.selectors;
