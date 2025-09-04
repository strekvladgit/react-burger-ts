import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useAppSelector } from '@/hooks/use-app-selector';
import { getIngredients } from '@/services/store/ingredients/reducers';
import { getOrder } from '@/services/store/order/actions';
import { formattedDate } from '@/utils/formattedDate';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import type { RootState } from '@/services/store/store';
import type { TIngredient } from '@/utils/types';

import styles from './order-page.module.css';

type TIngredientWithCount = TIngredient & {
  count: number;
};
const OrderPage = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { number } = useParams();

  const order = useAppSelector((state: RootState) => {
    let order = state.feed.orders.find((o) => o.number === Number(number));
    if (order) return order;
    order = state.profileFeed.orders.find((o) => o.number === Number(number));
    if (order) return order;
    return state.order.currentOrder;
  });
  const ingredients = useAppSelector(getIngredients);

  useEffect(() => {
    if (!order && number) {
      void dispatch(getOrder(+number));
    }
  });

  const ingredientsMap = new Map(ingredients.map((ing) => [ing._id, ing]));
  const countsMap = new Map<string, number>();

  order?.ingredients.forEach((id) => {
    countsMap.set(id, (countsMap.get(id) ?? 0) + 1);
  });

  const ordersIngredients = Array.from(countsMap.entries())
    .map(([id, count]) => {
      const ingredient = ingredientsMap.get(id);
      if (!ingredient) return null;

      return {
        ...ingredient,
        count,
      };
    })
    .filter(Boolean) as TIngredientWithCount[];

  const totalPrice = ordersIngredients.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );

  return (
    <main className={styles.wrap}>
      <h1 className="text text_type_digits-default text-center">#{number}</h1>
      <p className="text text_type_main-medium mt-10">{order?.name}</p>
      <p className="text text_type_main-default text-blue mt-3">
        {order?.status === 'done' ? 'Выполнен' : 'Готовится'}
      </p>

      <p className="text text_type_main-medium mt-15">Состав:</p>
      <div className={`${styles.composition} mt-6 custom-scroll`}>
        {ordersIngredients?.map((item, index) => (
          <div key={index} className={styles.flexbox}>
            <div className={styles.flexbox}>
              <div className={styles.ingredient_img}>
                <img src={item?.image_mobile} className={styles.img} alt="" />
              </div>
              <p className="text text_type_main-default ml-4">{item?.name}</p>
            </div>
            <div className={styles.flexbox}>
              <p className="text text_type_digits-default mr-2">
                {item.count} x {item.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>
      <div className={`${styles.flexbox} mt-10`}>
        <p className="text text_type_main-default text_color_inactive">
          {formattedDate(order?.updatedAt ?? '')}
        </p>
        <div className={styles.flexbox}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </main>
  );
};

export default OrderPage;
