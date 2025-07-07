import Modal from '@/components/modal/modal';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import IngredientInfo from '../ingredient-details/ingredient-details';

import type { TIngredient } from '@/utils/types';

import styles from './ingredient-cart.module.css';

const IngredientCart = (props: TIngredient): React.JSX.Element => {
  const { name, price, image, image_mobile } = props;

  const [modalToggle, setModalToggle] = useState<boolean>(false);

  const handleClick = (): void => {
    setModalToggle(!modalToggle);
  };

  return (
    <>
      <div className={styles.wrap} onClick={handleClick}>
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
          <IngredientInfo {...props} />
        </Modal>
      )}
    </>
  );
};

export default IngredientCart;
