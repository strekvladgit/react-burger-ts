import type { TIngredient } from '@/utils/types';

import styles from './ingredient-details.module.css';

export type TModalIngredientInfo = TIngredient & {
  onClose?: () => void;
};

const IngredientDetails = ({
  name,
  image,
  image_large,
  image_mobile,
  calories,
  fat,
  proteins,
  carbohydrates,
}: TModalIngredientInfo): React.JSX.Element => {
  return (
    <div className={styles.wrap}>
      <div className="pl-5 pr-5">
        <picture>
          <source srcSet={image_mobile} media="(max-width: 768px)" />
          <source srcSet={image_large} media="(min-width: 769px)" />
          <img src={image} alt={name} />
        </picture>
      </div>
      <p className="mt-4 mb-8 text text_type_main-medium text-center">{name}</p>
      <div className={styles.ingredient_properties}>
        <div className={styles.nutritional_value}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive mt-2 mb-5">
            {calories}
          </p>
        </div>
        <div className={styles.nutritional_value}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive mt-2 mb-5">
            {proteins}
          </p>
        </div>
        <div className={styles.nutritional_value}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive mt-2 mb-5">
            {fat}
          </p>
        </div>
        <div className={styles.nutritional_value}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive mt-2 mb-5">
            {carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
