import { createAction, nanoid } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

export const addIngredient = createAction(
  'constructorIngredients/addIngredient',
  (ingredient: TIngredient) => {
    return {
      payload: {
        ...ingredient,
        _key: nanoid(),
      },
    };
  }
);

export const deleteIngredient = createAction(
  'constructorIngredients/deleteIngredient',
  (key: string) => {
    return {
      payload: key,
    };
  }
);

export const countTotalPrice = createAction(
  'constructorIngredients/setTotalPrice'
);
