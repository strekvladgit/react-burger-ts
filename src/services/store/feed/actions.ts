import { createAction } from '@reduxjs/toolkit';

import type { TOrdersResponse } from '@/utils/types';

export const wsFeedConnect = createAction<string, 'feed/connect'>(
  'feed/connect'
);
export const wsFeedDisconnect = createAction('feed/disconnect');

export const onFeedMessage = createAction<
  TOrdersResponse,
  'feed/onFeedMessage'
>('feed/onFeedMessage');
export const onFeedError = createAction<string, 'feed/onFeedError'>(
  'feed/onFeedError'
);
