import styles from './burger-constructor.module.css';

import type { TIngredient } from '@utils/types';
import type { FC } from 'react';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor: FC<TBurgerConstructorProps> = ({ ingredients }) => {
  console.log(ingredients);

  return <section className={styles.burger_constructor}></section>;
};
