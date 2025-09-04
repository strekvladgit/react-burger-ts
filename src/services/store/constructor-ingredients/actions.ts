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

export const deleteIngredient = createAction<
  string,
  'constructorIngredients/deleteIngredient'
>('constructorIngredients/deleteIngredient');

export const moveIngredient = createAction(
  'constructorIngredients/moveIngredient',
  (dragIndex: number, hoverIndex: number) => {
    return {
      payload: {
        dragIndex,
        hoverIndex,
      },
    };
  }
);
