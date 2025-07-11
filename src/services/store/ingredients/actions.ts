import ingredientsApi from '@/services/api/ingredients-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadIngredients = createAsyncThunk(
  'ingredients/loadIngredients',
  async () => {
    return ingredientsApi
      .getIngredients()
      .then(({ data }) => data)
      .catch((error: Error) => {
        throw new Error(error.message);
      });
  }
);
