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
const url = 'http://localhost:4321/'

Cypress.Commands.add('login', (email, password) => {
    // (you can use the authentication via API request)
    cy.session([email, password], () => {

      cy.visit("login")

      cy.get('input[name="email"]').type(email)
      cy.get('input[name="password"]').type(password)
      cy.get('button[type="submit"]').click()
      cy.url().should('match', new RegExp(`^${url}(mapa|admin)$`), { timeout: 20000 })

    })
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<Response<any>>
    }
  }
}

