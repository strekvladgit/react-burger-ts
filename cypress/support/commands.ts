import type {} from './cypress';
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

Cypress.Commands.add('dragAndDrop', (sourceSelector, targetSelector) => {
  cy.get(sourceSelector).trigger('dragstart');
  cy.get(targetSelector).trigger('dragover').trigger('drop', { force: true });
});

Cypress.Commands.add('fillConstructor', () => {
  cy.dragAndDrop(
    '[data-testid="ingredient-bun-1"]',
    '[data-testid="constructor-drop-area"]'
  );
  cy.dragAndDrop(
    '[data-testid="ingredient-main-1"]',
    '[data-testid="constructor-drop-area"]'
  );
  cy.dragAndDrop(
    '[data-testid="ingredient-sauce-2"]',
    '[data-testid="constructor-drop-area"]'
  );
});
