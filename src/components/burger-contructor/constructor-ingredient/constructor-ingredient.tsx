import { useAppDispatch } from '@/hooks/useAppDispatch';
import { deleteIngredient } from '@/services/store/constructor-ingredients/actions';
import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import type { TConstructorIngredients } from '@/utils/types';

type TConstructorIngredientsComponent = TConstructorIngredients & {
  elementType?: 'top' | 'bottom';
  isLocked: boolean;
  text?: string;
};

const ConstructorIngredient = ({
  name,
  price,
  image,
  _key,
  isLocked,
  elementType,
}: TConstructorIngredientsComponent): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const onDelete = (): void => {
    void dispatch(deleteIngredient(_key!));
  };
  return (
    <div>
      <ConstructorElement
        type={elementType}
        isLocked={isLocked}
        text={`${name}`}
        price={price}
        thumbnail={image}
        handleClose={onDelete}
      />
    </div>
  );
};

export default ConstructorIngredient;
