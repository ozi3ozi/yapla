/// <reference types="cypress" />
import React from 'react'
import { SideMenu } from '../../src/components/SideMenu/SideMenu'
import { SideMenuProvider } from '../../src/context/SideMenuContext'
import { BrowserRouter } from 'react-router-dom'

describe('SideMenu Component', () => {
  const mountWithProviders = (activeRoute = '/') => {
    cy.mount(
      <BrowserRouter>
        <SideMenuProvider>
          <SideMenu activeRoute={activeRoute} />
        </SideMenuProvider>
      </BrowserRouter>
    )
  }

  beforeEach(() => {
    // Set desktop viewport by default
    cy.viewport(1024, 768)
    mountWithProviders()
  })

  it('renders essential elements in desktop view', () => {
    cy.get('[data-cy="side-menu"]')
      .should('have.class', '-translate-x-full')
      .and('be.visible')
    cy.get('a[data-cy*="menu-item-"]')
      .should('have.length', 5)
      .and('be.visible')
    cy.get('[data-cy="toggle-expand"]').should('be.visible')
  })

  it('handles menu navigation', () => {
    // Mount with dashboard route
    mountWithProviders('/')
    
    // Test dashboard is active by default
    cy.get('a[data-cy*="menu-item-dashboard"]')
      .should('have.class', 'bg-white/10')
      .and('have.class', 'text-white')

    // Mount with members route
    mountWithProviders('/members')
    cy.get('a[data-cy*="menu-item-members"]')
      .should('have.class', 'bg-white/10')
      .and('have.class', 'text-white')
  })

  it('handles expansion state', () => {
    // Initial collapsed state
    cy.get('[data-cy="side-menu"]')
      .should('have.class', 'w-20')
      .and('not.have.class', 'w-64')

    // Menu icon only should be visible in expanded state
    cy.get('[data-cy="menu-item-text"]').should('not.be.visible')
    cy.get('[data-cy="menu-item-icon"]').should('be.visible')

    // Expand menu
    cy.get('[data-cy="toggle-expand"]').click()
    cy.get('[data-cy="side-menu"]')
      .should('have.class', 'w-64')
      .and('not.have.class', 'w-20')

    // Menu icon and text should be visible in expanded state
    cy.get('[data-cy="menu-item-text"]').should('be.visible')
    cy.get('[data-cy="menu-item-icon"]').should('be.visible')

    // Collapse menu
    cy.get('[data-cy="toggle-expand"]').click()
    cy.get('[data-cy="side-menu"]')
      .should('have.class', 'w-20')
      .and('not.have.class', 'w-64')
  })

  it('maintains mobile responsiveness', () => {
    // Mobile view - menu should be hidden by default
    cy.viewport('iphone-6')
    cy.get('[data-cy="side-menu"]')
      .should('have.class', '-translate-x-full')
      .and('not.be.visible')

    // Show mobile menu
    cy.get('[data-cy="mobile-menu-button"]').click()
    cy.get('[data-cy="side-menu"]')
      .should('have.class', 'translate-x-0')
      .and('be.visible')

    // Hide mobile menu using the same button
    cy.get('[data-cy="mobile-menu-button"]').click()
    cy.get('[data-cy="side-menu"]')
      .should('have.class', '-translate-x-full')
  })
})
