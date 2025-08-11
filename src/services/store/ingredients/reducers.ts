import { createSelector, createSlice } from '@reduxjs/toolkit';

import { loadIngredients } from './actions';

import type { TIngredient } from '@/utils/types';

export type TIngredioentsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: TIngredioentsState = {
  ingredients: [],
  loading: false,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    getBuns: createSelector(
      (state: TIngredioentsState): TIngredient[] =>
        ingredientsSlice.getSelectors().getIngredients(state),
      (ingredients: TIngredient[]): TIngredient[] =>
        ingredients.filter((ingredient) => ingredient.type === 'bun')
    ),
    getMainIngredients: createSelector(
      (state: TIngredioentsState): TIngredient[] =>
        ingredientsSlice.getSelectors().getIngredients(state),
      (ingredients: TIngredient[]): TIngredient[] =>
        ingredients.filter((ingredient) => ingredient.type === 'main')
    ),
    getSauces: createSelector(
      (state: TIngredioentsState): TIngredient[] =>
        ingredientsSlice.getSelectors().getIngredients(state),
      (ingredients: TIngredient[]): TIngredient[] =>
        ingredients.filter((ingredient) => ingredient.type === 'sauce')
    ),
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message ?? 'Unknown Error';
      });
  },
});

export const { getIngredients, getBuns, getMainIngredients, getSauces } =
  ingredientsSlice.selectors;
