/// <reference types="cypress" />
import React from 'react'
import { Banner, BannerProps } from '../../src/components/Banner/Banner'

describe('Banner Component', () => {
  const defaultProps: BannerProps = {
    id: 'test-banner',
    message: 'Test message',
    type: 'info',
    actionText: 'Action',
    onAction: () => {},
    onDismiss: () => {},
  }

  it('renders with correct structure and styling', () => {
    const onAction = cy.stub().as('onAction')
    const onDismiss = cy.stub().as('onDismiss')
    cy.mount(<Banner {...defaultProps} onAction={onAction} onDismiss={onDismiss} />)

    // Check basic structure
    cy.get('[data-cy="banner"]')
      .should('exist')
      .and('have.attr', 'role', 'alert')

    // Verify icon exists
    cy.get('[data-cy="banner-icon"]').should('exist')

    // Verify message
    cy.get('[data-cy="banner-message"]')
      .should('contain.text', defaultProps.message)
  })

  it('handles different banner types correctly', () => {
    // Test warning type
    cy.mount(<Banner {...defaultProps} type="warning" />)
    cy.get('[data-cy="banner"]').should('have.class', 'bg-amber-50/20')
    
    // Test info type
    cy.mount(<Banner {...defaultProps} type="info" />)
    cy.get('[data-cy="banner"]').should('have.class', 'bg-blue-50/20')
    
    // Test critical type
    cy.mount(<Banner {...defaultProps} type="critical" />)
    cy.get('[data-cy="banner"]').should('have.class', 'bg-red-50/20')
  })

  it('handles action button correctly', () => {
    const onAction = cy.stub().as('onAction')
    cy.mount(<Banner {...defaultProps} onAction={onAction} />)
    
    cy.get('[data-cy="banner-action"]').click()
    cy.get('@onAction').should('have.been.calledOnce')
  })

  it('handles dismiss button correctly', () => {
    const onDismiss = cy.stub().as('onDismiss')
    cy.mount(<Banner {...defaultProps} onDismiss={onDismiss} />)
    
    cy.get('[data-cy="banner-dismiss"]').click()
    cy.get('@onDismiss').should('have.been.calledOnce')
  })

  it('renders without action button when no action provided', () => {
    const propsWithoutAction = { ...defaultProps, actionText: undefined, onAction: undefined }
    cy.mount(<Banner {...propsWithoutAction} />)
    
    cy.get('[data-cy="banner-action"]').should('not.exist')
  })

  it('renders without dismiss button when no onDismiss provided', () => {
    const propsWithoutDismiss = { ...defaultProps, onDismiss: undefined }
    cy.mount(<Banner {...propsWithoutDismiss} />)
    
    cy.get('[data-cy="banner-dismiss"]').should('not.exist')
  })

  it('supports dark mode styling', () => {
    cy.mount(
      <div className="dark">
        <Banner {...defaultProps} />
      </div>
    )
    
    // Verify dark mode classes are applied
    cy.get('[data-cy="banner"]').should('have.class', 'dark:bg-blue-900/10')
    cy.get('[data-cy="banner-message"]').should('have.class', 'dark:text-blue-200')
  })

  it('maintains responsive layout', () => {
    cy.mount(<Banner {...defaultProps} />)
    
    // Test mobile layout
    cy.viewport('iphone-6')
    cy.get('[data-cy="banner"]').should('have.class', 'w-11/12')
    cy.get('[data-cy="banner"]').within(() => {
      cy.get('div').first().should('have.class', 'px-4') // mobile padding
    })
    
    // Test desktop layout
    cy.viewport(1024, 768)
    cy.get('[data-cy="banner"]').should('have.class', 'sm:w-2/4')
    cy.get('[data-cy="banner"]').within(() => {
      cy.get('div').first().should('have.class', 'sm:px-6') // desktop padding
    })
  })

  it('is accessible', () => {
    cy.mount(<Banner {...defaultProps} />)
    cy.get('[data-cy="banner"]').should('have.attr', 'role', 'alert')
    cy.get('[data-cy="banner-action"]').should('have.attr', 'aria-label')
    cy.get('[data-cy="banner-dismiss"]').should('have.attr', 'aria-label')
  })
})
