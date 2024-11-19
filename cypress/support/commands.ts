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

/**
 * Set theme command
 * @param theme - 'light' | 'dark'
 */
Cypress.Commands.add('setTheme', (theme: 'light' | 'dark') => {
  cy.window().then((win) => {
    win.localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      cy.get('html').invoke('addClass', 'dark')
    } else {
      cy.get('html').invoke('removeClass', 'dark')
    }
  })
})

/**
 * Reset theme to light mode
 */
Cypress.Commands.add('resetTheme', () => {
  cy.window().then((win) => {
    win.localStorage.setItem('theme', 'light')
    cy.get('html').invoke('removeClass', 'dark')
  })
})

declare global {
  namespace Cypress {
    interface Chainable {
      setTheme(theme: 'light' | 'dark'): Chainable<void>
      resetTheme(): Chainable<void>
    }
  }
}