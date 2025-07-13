import type { TIngredientsResponse, TIngredient } from '@/utils/types';

class IngredientsAPI {
  baseAPI: string;

  constructor() {
    this.baseAPI = 'https://norma.nomoreparties.space/api/ingredients';
  }

  public getIngredients = async (): Promise<
    TIngredientsResponse<TIngredient[]>
  > => {
    const response = await fetch(this.baseAPI);

    if (!response.ok) {
      throw new Error(`Http error status: ${response.status}`);
    }

    return response.json() as Promise<TIngredientsResponse<TIngredient[]>>;
  };
}

export default new IngredientsAPI();
