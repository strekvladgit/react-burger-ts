import Modal from '@/components/modal/modal';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { getConstructorIngredients } from '@/services/store/constructor-ingredients/reducers';
import {
  clearCurrentIngredient,
  setCurrentIngredient,
} from '@/services/store/current-ingredient/actions';
import {
  Counter,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';

import IngredientDetails from '../ingredient-details/ingredient-details';

import type { TIngredient } from '@/utils/types';
import type { Ref } from 'react';

import styles from './ingredient-cart.module.css';

const IngredientCart = (props: TIngredient): React.JSX.Element => {
  const dispatch = useAppDispatch();

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

  const [modalToggle, setModalToggle] = useState<boolean>(false);

  const handleClick = (): void => {
    if (!modalToggle) {
      void dispatch(setCurrentIngredient(props));
    } else {
      dispatch(clearCurrentIngredient());
    }
    setModalToggle(!modalToggle);
  };

  return (
    <>
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
      {modalToggle && (
        <Modal title="Детали ингредиента" onClose={handleClick}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};

export default IngredientCart;
