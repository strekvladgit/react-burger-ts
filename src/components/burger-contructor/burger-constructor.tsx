import currencyImage from '@images/currency.svg';
import { Button, ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import Modal from '../modal/modal';
import OrderDetails from './order-details/order-details';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const [modalToggle, setModalToggle] = useState<boolean>(false);

  const handleClick = (): void => {
    setModalToggle(!modalToggle);
  };

  const renderIngredients = (): React.JSX.Element => {
    const buns: React.JSX.Element[] = [];
    const otherIngredients: React.JSX.Element[] = [];

    ingredients.forEach(({ _id, type, name, price, image }) => {
      if (type === 'bun') {
        buns[0] = (
          <div key={_id}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${name} (верх)`}
              price={price}
              thumbnail={image}
            />
          </div>
        );
        buns[1] = (
          <div key={`${_id}_2`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${name} (низ)`}
              price={price}
              thumbnail={image}
            />
          </div>
        );
      } else {
        otherIngredients.push(
          <div key={_id}>
            <ConstructorElement text={name} price={price} thumbnail={image} />
          </div>
        );
      }
    });

    return (
      <>
        {buns[0]}
        <div className={`${styles.burger_constructor_scroll} mt-4 mb-4`}>
          {otherIngredients}
        </div>
        {buns[1]}
      </>
    );
  };

  const calcTotal = (): number => {
    return ingredients.reduce((sum, { price }) => sum + price, 0);
  };

  const renderedIngredients = renderIngredients();
  const totalPrice = calcTotal();

  return (
    <>
      <section className={styles.burger_constructor}>
        <div className={styles.burder_constructor_wrap}>{renderedIngredients}</div>
        <div className={`${styles.burger_constructor_footer} mt-10`}>
          <div className={styles.burger_constructor_total}>
            <p className="text text_type_digits-medium">{totalPrice}</p>
            <img
              className={styles.burger_constructor_currency}
              src={currencyImage}
              alt=""
            />
          </div>

          <Button htmlType="button" type="primary" size="large" onClick={handleClick}>
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
