export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

export type TModal = {
  title?: string;
  children: React.JSX.Element | string;
  onClose?: () => void;
  extraClass?: string;
};

export type TIngredientsResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type TOrderResponse = {
  success: true;
  order: {
    number: number;
  };
  name: string;
};

export type TOrderData = {
  ingredients: string[];
};

export type TAsyncAction<T> = {
  payload: T;
};

export type TConstructorIngredients = TIngredient & {
  _key?: string;
  index?: number;
};
