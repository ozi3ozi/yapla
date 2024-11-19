/// <reference types="cypress" />
import React from 'react'
import ThemeToggle from '../../src/components/ThemeToggle'

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    // Reset theme state
    localStorage.setItem('theme', 'light')
    document.documentElement.classList.remove('dark')
    cy.mount(<ThemeToggle />)
  })

  it('renders essential elements', () => {
    cy.get('[data-cy="theme-toggle"]')
      .should('be.visible')
      .and('have.attr', 'aria-label', 'Toggle theme')
    cy.get('[data-cy="theme-toggle-icon"]')
      .should('be.visible')
  })

  it('handles theme switching', () => {
    // Initial light theme
    cy.get('html')
      .should('not.have.class', 'dark')
    cy.window().its('localStorage.theme')
      .should('eq', 'light')

    // Switch to dark theme
    cy.get('[data-cy="theme-toggle"]').click()
    cy.get('html')
      .should('have.class', 'dark')
    cy.window().its('localStorage.theme')
      .should('eq', 'dark')

    // Switch back to light theme
    cy.get('[data-cy="theme-toggle"]').click()
    cy.get('html')
      .should('not.have.class', 'dark')
    cy.window().its('localStorage.theme')
      .should('eq', 'light')
  })
})
