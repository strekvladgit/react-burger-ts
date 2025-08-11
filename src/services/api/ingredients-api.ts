import { sendRequest } from '@/utils/sendRequest';

import type { TIngredientsResponse, TIngredient } from '@/utils/types';

class IngredientsAPI {
  public async getIngredients(): Promise<TIngredientsResponse<TIngredient[]>> {
    return await sendRequest<TIngredientsResponse<TIngredient[]>>(
      '/ingredients'
    );
  }
}

export default new IngredientsAPI();
