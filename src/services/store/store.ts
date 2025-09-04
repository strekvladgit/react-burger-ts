import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { socketMiddleware } from '../middleware/socket-middleware';
import { constructorSlice } from './constructor-ingredients/reducers';
import {
  onFeedError,
  onFeedMessage,
  wsFeedConnect,
  wsFeedDisconnect,
} from './feed/actions';
import { feedSlice } from './feed/reducers';
import { ingredientsSlice } from './ingredients/reducers';
import { orderSlice } from './order/reducers';
import {
  onProfileFeedError,
  onProfileFeedMessage,
  wsProfileFeedConnect,
  wsProfileFeedDisconnect,
} from './profile-feed/actions';
import { profileFeedSlice } from './profile-feed/reducers';
import { userSlice } from './user/reducers';

const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  orderSlice,
  userSlice,
  feedSlice,
  profileFeedSlice
);

const feedMiddleware = socketMiddleware({
  connect: wsFeedConnect,
  disconnect: wsFeedDisconnect,
  onMessage: onFeedMessage,
  onError: onFeedError,
});

const profileFeedMiddleware = socketMiddleware({
  connect: wsProfileFeedConnect,
  disconnect: wsProfileFeedDisconnect,
  onMessage: onProfileFeedMessage,
  onError: onProfileFeedError,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(feedMiddleware, profileFeedMiddleware);
  },
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
