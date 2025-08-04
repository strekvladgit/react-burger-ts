import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addIngredient } from '@/services/store/constructor-ingredients/actions';
import {
  getConstructorBuns,
  getConstructorOthers,
} from '@/services/store/constructor-ingredients/reducers';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';

import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';
import ConstructorSpace from '../constructor-space/constructor-space';

import type { TConstructorIngredients, TIngredient } from '@/utils/types';
import type { Ref } from 'react';

import styles from './constructor-list.module.css';

const ConstructorList = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const buns = useSelector(getConstructorBuns);
  const otherIngredients = useSelector(getConstructorOthers);

  const [{ Item }, dropTarget] = useDrop<
    TIngredient,
    void,
    { Item: TIngredient | null }
  >({
    accept: 'ingredients',
    drop(item) {
      void dispatch(addIngredient(item));
    },
    collect: (monitor) => ({
      Item: monitor.getItem(),
    }),
  });

  const renderIngredients = (
    elements: TConstructorIngredients[] | null
  ): React.JSX.Element[] | null => {
    if (!elements?.length) {
      return null;
    }
    return elements.map(
      (element: TConstructorIngredients, index: number): React.JSX.Element => {
        return (
          <ConstructorIngredient
            {...element}
            key={element._key}
            _key={element._key}
            isLocked={false}
            extraClass={`${Item && Item.type !== 'bun' ? styles.hover : ''}`}
            index={index}
            isDraggable={true}
          />
        );
      }
    );
  };

  const otherIngredientsRendered = renderIngredients(otherIngredients);
  const bunsRendered = [
    buns ? (
      <ConstructorIngredient
        {...buns}
        text={`${buns.name} (верх)`}
        _key={buns._key}
        elementType="top"
        isLocked={true}
        extraClass={`${Item && Item.type === 'bun' ? styles.hover : ''}`}
        isDraggable={false}
      />
    ) : (
      <ConstructorSpace
        extraClass={`${Item && Item.type === 'bun' ? styles.hover : ''}`}
        text="Выберите булку"
        type="top"
      />
    ),
    buns ? (
      <ConstructorIngredient
        {...buns}
        text={`${buns.name} (низ)`}
        _key={buns._key}
        elementType="bottom"
        isLocked={true}
        extraClass={`${Item && Item.type === 'bun' ? styles.hover : ''}`}
        isDraggable={false}
      />
    ) : (
      <ConstructorSpace
        extraClass={`${Item && Item.type === 'bun' ? styles.hover : ''}`}
        text="Выберите булку"
        type="bottom"
      />
    ),
  ];

  const renderedIngredients = (
    <>
      {bunsRendered[0]}
      <div className={`${styles.constructor_scroll} mt-4 mb-4`}>
        {otherIngredientsRendered ?? (
          <ConstructorSpace
            extraClass={`${Item && Item.type !== 'bun' ? styles.hover : ''}`}
            text="Выберите ингридиент"
          />
        )}
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
