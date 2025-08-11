import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { constructorSlice } from './constructor-ingredients/reducers';
import { currentIngredientSlice } from './current-ingredient/reducers';
import { ingredientsSlice } from './ingredients/reducers';
import { orderSlice } from './order/reducers';
import { userSlice } from './user/reducers';

const rootReducer = combineSlices(
  ingredientsSlice,
  currentIngredientSlice,
  constructorSlice,
  orderSlice,
  userSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
