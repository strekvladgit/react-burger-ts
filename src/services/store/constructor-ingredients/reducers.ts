import { mockIngredients } from '@/utils/ingredients';
import { createSlice } from '@reduxjs/toolkit';

import { addIngredient, deleteIngredient, countTotalPrice } from './actions';

import type { TConstructorIngredients } from '@/utils/types';

type TConstructorState = {
  bun: TConstructorIngredients | null;
  otherIngredients: TConstructorIngredients[];
  totalPrice: number;
};

const initialState: TConstructorState = {
  bun: mockIngredients.find((ingredient) => ingredient.type === 'bun') ?? null,
  otherIngredients: mockIngredients.filter(
    (ingredient) => ingredient.type !== 'bun'
  ),
  totalPrice: 0,
};

export const constructorSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  selectors: {
    getConstructorIngredients: (state) => [
      state.bun,
      ...state.otherIngredients,
    ],
    getConstructorBuns: (state) => state.bun,
    getConstructorOthers: (state) => state.otherIngredients,
    getTotalPrice: (state) => state.totalPrice,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addIngredient, (state, action) => {
        const type = action.payload.type;
        if (type === 'bun') {
          state.bun = action.payload;
        } else {
          state.otherIngredients.push(action.payload);
        }
      })
      .addCase(deleteIngredient, (state, action) => {
        state.otherIngredients = state.otherIngredients.filter(
          (ingredient) => ingredient._key !== action.payload
        );
      })
      .addCase(countTotalPrice, (state) => {
        const bunPrice = state.bun ? state.bun.price : 0;
        const otherIngredientsPrice = state.otherIngredients.reduce(
          (total, ingredient) => total + ingredient.price,
          0
        );
        state.totalPrice = bunPrice + otherIngredientsPrice;
      });
  },
});

export const {
  getConstructorIngredients,
  getConstructorBuns,
  getConstructorOthers,
  getTotalPrice,
} = constructorSlice.selectors;
