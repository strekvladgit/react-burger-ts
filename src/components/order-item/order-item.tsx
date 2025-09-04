import { useAppSelector } from '@/hooks/use-app-selector';
import { getIngredients } from '@/services/store/ingredients/reducers';
import { formattedDate } from '@/utils/formattedDate';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';

import type { TOrderInfo } from '@/utils/types';

import styles from './order-item.module.css';

const OrderItem = ({
  ingredients,
  name,
  updatedAt,
  number,
}: TOrderInfo): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const ingredientsInfo = useAppSelector(getIngredients);

  const ordersIngredients = ingredients.map((id) =>
    ingredientsInfo.find((item) => item._id === id)
  );

  const totalPrice = ordersIngredients.reduce(
    (acc, item) => acc + (item?.price ?? 0),
    0
  );

  const orderDate = formattedDate(updatedAt);

  const handleClick = (): void => {
    void navigate(`${number}`, {
      state: {
        backgroundLocation: location,
      },
    });
  };

  return (
    <div onClick={handleClick} className={`${styles.wrap} p-6 mr-2`}>
      <div className={styles.flexbox}>
        <div className="text text_type_digits-default">#{number}</div>
        <div className="text text_type_main-default text_color_inactive">
          {orderDate}
        </div>
      </div>
      <div className="text text_type_main-medium">{name}</div>
      <div className={styles.flexbox}>
        <div className={styles.flexbox}>
          {ordersIngredients.slice(0, 6).map((item, index) => (
            <div
              key={index}
              className={styles.ingredient_img}
              style={{ zIndex: 6 - index }}
            >
              {item && (
                <img
                  src={item.image_mobile}
                  alt={item.name}
                  className={styles.img}
                />
              )}
              {index === 5 && ingredients.length > 6 && (
                <div className={styles.overlay}>
                  <span className="text text_type_main-default">
                    +{ingredients.length - 6}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.price}>
          <p className="text text_type_digits-default">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
