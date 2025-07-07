import ingredientsApi from '@/services/ingredients-api';
import { mockIngredients } from '@/utils/ingredients';
import { useEffect, useState } from 'react';

import { AppHeader } from '@components/app-header/app-header';
import { BurgerConstructor } from '@components/burger-contructor/burger-constructor';
import { BurgerIngredients } from '@components/burger-ingredients/burger-ingredients';

import type { TIngredient } from '@/utils/types';

import styles from './app.module.css';

export const App = (): React.JSX.Element => {
  const [ingredients, setIngredietns] = useState<TIngredient[]>([]);

  useEffect(() => {
    ingredientsApi
      .getIngredients()
      .then(({ data }) => setIngredietns(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <main className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={mockIngredients} />
      </main>
    </div>
  );
};

export default App;
