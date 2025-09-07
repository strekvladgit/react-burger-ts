import { describe, expect, it } from 'vitest';

import { feedSlice, initialState } from './reducers';

describe('feed слайс', () => {
  it('должен возвращать начальное состояние при неизвестном action', () => {
    expect(feedSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен обрабатывать onFeedError', () => {
    const errorMessage = 'Ошибка подключения';
    expect(
      feedSlice.reducer(undefined, {
        type: 'feed/onFeedError',
        payload: errorMessage,
      })
    ).toEqual({
      ...initialState,
      error: errorMessage,
    });
  });

  it('должен обрабатывать onFeedMessage', () => {
    const feedMessage = {
      orders: [],
      total: 0,
      totalToday: 0,
    };
    expect(
      feedSlice.reducer(undefined, {
        type: 'feed/onFeedMessage',
        payload: feedMessage,
      })
    ).toEqual({
      ...initialState,
      ...feedMessage,
    });
  });
});
