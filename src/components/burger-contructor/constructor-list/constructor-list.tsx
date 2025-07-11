import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  addIngredient,
  countTotalPrice,
} from '@/services/store/constructor-ingredients/actions';
import {
  getConstructorBuns,
  getConstructorOthers,
} from '@/services/store/constructor-ingredients/reducers';
import { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';

import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';

import type { TConstructorIngredients, TIngredient } from '@/utils/types';
import type { Ref } from 'react';

import styles from './constructor-list.module.css';

const ConstructorList = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const buns = useSelector(getConstructorBuns);
  const otherIngredients = useSelector(getConstructorOthers);

  const [, dropTarget] = useDrop<TIngredient>({
    accept: 'ingredients',
    drop(item) {
      void dispatch(addIngredient(item));
    },
  });

  useEffect(() => {
    void dispatch(countTotalPrice());
  }, [dispatch, buns, otherIngredients]);

  const renderIngredients = (
    elements: TConstructorIngredients[]
  ): React.JSX.Element[] => {
    return elements.map(
      (element: TConstructorIngredients): React.JSX.Element => {
        return (
          <ConstructorIngredient
            {...element}
            key={element._key}
            _key={element._key}
            isLocked={false}
          />
        );
      }
    );
  };

  const otherIngredientsRendered = renderIngredients(otherIngredients);
  const bunsRendered = [
    buns && (
      <ConstructorIngredient
        {...buns}
        text={`${buns.name} (верх)`}
        _key={buns._key}
        elementType="top"
        isLocked={true}
      />
    ),
    buns && (
      <ConstructorIngredient
        {...buns}
        text={`${buns.name} (низ)`}
        _key={buns._key}
        elementType="bottom"
        isLocked={true}
      />
    ),
  ];

  const renderedIngredients = (
    <>
      {bunsRendered[0]}
      <div className={`${styles.constructor_scroll} mt-4 mb-4`}>
        {otherIngredientsRendered}
      </div>
      {bunsRendered[1]}
    </>
  );

  return (
    <div
      ref={dropTarget as unknown as Ref<HTMLDivElement>}
      className={styles.constructor_wrap}
    >
      {renderedIngredients}
    </div>
  );
};

export default ConstructorList;
