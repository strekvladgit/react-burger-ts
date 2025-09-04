import { refreshToken } from '@/utils/sendRequestWithNewToken';

import type { RootState } from '../store/store';
import type {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';
import type { Middleware } from 'redux';

export type TWSActions<R, M> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  send?: ActionCreatorWithPayload<M>;
  onConnecting?: ActionCreatorWithoutPayload;
  onOpen?: ActionCreatorWithoutPayload;
  onClose?: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <Response, Message>(
  wsActions: TWSActions<Response, Message>,
  withTokenRefresh = false
): Middleware<Record<string, never>, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      disconnect,
      send,
      onConnecting,
      onOpen,
      onClose,
      onError,
      onMessage,
    } = wsActions;
    const { dispatch } = store;
    let reconnectTimer: ReturnType<typeof setTimeout> | number = 0;
    let isConnected = false;
    let url = '';

    return (next) => (action) => {
      if (connect.match(action)) {
        socket = new WebSocket(action.payload);
        url = action.payload;
        onConnecting && dispatch(onConnecting());

        socket.onopen = (): void => {
          onOpen && dispatch(onOpen());
          isConnected = true;
        };

        socket.onerror = (): void => {
          dispatch(onError('unknown error'));
        };

        socket.onclose = (): void => {
          onClose && dispatch(onClose());

          if (isConnected) {
            reconnectTimer = setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_PERIOD);
          }
        };

        socket.onmessage = (event: MessageEvent<unknown>): void => {
          try {
            const messageData =
              typeof event.data === 'string' ? event.data : String(event.data);
            const data = JSON.parse(messageData) as Response;

            if (
              withTokenRefresh &&
              typeof data === 'object' &&
              data !== null &&
              'message' in data &&
              data?.message === 'Invalid or missing token'
            ) {
              refreshToken()
                .then((refreshData) => {
                  const wssUrl = new URL(url);
                  wssUrl.searchParams.set(
                    'token',
                    refreshData.accessToken.replace('Bearer ', '')
                  );
                  dispatch(connect(wssUrl.toString()));
                })
                .catch((e) => {
                  dispatch(onError((e as Error).message));
                });

              dispatch(disconnect());
              return;
            }

            dispatch(onMessage(data));
          } catch (e) {
            dispatch(onError((e as Error).message));
          }
        };

        return;
      }

      if (socket && send?.match(action)) {
        try {
          socket.send(JSON.stringify(action.payload));
        } catch (error) {
          dispatch(onError((error as Error).message));
        }

        return;
      }

      if (socket && disconnect.match(action)) {
        clearInterval(reconnectTimer);
        isConnected = false;
        socket.close();
        socket = null;
        onClose && dispatch(onClose());

        return;
      }

      next(action);
    };
  };
};
