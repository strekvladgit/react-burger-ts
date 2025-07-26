import { useAppDispatch } from '@/hooks/useAppDispatch';
import { loadIngredients } from '@/services/store/ingredients/actions';
import {
  getBuns,
  getMainIngredients,
  getSauces,
} from '@/services/store/ingredients/reducers';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import IngredientCart from './ingredient-cart/ingredient-cart';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
  const [currentTabIndex, setCurrentTabIndex] = useState<string>('bun');
  const dispatch = useAppDispatch();
  const buns = useSelector(getBuns);
  const mainIngredients = useSelector(getMainIngredients);
  const sauces = useSelector(getSauces);

  const targetRefs = useRef<HTMLElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateTabs = (): void => {
    targetRefs.current.forEach((target: HTMLElement) => {
      const targetRect = target.getBoundingClientRect();
      const containerRect = containerRef.current?.getBoundingClientRect();
      const sectionName = target.getAttribute('data-section');

      if (
        containerRect!.top + 10 >= targetRect.top &&
        containerRect!.top < targetRect.bottom - 10
      ) {
        if (sectionName) {
          setCurrentTabIndex(sectionName);
        }
      }
    });
  };

  // const handleClick = (section: string): void => {
  // todo
  // };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', updateTabs);
    }
  }, []);

  useEffect(() => {
    void dispatch(loadIngredients());
  }, [dispatch]);

  const renderIngredients = (
    ingredients: TIngredient[]
  ): React.JSX.Element[] => {
    return ingredients.map((current: TIngredient) => {
      return <IngredientCart key={current._id} {...current} />;
    });
  };

  const bunsRendered = renderIngredients(buns);
  const mainIngredientsRendered = renderIngredients(mainIngredients);
  const saucesRendered = renderIngredients(sauces);

  const tabsProps = [
    {
      value: 'bun',
      text: 'Булки',
    },
    {
      value: 'main',
      text: 'Начинки',
    },
    {
      value: 'sauce',
      text: 'Соусы',
    },
  ];

  const renderedTabs = tabsProps.map(({ value, text }, index: number) => {
    if (currentTabIndex === value) {
      return (
        <Tab
          key={index}
          value={value}
          active={true}
          onClick={() => {
            console.log('clicked');
          }}
        >
          {text}
        </Tab>
      );
    } else {
      return (
        <Tab
          key={index}
          value={value}
          active={false}
          onClick={() => {
            console.log('clicked');
          }}
        >
          {text}
        </Tab>
      );
    }
  });

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>{renderedTabs}</ul>
      </nav>
      <div
        ref={containerRef}
        className={`${styles.burger_ingredients_container} custom-scroll mt-10 mb-10`}
      >
        <div
          ref={(el: HTMLDivElement) => {
            targetRefs.current[0] = el;
          }}
          data-section="bun"
          className="pb-10"
        >
          <h2 className="text text_type_main-medium">Булки</h2>
          <div className={`${styles.burger_ingredients_grid} pr-2 pl-4 pt-6`}>
            {bunsRendered}
          </div>
        </div>

        <div
          ref={(el: HTMLDivElement) => {
            targetRefs.current[1] = el;
          }}
          data-section="main"
          className="pt-10"
        >
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div className={`${styles.burger_ingredients_grid} mr-4 ml-4 mt-6`}>
            {mainIngredientsRendered}
          </div>
        </div>

        <div
          ref={(el: HTMLDivElement) => {
            targetRefs.current[2] = el;
          }}
          data-section="sauce"
          className="pt-10"
        >
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={`${styles.burger_ingredients_grid} mr-4 ml-4 mt-6`}>
            {saucesRendered}
          </div>
        </div>
      </div>
    </section>
  );
};
