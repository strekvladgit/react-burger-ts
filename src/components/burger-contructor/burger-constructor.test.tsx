import { store } from '@/services/store/store';
import { render, cleanup, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';

import { BurgerConstructor } from '@components/burger-contructor/burger-constructor';

describe('burger-constructor компонент', () => {
  afterEach(() => {
    cleanup();
  });

  it('при рендере должны быть заглушки и кнопка заказа имеет атрибут disabled', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <DndProvider backend={HTML5Backend}>
            <BurgerConstructor />
          </DndProvider>
        </Provider>
      </BrowserRouter>
    );

    const topSpace = screen.getByTestId('bun-top-space');
    const bottomSpace = screen.getByTestId('bun-bottom-space');
    const ingredientsSpace = screen.getByTestId('ingredients-space');
    const orderButton = screen.getByTestId('order-button');

    expect(topSpace).toBeInTheDocument();
    expect(bottomSpace).toBeInTheDocument();
    expect(ingredientsSpace).toBeInTheDocument();
    expect(orderButton).toHaveAttribute('disabled');
  });
});
