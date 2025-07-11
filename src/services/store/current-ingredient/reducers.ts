import { createSlice } from '@reduxjs/toolkit';

import { clearCurrentIngredient, setCurrentIngredient } from './actions';

import type { TIngredient } from '@/utils/types';

type TCurrentIngredientState = {
  currentIngredient: TIngredient | null;
};

const initialState: TCurrentIngredientState = {
  currentIngredient: null,
};

export const currentIngredientSlice = createSlice({
  name: 'currentIngredient',
  initialState,
  reducers: {},
  selectors: {
    getCurrentIngredient: (state) => state.currentIngredient,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCurrentIngredient, (state, action) => {
        state.currentIngredient = action.payload;
      })
      .addCase(clearCurrentIngredient, (state) => {
        state.currentIngredient = null;
      });
  },
});

export const { getCurrentIngredient } = currentIngredientSlice.selectors;
