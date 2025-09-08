import { describe, expect, it } from 'vitest';

import { profileFeedSlice, initialState } from './reducers';

describe('profileFeed слайс', () => {
  it('должен возвращать начальное состояние при неизвестном action', () => {
    expect(profileFeedSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('должен обрабатывать onProfileFeedError', () => {
    const errorMessage = 'Ошибка подключения';
    expect(
      profileFeedSlice.reducer(undefined, {
        type: 'profileFeed/onProfileFeedError',
        payload: errorMessage,
      })
    ).toEqual({
      ...initialState,
      error: errorMessage,
    });
  });

  it('должен обрабатывать onProfileFeedMessage', () => {
    const profileFeedMessage = {
      orders: [],
      total: 0,
      totalToday: 0,
    };
    expect(
      profileFeedSlice.reducer(undefined, {
        type: 'profileFeed/onProfileFeedMessage',
        payload: profileFeedMessage,
      })
    ).toEqual({
      ...initialState,
      ...profileFeedMessage,
    });
  });
});
