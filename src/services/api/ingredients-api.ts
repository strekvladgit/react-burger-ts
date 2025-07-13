import { sendRequest } from '@/utils/sendRequest';

import type { TIngredientsResponse, TIngredient } from '@/utils/types';

class IngredientsAPI {
  public async getIngredients(): Promise<TIngredientsResponse<TIngredient[]>> {
    try {
      return await sendRequest<TIngredientsResponse<TIngredient[]>>(
        '/ingredients'
      );
    } catch (error) {
      console.error('Failed to fetch ingredients:', error);
      throw error;
    }
  }
}

export default new IngredientsAPI();
