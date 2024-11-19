/// <reference types="cypress" />
import React from 'react'
import { Header } from '../../src/components/Header/Header'

describe('Header Component', () => {
  beforeEach(() => {
    // Reset theme before each test
    localStorage.setItem('theme', 'light')
    cy.mount(<Header />)
  })

  it('renders essential elements', () => {
    cy.get('[data-cy="header"]').should('be.visible')
    cy.get('[data-cy="header-logo"]')
      .should('be.visible')
      .and('have.attr', 'alt', 'Yapla')
    cy.get('[data-cy="theme-toggle"]').should('be.visible')
  })

  it('supports theme switching', () => {
    cy.get('[data-cy="theme-toggle"]').click()
    cy.get('[data-cy="header"]')
      .should('have.class', 'dark:bg-layout-header-dark')
      .and('have.class', 'dark:border-content-border-dark')
    
    // Verify localStorage was updated
    cy.window().then((win) => {
      expect(win.localStorage.getItem('theme')).to.eq('dark')
    })
  })

  it('maintains responsive layout', () => {
    // Mobile view
    cy.viewport('iphone-6')
    cy.get('[data-cy="logo-container"]')
      .should('have.class', 'absolute')
      .and('be.visible')

    // Desktop view
    cy.viewport(1024, 768)
    cy.get('[data-cy="logo-container"]')
      .should('have.class', 'sm:static')
      .and('be.visible')
  })
})