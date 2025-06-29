import done from '@images/done.svg';

import styles from './order-details.module.css';

export type TModalOrderInfo = {
  orderId: string;
};

const OrderDetails = ({ orderId }: TModalOrderInfo): React.JSX.Element => {
  return (
    <div className={styles.modal_wrap}>
      <h2 className="text text_type_digits-large mt-2">{orderId}</h2>
      <p className="text text_type_main-medium mt-4">идентификатор заказа</p>
      <img className="mt-15 mb-15" src={done} alt="Заказ отправлен" />
      <p className="text text_type_main-small">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive mt-2 mb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
