import OrderItem from '../order-item/order-item';
import Spinner from '../spinner/spinner';

import type { TOrderInfo } from '@/utils/types';

import styles from './order-list.module.css';

type TOrderList = {
  orders: TOrderInfo[];
};

const OrderList = ({ orders }: TOrderList): React.JSX.Element => {
  return (
    <div className={`${styles.wrap}`}>
      {orders?.length ? (
        orders.map((order, index) => <OrderItem key={index} {...order} />)
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default OrderList;
