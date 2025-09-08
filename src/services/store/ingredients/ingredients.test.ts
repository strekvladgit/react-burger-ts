import { describe, expect, it } from 'vitest';

import { ingredientsSlice, initialState } from './reducers';

const mockStateWithIngredients = {
  ingredients: {
    ...initialState,
    ingredients: [
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'bun',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: 'string',
        image_large: 'string',
        image_mobile: 'string',
        __v: 0,
      },
      {
        _id: '2',
        name: 'Ingredient 2',
        type: 'main',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 200,
        image: 'string',
        image_large: 'string',
        image_mobile: 'string',
        __v: 0,
      },
      {
        _id: '3',
        name: 'Ingredient 3',
        type: 'sauce',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 50,
        image: 'string',
        image_large: 'string',
        image_mobile: 'string',
        __v: 0,
      },
    ],
  },
};

describe('ingredients слайс', () => {
  it('должен возвращать начальное состояние при неизвестном action', () => {
    expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('должен обрабатывать loadIngredients.pending', () => {
    expect(
      ingredientsSlice.reducer(undefined, {
        type: 'ingredients/loadIngredients/pending',
      })
    ).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it('должен обрабатывать loadIngredients.fulfilled', () => {
    const ingredients = [
      { _id: '1', name: 'Ingredient 1', type: 'bun', price: 100 },
      { _id: '2', name: 'Ingredient 2', type: 'main', price: 200 },
      { _id: '3', name: 'Ingredient 3', type: 'sauce', price: 50 },
    ];
    expect(
      ingredientsSlice.reducer(undefined, {
        type: 'ingredients/loadIngredients/fulfilled',
        payload: ingredients,
      })
    ).toEqual({
      ...initialState,
      ingredients,
    });
  });

  it('должен обрабатывать loadIngredients.rejected', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';
    expect(
      ingredientsSlice.reducer(undefined, {
        type: 'ingredients/loadIngredients/rejected',
        error: { message: errorMessage },
      })
    ).toEqual({
      ...initialState,
      loading: false,
      error: errorMessage,
    });
  });

  it('селектор getBuns должен возвращать только булки', () => {
    expect(
      ingredientsSlice.selectors.getBuns(mockStateWithIngredients)
    ).toEqual([
      {
        _id: '1',
        name: 'Ingredient 1',
        type: 'bun',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 0,
        image: 'string',
        image_large: 'string',
        image_mobile: 'string',
        __v: 0,
      },
    ]);
  });

  it('селектор getMainIngredients должен возвращать только основные ингредиенты', () => {
    expect(
      ingredientsSlice.selectors.getMainIngredients(mockStateWithIngredients)
    ).toEqual([
      {
        _id: '2',
        name: 'Ingredient 2',
        type: 'main',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 200,
        image: 'string',
        image_large: 'string',
        image_mobile: 'string',
        __v: 0,
      },
    ]);
  });

  it('селектор getSauces должен возвращать только соусы', () => {
    expect(
      ingredientsSlice.selectors.getSauces(mockStateWithIngredients)
    ).toEqual([
      {
        _id: '3',
        name: 'Ingredient 3',
        type: 'sauce',
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        calories: 0,
        price: 50,
        image: 'string',
        image_large: 'string',
        image_mobile: 'string',
        __v: 0,
      },
    ]);
  });
});
