import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from '@reduxjs/toolkit';

import { checkAuth, signIn, signOut, signUp, updateUser } from './actions';

type TUser = {
  name: string;
  email: string;
};

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  isOnReset: boolean;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  isOnReset: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: { payload: TUser }) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: { payload: boolean }) => {
      state.isAuthChecked = action.payload;
    },
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getIsLoading: (state) => state.isLoading,
    getIsOnReset: (state) => state.isOnReset,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addMatcher(isPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(isFulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(isRejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isOnReset = false;
        state.isAuthChecked = true;
      });
  },
});

export const { getUser, getIsAuthChecked, getIsLoading } = userSlice.selectors;
export const { setUser, setIsAuthChecked } = userSlice.actions;
