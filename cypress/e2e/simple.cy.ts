import { BASE_URL } from './../../src/utils/constants';

import type {} from '../support/cypress';

/// <reference types="cypress" />

describe('Перетаскивание ингридиентов и создание заказа', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
    cy.intercept('GET', `${BASE_URL}/ingredients`, {
      fixture: 'ingredients.json',
    }).as('getIngredients');
  });

  it('открывает модальное окно с информацией об ингридиенте', () => {
    cy.wait('@getIngredients');
    cy.get('[data-testid="ingredient-main-1"]').click();
    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="modal-overlay"]').click('topLeft');
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('перетаскивает ингридиенты в конструктор', () => {
    cy.wait('@getIngredients');
    cy.fillConstructor();
  });

  it('неавторизованный пользователь не может создать заказ (переходит на страницу логина)', () => {
    cy.wait('@getIngredients');
    cy.fillConstructor();
    cy.get('[data-testid="order-button"]').click();
    cy.url().should('include', '/login');
  });

  it('авторизованный пользователь может создать заказ (открывается модальное окно с заказом)', () => {
    window.localStorage.setItem('accessToken', 'test-token');
    cy.intercept('GET', `${BASE_URL}/auth/user`, {
      fixture: 'user.json',
    }).as('login');
    cy.wait('@getIngredients');
    cy.fillConstructor();
    cy.get('[data-testid="order-button"]').click();
    cy.intercept('POST', `${BASE_URL}/orders`, {
      fixture: 'order.json',
    }).as('postOrder');
    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="modal-overlay"]').click('topLeft');
    cy.get('[data-testid="modal"]').should('not.exist');
  });
});
