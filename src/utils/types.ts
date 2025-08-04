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

export type TUserData = {
  name?: string;
  email: string;
  password?: string;
};

export type TUserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};

export type TAuthResponse = TUserResponse & {
  accessToken: string;
  refreshToken: string;
};

export type TResetResponse = {
  success: boolean;
  message: string;
};

export type TResetRequestData = {
  email: string;
};

export type TResetData = {
  password: string;
  token: string;
};

export type TRefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TLogoutResponse = {
  success: boolean;
  message: string;
};

export type TErrorResponse = {
  success: boolean;
  message?: string;
  [key: string]: unknown;
};
