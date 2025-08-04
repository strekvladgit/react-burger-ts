import { createSlice } from '@reduxjs/toolkit';

import { addIngredient, deleteIngredient, moveIngredient } from './actions';

import type { TConstructorIngredients } from '@/utils/types';

type TConstructorState = {
  bun: TConstructorIngredients | null;
  otherIngredients: TConstructorIngredients[];
};

const initialState: TConstructorState = {
  bun: null,
  otherIngredients: [],
};

export const constructorSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  selectors: {
    getConstructorIngredients: (state): TConstructorIngredients[] => {
      return state.bun
        ? [state.bun, ...state.otherIngredients]
        : state.otherIngredients;
    },
    getConstructorBuns: (state) => state.bun,
    getConstructorOthers: (state) => state.otherIngredients,
  },
  reducers: {
    clearContructorIngredients: (state) => {
      state.bun = null;
      state.otherIngredients = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addIngredient, (state, action) => {
        const type = action.payload.type;
        if (type === 'bun') {
          state.bun = action.payload;
        } else {
          state.otherIngredients?.push(action.payload);
        }
      })
      .addCase(deleteIngredient, (state, action) => {
        state.otherIngredients = state.otherIngredients.filter(
          (ingredient) => ingredient._key !== action.payload
        );
      })
      .addCase(moveIngredient, (state, action) => {
        const { dragIndex, hoverIndex } = action.payload;
        const dragIngredient = state.otherIngredients[dragIndex];
        const newIngredients = [...state.otherIngredients];
        newIngredients.splice(dragIndex, 1);
        newIngredients.splice(hoverIndex, 0, dragIngredient);
        state.otherIngredients = newIngredients;
      });
  },
});

export const { clearContructorIngredients } = constructorSlice.actions;

export const {
  getConstructorIngredients,
  getConstructorBuns,
  getConstructorOthers,
} = constructorSlice.selectors;
