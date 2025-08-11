import { getConstructorIngredients } from '@/services/store/constructor-ingredients/reducers';
import {
  Counter,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import type { TIngredient } from '@/utils/types';
import type { Ref } from 'react';

import styles from './ingredient-cart.module.css';

const IngredientCart = (props: TIngredient): React.JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const ingredients = useSelector(getConstructorIngredients);

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredients',
    item: { ...props },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const { _id, type, name, price, image, image_mobile } = props;

  const counter = useMemo((): number | null => {
    if (!ingredients) {
      return null;
    }
    if (type === 'bun') {
      return (
        ingredients.filter((ingredient) => ingredient?._id === _id).length * 2
      );
    }
    return ingredients.filter((ingredient) => ingredient?._id === _id).length;
  }, [ingredients, _id, type]);

  const handleClick = (): void => {
    void navigate(`/ingredient/${_id}`, {
      state: {
        backgroundLocation: location,
      },
    });
  };

  return (
    <div
      ref={dragRef as unknown as Ref<HTMLDivElement>}
      className={`${styles.wrap} ${isDrag && styles.is_dragging}`}
      onClick={handleClick}
    >
      <div className={`${styles.image_wrap} pl-4 pr-4`}>
        <picture>
          <source srcSet={image_mobile} media="(max-width: 768px)" />
          <source srcSet={image} media="(min-width: 769px)" />
          <img className={styles.image} src={image} alt={name} />
        </picture>
        {counter ? <Counter count={counter} size="default" /> : null}
      </div>
      <div className={`${styles.price} mt-1 mb-1`}>
        <p className="text text_type_digits-default">{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
    </div>
  );
};

export default IngredientCart;
