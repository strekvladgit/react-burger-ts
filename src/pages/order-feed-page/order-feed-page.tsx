import OrderList from '@/components/order-list/order-list';
import Spinner from '@/components/spinner/spinner';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { wsFeedConnect, wsFeedDisconnect } from '@/services/store/feed/actions';
import {
  getFeedOrders,
  getFeedTotal,
  getFeedTotalToday,
} from '@/services/store/feed/reducers';
import { WS_ORDERS_URL } from '@/utils/constants';
import { useEffect } from 'react';

import styles from './order-feed-page.module.css';
const OrderFeedPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getFeedOrders);
  const total = useAppSelector(getFeedTotal);
  const totalToday = useAppSelector(getFeedTotalToday);

  const doneOrders = orders.filter((order) => order.status === 'done');
  const inProgressOrders = orders.filter((order) => order.status === 'pending');

  useEffect(() => {
    dispatch(wsFeedConnect(`${WS_ORDERS_URL}/all`));

    return (): void => {
      dispatch(wsFeedDisconnect());
    };
  }, [dispatch]);

  return (
    <main className={styles.wrap}>
      <h1 className="text text_type_main-large pt-10 pb-5">Лента заказов</h1>
      <div className={styles.flexbox}>
        <div className={`${styles.list} custom-scroll mb-15`}>
          {orders?.length ? <OrderList orders={orders} /> : <Spinner />}
        </div>
        <div className={styles.history}>
          <div className={styles.status}>
            <div className="custom-scroll">
              <p className="text text_type_main-medium mb-6">Готовы:</p>
              {doneOrders.map((order) => (
                <span
                  key={order._id}
                  className="mb-1 text text_type_digits-default text-blue"
                >
                  {order.number}
                </span>
              ))}
            </div>
            <div className="custom-scroll">
              <p className="text text_type_main-medium mb-6">В работе:</p>
              {inProgressOrders.map((order) => (
                <span
                  key={order._id}
                  className="mb-1 text text_type_digits-default"
                >
                  {order.number}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text text_type_main-medium mb-6">
              Выполнено за все время:
            </p>
            {total ? (
              <p className="text text_type_digits-large backlighted">{total}</p>
            ) : (
              <Spinner />
            )}
          </div>
          <div>
            <p className="text text_type_main-medium mb-6">
              Выполнено за сегодня:
            </p>
            {totalToday ? (
              <p className="text text_type_digits-large backlighted">
                {totalToday}
              </p>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderFeedPage;
