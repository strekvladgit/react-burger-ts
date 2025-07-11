import { getTotalPrice } from '@/services/store/constructor-ingredients/reducers';
import currencyImage from '@images/currency.svg';
import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '../modal/modal';
import ConstructorList from './constructor-list/constructor-list';
import OrderDetails from './order-details/order-details';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const totlPrice = useSelector(getTotalPrice);
  const [modalToggle, setModalToggle] = useState<boolean>(false);

  const handleClick = (): void => {
    setModalToggle(!modalToggle);
  };

  return (
    <>
      <section className={styles.burger_constructor}>
        <ConstructorList />
        <div className={`${styles.burger_constructor_footer} mt-10`}>
          <div className={styles.burger_constructor_total}>
            <p className="text text_type_digits-medium">{totlPrice}</p>
            <img
              className={styles.burger_constructor_currency}
              src={currencyImage}
              alt=""
            />
          </div>

          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleClick}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {modalToggle && (
        <Modal onClose={handleClick}>
          <OrderDetails orderId="034536" />
        </Modal>
      )}
    </>
  );
};
