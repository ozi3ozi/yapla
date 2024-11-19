/// <reference types="cypress" />
import React from 'react'
import { Footer } from '../../src/components/Footer/Footer'
import { SideMenuProvider } from '../../src/context/SideMenuContext'

describe('Footer Component', () => {
  const mountWithProvider = (initialState = { isExpanded: false }) => {
    cy.mount(
      <SideMenuProvider>
        <div className="h-screen">
          <Footer />
        </div>
      </SideMenuProvider>
    )

    // Set the initial state after mounting
    if (initialState.isExpanded) {
      cy.window().its('sideMenuState').invoke('setIsExpanded', true)
    }
  }

  it('renders essential elements with correct accessibility', () => {
    mountWithProvider()
    
    // Check essential structure
    cy.get('[data-cy="footer"]').should('exist')
    
    // Check branding
    cy.get('[data-cy="footer-brand"]')
      .should('contain.text', 'Yapla')
      .should('be.visible')
    
    // Check language selector accessibility
    cy.get('[data-cy="language-selector"]')
      .should('exist')
      .should('have.attr', 'aria-label', 'Select language')
      .and('not.be.disabled')
  })

  it('handles language selection correctly', () => {
    mountWithProvider()
    
    cy.get('[data-cy="language-selector"]')
      .should('have.value', 'en')
      .select('fr')
      .should('have.value', 'fr')
  })

  it('adjusts layout based on SideMenu state', () => {
    // Test collapsed state
    mountWithProvider()
    cy.get('[data-cy="footer"]')
      .should('have.class', 'sm:pl-20')
      .should('not.have.class', 'sm:pl-64')
    
    // Test expanded state
    mountWithProvider({ isExpanded: true })
    cy.get('[data-cy="footer"]').should('have.class', 'sm:pl-64')
  })
})