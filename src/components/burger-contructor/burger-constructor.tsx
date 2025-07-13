import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getConstructorIngredients } from '@/services/store/constructor-ingredients/reducers';
import { sendOrder } from '@/services/store/order/actions';
import { getOrderLoading } from '@/services/store/order/reducers';
import currencyImage from '@images/currency.svg';
import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '../modal/modal';
import ConstructorList from './constructor-list/constructor-list';
import OrderDetails from './order-details/order-details';

import type { TOrderData } from '@/utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const ingredients = useSelector(getConstructorIngredients);
  const isLoading = useSelector(getOrderLoading);
  const [modalToggle, setModalToggle] = useState<boolean>(false);

  const handleSubmit = (): void => {
    if (!ingredients.length) {
      return;
    }
    const dataIngredients = ingredients.reduce<TOrderData>(
      (result, ingredient) => {
        console.log(ingredient);
        result.ingredients.push(ingredient._id);
        return result;
      },
      {
        ingredients: [],
      }
    );
    dataIngredients.ingredients.push(ingredients[0]._id);

    void dispatch(sendOrder(dataIngredients));
  };

  const toggleModal = (): void => {
    setModalToggle(!modalToggle);
  };

  const countTotalPrice = useMemo(() => {
    return ingredients.reduce<number>(
      (total, ingredient) => total + ingredient.price,
      0
    );
  }, [ingredients]);

  return (
    <>
      <section className={styles.burger_constructor}>
        <ConstructorList />
        <div className={`${styles.burger_constructor_footer} mt-10`}>
          <div className={styles.burger_constructor_total}>
            <p className="text text_type_digits-medium">{countTotalPrice}</p>
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
            disabled={!ingredients.length}
            onClick={() => {
              handleSubmit();
              toggleModal();
            }}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {modalToggle && !isLoading && (
        <Modal onClose={toggleModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};
