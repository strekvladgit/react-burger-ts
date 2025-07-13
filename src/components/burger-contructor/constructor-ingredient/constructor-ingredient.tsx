import { useAppDispatch } from '@/hooks/useAppDispatch';
import {
  deleteIngredient,
  moveIngredient,
} from '@/services/store/constructor-ingredients/actions';
import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import type { TConstructorIngredients } from '@/utils/types';

type TConstructorIngredientsComponent = TConstructorIngredients & {
  elementType?: 'top' | 'bottom';
  isLocked: boolean;
  text?: string;
  extraClass?: string;
  isDraggable: boolean;
};

const ConstructorIngredient = ({
  name,
  price,
  image,
  _key,
  isLocked,
  elementType,
  extraClass,
  isDraggable,
  index,
}: TConstructorIngredientsComponent): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);
  const [, dropRef] = useDrop({
    accept: 'card',
    hover: (item: TConstructorIngredients, monitor) => {
      if (item && item.index !== undefined && index !== undefined) {
        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const clientOffset = monitor.getClientOffset();

        if (hoverBoundingRect && clientOffset) {
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

          const hoverClientY = clientOffset.y - hoverBoundingRect.top;

          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }

          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }
        }

        void dispatch(moveIngredient(dragIndex, hoverIndex));

        item.index = hoverIndex;
      }
    },
    canDrop: () => isDraggable,
  });
  const [{ isDragging }, dragRef] = useDrag({
    type: 'card',
    item: () => {
      return { _key, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isDraggable,
  });

  dragRef(dropRef(ref));

  const opaicty = isDragging ? 0 : 1;

  const onDelete = (): void => {
    void dispatch(deleteIngredient(_key!));
  };
  return (
    <div ref={ref} style={{ opacity: opaicty }}>
      <ConstructorElement
        type={elementType}
        isLocked={isLocked}
        text={`${name}`}
        price={price}
        thumbnail={image}
        handleClose={onDelete}
        extraClass={extraClass}
      />
    </div>
  );
};

export default ConstructorIngredient;
