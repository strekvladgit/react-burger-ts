import { Tab } from '@krgaa/react-developer-burger-ui-components';

import IngredientCart from './ingredient-cart/ingredient-cart';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const renderIngredients = (type: string): React.JSX.Element[] => {
    return ingredients.reduce((result: React.JSX.Element[], current: TIngredient) => {
      if (current.type === type) {
        result.push(<IngredientCart key={current._id} {...current} />);
      }
      return result;
    }, []);
  };

  const bunsIngredients = renderIngredients('bun');
  const mainIngredients = renderIngredients('main');
  const sauceIngredients = renderIngredients('sauce');

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <div
        className={`${styles.burger_ingredients_container} custom-scroll mt-10 mb-10`}
      >
        <div className="pb-10">
          <h2 className="text text_type_main-medium">Булки</h2>
          <div className={`${styles.burger_ingredients_grid} pr-2 pl-4 pt-6`}>
            {bunsIngredients}
          </div>
        </div>

        <div className="pt-10">
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div className={`${styles.burger_ingredients_grid} mr-4 ml-4 mt-6`}>
            {mainIngredients}
          </div>
        </div>

        <div className="pt-10">
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={`${styles.burger_ingredients_grid} mr-4 ml-4 mt-6`}>
            {sauceIngredients}
          </div>
        </div>
      </div>
    </section>
  );
};
