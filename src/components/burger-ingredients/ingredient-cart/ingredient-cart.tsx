import Modal from '@/components/modal/modal';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  clearCurrentIngredient,
  setCurrentIngredient,
} from '@/services/store/current-ingredient/actions';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDrag } from 'react-dnd';

import IngredientDetails from '../ingredient-details/ingredient-details';

import type { TIngredient } from '@/utils/types';
import type { Ref } from 'react';

import styles from './ingredient-cart.module.css';

const IngredientCart = (props: TIngredient): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredients',
    item: { ...props },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const { name, price, image, image_mobile } = props;

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
        <div className="ml-4 mr-4">
          <picture>
            <source srcSet={image_mobile} media="(max-width: 768px)" />
            <source srcSet={image} media="(min-width: 769px)" />
            <img className={styles.image} src={image} alt={name} />
          </picture>
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
