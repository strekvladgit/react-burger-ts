import { describe, expect, it } from 'vitest';

import { constructorSlice, initialState } from './reducers';

describe('constructor-ingredients слайс', () => {
  it('должен возвращать начальное состояние при неизвестном action', () => {
    console.log(constructorSlice.getInitialState());
    expect(constructorSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('должен добавлять ингредиент', () => {
    const ingredient = {
      _key: 'string',
      _id: 'string',
      name: 'string',
      type: 'string',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: 'string',
      image_large: 'string',
      image_mobile: 'string',
      __v: 0,
    };

    expect(
      constructorSlice.reducer(undefined, {
        type: 'constructorIngredients/addIngredient',
        payload: ingredient,
      })
    ).toEqual({
      ...initialState,
      otherIngredients: [ingredient],
    });
  });

  it('должен добавлять булку, если тип ингредиента bun', () => {
    const ingredient = {
      _key: 'string',
      _id: 'string',
      name: 'string',
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
    };
    expect(
      constructorSlice.reducer(undefined, {
        type: 'constructorIngredients/addIngredient',
        payload: ingredient,
      })
    ).toEqual({
      ...initialState,
      bun: ingredient,
    });
  });

  it('должен удалять ингредиент', () => {
    const mockState = {
      bun: null,
      otherIngredients: [
        {
          _key: '1',
          _id: 'string',
          name: 'string',
          type: 'string',
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
      ],
    };

    expect(
      constructorSlice.reducer(mockState, {
        type: 'constructorIngredients/deleteIngredient',
        payload: '1',
      })
    ).toEqual({
      ...mockState,
      otherIngredients: [],
    });
  });

  it('должен перемещать ингредиент', () => {
    const mockState = {
      bun: null,
      otherIngredients: [
        {
          _key: '1',
          _id: 'string',
          name: 'string',
          type: 'string',
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
          _key: '2',
          _id: 'string',
          name: 'string',
          type: 'string',
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
      ],
    };

    expect(
      constructorSlice.reducer(mockState, {
        type: 'constructorIngredients/moveIngredient',
        payload: { dragIndex: 0, hoverIndex: 1 },
      })
    ).toEqual({
      ...mockState,
      otherIngredients: [
        {
          _key: '2',
          _id: 'string',
          name: 'string',
          type: 'string',
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
          _key: '1',
          _id: 'string',
          name: 'string',
          type: 'string',
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
      ],
    });
  });

  it('должен очищать конструктор', () => {
    const mockState = {
      bun: {
        _key: '1',
        _id: 'string',
        name: 'string',
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
      otherIngredients: [
        {
          _key: '2',
          _id: 'string',
          name: 'string',
          type: 'string',
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
      ],
    };

    expect(
      constructorSlice.reducer(mockState, {
        type: 'constructorIngredients/clearContructorIngredients',
      })
    ).toEqual(initialState);
  });
});
