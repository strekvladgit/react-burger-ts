import { describe, expect, it } from 'vitest';

import { orderSlice, initialState } from './reducers';

describe('order слайс', () => {
  it('должен возвращать начальное состояние при неизвестном action', () => {
    expect(orderSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен обрабатывать действие sendOrder.pending', () => {
    const action = { type: 'order/sendOrder/pending' };
    expect(orderSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
      error: null,
      orderNumber: null,
    });
  });

  it('должен обрабатывать действие sendOrder.fulfilled', () => {
    const action = {
      type: 'order/sendOrder/fulfilled',
      payload: 123,
    };
    expect(orderSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      error: null,
      orderNumber: 123,
    });
  });

  it('должен обрабатывать действие sendOrder.rejected', () => {
    const action = {
      type: 'order/sendOrder/rejected',
      error: { message: 'Ошибка' },
    };
    expect(orderSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка',
      orderNumber: null,
    });
  });

  it('должен обрабатывать действие getOrder.pending', () => {
    const action = { type: 'order/getOrder/pending' };
    expect(orderSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      loading: true,
      error: null,
      orderNumber: null,
    });
  });

  it('должен обрабатывать действие getOrder.fulfilled', () => {
    const mockOrder = {
      ingredients: ['ingredient1', 'ingredient2'],
      name: 'Order 1',
      _id: 'order123',
      status: 'done',
      number: 1,
    };
    const action = {
      type: 'order/getOrder/fulfilled',
      payload: mockOrder,
    };
    expect(orderSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      error: null,
      currentOrder: mockOrder,
    });
  });

  it('должен обрабатывать действие getOrder.rejected', () => {
    const action = {
      type: 'order/getOrder/rejected',
      error: { message: 'Ошибка' },
    };
    expect(orderSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка',
      currentOrder: null,
    });
  });

  it('селектор getOrderNum должен возвращать orderNumber', () => {
    const state = { order: { ...initialState, orderNumber: 123 } };
    expect(orderSlice.selectors.getOrderNum(state)).toEqual(123);
  });

  it('селектор getOrderLoading должен возвращать loading', () => {
    const state = { order: { ...initialState, loading: true } };
    expect(orderSlice.selectors.getOrderLoading(state)).toEqual(true);
  });

  it('селектор getCurrentOrder должен возвращать currentOrder', () => {
    const mockOrder = {
      ingredients: ['ingredient1', 'ingredient2'],
      name: 'Order 1',
      _id: 'order123',
      status: 'done',
      number: 1,
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
    };
    const state = { order: { ...initialState, currentOrder: mockOrder } };
    expect(orderSlice.selectors.getCurrentOrder(state)).toEqual(mockOrder);
  });
});
