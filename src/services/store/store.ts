import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { constructorSlice } from './constructor-ingredients/reducers';
import { currentIngredientSlice } from './current-ingredient/reducers';
import { ingredientsSlice } from './ingredients/reducers';
import { orderSlice } from './order/reducers';

const rootReducer = combineSlices(
  ingredientsSlice,
  currentIngredientSlice,
  constructorSlice,
  orderSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
