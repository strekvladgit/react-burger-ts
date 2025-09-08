import { describe, expect, it } from 'vitest';

import { userSlice, initialState } from './reducers';

const mockUser = { name: 'User', email: 'user@example.com' };

const mockStateWithUser = {
  ...initialState,
  user: mockUser,
};

describe('user слайс', () => {
  it('должен возвращать начальное состояние при неизвестном action', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен обрабатывать действие signIn.fulfilled', () => {
    const action = {
      type: 'user/signIn/fulfilled',
      payload: mockUser,
    };
    expect(userSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      user: action.payload,
    });
  });

  it('должен обрабатывать действие signIn.rejected', () => {
    const action = {
      type: 'user/signIn/rejected',
      error: { message: 'Ошибка' },
    };
    expect(userSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: false,
      isOnReset: false,
      user: null,
    });
  });

  it('должен обрабатывать действие signOut.fulfilled', () => {
    const action = { type: 'user/signOut/fulfilled' };
    expect(userSlice.reducer(mockStateWithUser, action)).toEqual({
      ...initialState,
      user: null,
    });
  });

  it('должен обрабатывать действие signUp.fulfilled', () => {
    const action = {
      type: 'user/signUp/fulfilled',
      payload: mockUser,
    };
    expect(userSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      user: action.payload,
    });
  });

  it('должен обрабатывать действие checkAuth.fulfilled', () => {
    const action = {
      type: 'user/checkAuth/fulfilled',
      payload: mockUser,
    };
    expect(userSlice.reducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      user: action.payload,
    });
  });

  it('должен обрабатывать действие updateUser.fulfilled', () => {
    const updatedUser = { name: 'Updated User', email: 'updated@example.com' };
    const action = {
      type: 'user/updateUser/fulfilled',
      payload: updatedUser,
    };
    expect(userSlice.reducer(mockStateWithUser, action)).toEqual({
      ...mockStateWithUser,
      user: action.payload,
      isAuthChecked: true,
    });
  });
});
