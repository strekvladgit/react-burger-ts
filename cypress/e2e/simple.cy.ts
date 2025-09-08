import { BASE_URL } from './../../src/utils/constants';

import type {} from '../support/cypress';

/// <reference types="cypress" />

describe('Перетаскивание ингридиентов и создание заказа', () => {
  const ORDER_BUTTON = '[data-testid="order-button"]';
  const MODAL = '[data-testid="modal"]';
  const MODAL_OVERLAY = '[data-testid="modal-overlay"]';

  beforeEach(() => {
    cy.visit('');
    cy.intercept('GET', `${BASE_URL}/ingredients`, {
      fixture: 'ingredients.json',
    }).as('getIngredients');
  });

  it('открывает модальное окно с информацией об ингридиенте', () => {
    cy.wait('@getIngredients');
    cy.get('[data-testid="ingredient-main-1"]').click();
    cy.get(MODAL).should('exist');
    cy.get(MODAL_OVERLAY).click('topLeft');
    cy.get(MODAL).should('not.exist');
  });

  it('перетаскивает ингридиенты в конструктор', () => {
    cy.wait('@getIngredients');
    cy.fillConstructor();
  });

  it('неавторизованный пользователь не может создать заказ (переходит на страницу логина)', () => {
    cy.wait('@getIngredients');
    cy.fillConstructor();
    cy.get(ORDER_BUTTON).click();
    cy.url().should('include', '/login');
  });

  it('авторизованный пользователь может создать заказ (открывается модальное окно с заказом)', () => {
    window.localStorage.setItem('accessToken', 'test-token');
    cy.intercept('GET', `${BASE_URL}/auth/user`, {
      fixture: 'user.json',
    }).as('login');
    cy.wait('@getIngredients');
    cy.fillConstructor();
    cy.get(ORDER_BUTTON).click();
    cy.intercept('POST', `${BASE_URL}/orders`, {
      fixture: 'order.json',
    }).as('postOrder');
    cy.get(MODAL).should('exist');
    cy.get(MODAL_OVERLAY).click('topLeft');
    cy.get(MODAL).should('not.exist');
  });
});
