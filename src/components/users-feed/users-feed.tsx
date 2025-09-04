import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import {
  wsProfileFeedConnect,
  wsProfileFeedDisconnect,
} from '@/services/store/profile-feed/actions';
import { getProfileFeedOrders } from '@/services/store/profile-feed/reducers';
import { WS_ORDERS_URL } from '@/utils/constants';
import { useEffect } from 'react';

import OrderList from '../order-list/order-list';

const UsersFeed = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getProfileFeedOrders);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    dispatch(wsProfileFeedConnect(`${WS_ORDERS_URL}?token=${token}`));

    return (): void => {
      dispatch(wsProfileFeedDisconnect());
    };
  }, [dispatch, token]);
  return <OrderList orders={orders} />;
};

export default UsersFeed;
