import { createAction } from '@reduxjs/toolkit';

import type { TIngredient } from '@/utils/types';

export const setCurrentIngredient = createAction(
  'currentIngredient/setCurrentIngredient',
  (ingredient: TIngredient) => {
    return {
      payload: {
        ...ingredient,
      },
    };
  }
);

export const clearCurrentIngredient = createAction(
  'currentIngredient/clearCurrentIngredient'
);
