import { sendRequest } from '@/utils/sendRequest';

import type { TIngredientsResponse, TIngredient } from '@/utils/types';

class AuthAPI {
  public async postResetPasswordRequest(): Promise<
    TIngredientsResponse<TIngredient[]>
  > {
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

export default new AuthAPI();
