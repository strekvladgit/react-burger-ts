import { getCurrentIngredient } from '@/services/store/current-ingredient/reducers';
import { useSelector } from 'react-redux';

import styles from './ingredient-details.module.css';

const IngredientDetails = (): React.JSX.Element => {
  const ingredient = useSelector(getCurrentIngredient);

  return (
    <div className={styles.wrap}>
      <div className="pl-5 pr-5">
        <picture>
          <source
            srcSet={ingredient?.image_mobile}
            media="(max-width: 768px)"
          />
          <source srcSet={ingredient?.image_large} media="(min-width: 769px)" />
          <img src={ingredient?.image} alt={ingredient?.name} />
        </picture>
      </div>
      <p className="mt-4 mb-8 text text_type_main-medium text-center">
        {ingredient?.name}
      </p>
      <div className={styles.ingredient_properties}>
        <div className={styles.nutritional_value}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2 mb-5">
            {ingredient?.calories}
          </p>
        </div>
        <div className={styles.nutritional_value}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2 mb-5">
            {ingredient?.proteins}
          </p>
        </div>
        <div className={styles.nutritional_value}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2 mb-5">
            {ingredient?.fat}
          </p>
        </div>
        <div className={styles.nutritional_value}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive mt-2 mb-5">
            {ingredient?.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
