import { createSlice } from '@reduxjs/toolkit';

import { onProfileFeedError, onProfileFeedMessage } from './actions';

import type { TFeedState } from '@/utils/types';

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
};

export const profileFeedSlice = createSlice({
  name: 'profileFeed',
  initialState,
  selectors: {
    getProfileFeedOrders: (state) => state.orders,
    getProfileFeedTotal: (state) => state.total,
    getProfileFeedTotalToday: (state) => state.totalToday,
    getProfileFeedError: (state) => state.error,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(onProfileFeedError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(onProfileFeedMessage, (state, action) => {
        const { orders, total, totalToday } = action.payload;
        state.orders = orders;
        state.total = total;
        state.totalToday = totalToday;
      });
  },
});

export const {
  getProfileFeedError,
  getProfileFeedOrders,
  getProfileFeedTotal,
  getProfileFeedTotalToday,
} = profileFeedSlice.selectors;
