import { createAction } from '@reduxjs/toolkit';

import type { TOrdersResponse } from '@/utils/types';

export const wsProfileFeedConnect = createAction<string, 'profileFeed/connect'>(
  'profileFeed/connect'
);
export const wsProfileFeedDisconnect = createAction('profileFeed/disconnect');

export const onProfileFeedMessage = createAction<
  TOrdersResponse,
  'profileFeed/onProfileFeedMessage'
>('profileFeed/onProfileFeedMessage');
export const onProfileFeedError = createAction<
  string,
  'profileFeed/onProfileFeedError'
>('profileFeed/onProfileFeedError');
