import type { TApiResponse, TIngredient } from '@/utils/types';

class IngredientsAPI {
  baseAPI: string;

  constructor() {
    this.baseAPI = 'https://norma.nomoreparties.space/api/ingredients';
  }

  public getIngredients = async (): Promise<TApiResponse<TIngredient[]>> => {
    const response = await fetch(this.baseAPI);

    if (!response.ok) {
      throw new Error(`Http error status: ${response.status}`);
    }

    return response.json() as Promise<TApiResponse<TIngredient[]>>;
  };
}

export default new IngredientsAPI();
