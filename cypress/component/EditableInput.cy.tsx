/// <reference types="cypress" />
import { EditableInput } from '../../src/components/Dashboard/components/EditableInput'

describe('EditableInput Component', () => {
  const defaultProps = {
    value: 'Test Value',
    onChange: () => true,
  }

  it('renders with initial value in non-editing mode', () => {
    const onChange = cy.stub().as('onChange')
    cy.mount(<EditableInput {...defaultProps} onChange={onChange} />)
    
    cy.get('[data-cy="editable-input"]')
      .should('have.value', defaultProps.value)
      .should('have.class', 'bg-transparent')
      .should('have.attr', 'aria-label', 'Click to edit value')
      .should('have.attr', 'readOnly')

    cy.get('[data-cy="editable-input-edit"]')
      .should('exist')
      .should('have.attr', 'aria-label', 'Edit value')
  })

  it('enters edit mode on click with correct UI changes', () => {
    const onChange = cy.stub().as('onChange')
    cy.mount(<EditableInput {...defaultProps} onChange={onChange} />)
    
    cy.get('[data-cy="editable-input"]').click()
    
    // Verify edit mode UI
    cy.get('[data-cy="editable-input"]')
      .should('have.class', 'bg-white')
      .should('have.attr', 'aria-label', 'Edit value')
      .should('not.have.attr', 'readOnly')
    
    // Verify action buttons
    cy.get('[data-cy="editable-input-submit"]')
      .should('exist')
      .and('have.attr', 'aria-label', 'Submit changes')
    
    cy.get('[data-cy="editable-input-cancel"]')
      .should('exist')
      .and('have.attr', 'aria-label', 'Cancel changes')
  })

  it('handles successful value changes', () => {
    const onChange = cy.stub().returns(true).as('onChange')
    cy.mount(<EditableInput {...defaultProps} onChange={onChange} />)
    
    const newValue = 'New Value'
    cy.get('[data-cy="editable-input"]').click()
    cy.get('[data-cy="editable-input"]').clear().type(newValue)
    cy.get('[data-cy="editable-input-submit"]').click()
    
    cy.get('@onChange').should('have.been.calledWith', newValue)
    cy.get('[data-cy="editable-input"]')
      .should('have.value', newValue)
      .should('have.attr', 'readOnly')
  })

  it('handles failed validation by reverting to original value', () => {
    // Simulate validation that requires at least 2 characters
    const onChange = cy.stub()
      .callsFake((value: string) => value.trim().length >= 2)
      .as('onChange')
    
    cy.mount(<EditableInput {...defaultProps} onChange={onChange} />)
    
    // Try to submit a single character (fails validation)
    cy.get('[data-cy="editable-input"]').click()
    cy.get('[data-cy="editable-input"]').clear().type('a')
    cy.get('[data-cy="editable-input-submit"]').click()
    
    // Verify onChange was called and value reverted
    cy.get('@onChange').should('have.been.calledWith', 'a')
    cy.get('[data-cy="editable-input"]')
      .should('have.value', defaultProps.value) // Should revert to original value
  })

  it('handles cancellation correctly', () => {
    const onChange = cy.stub().as('onChange')
    cy.mount(<EditableInput {...defaultProps} onChange={onChange} />)
    
    cy.get('[data-cy="editable-input"]').click()
    cy.get('[data-cy="editable-input"]').clear().type('Cancelled Value')
    cy.get('[data-cy="editable-input-cancel"]').click()
    
    cy.get('@onChange').should('not.have.been.called')
    cy.get('[data-cy="editable-input"]')
      .should('have.value', defaultProps.value)
      .should('have.attr', 'readOnly')
  })

  it('handles keyboard interactions', () => {
    const onChange = cy.stub().returns(true).as('onChange')
    cy.mount(<EditableInput {...defaultProps} onChange={onChange} />)
    
    // Test Enter to submit
    const newValue = 'New Value'
    cy.get('[data-cy="editable-input"]').click()
    cy.get('[data-cy="editable-input"]').clear().type(`${newValue}{enter}`)
    
    cy.get('@onChange').should('have.been.calledWith', newValue)
    
    // Test Escape to cancel
    cy.get('[data-cy="editable-input"]').click()
    cy.get('[data-cy="editable-input"]').clear().type('Cancelled Value{esc}')
    
    cy.get('[data-cy="editable-input"]')
      .should('have.value', defaultProps.value)
      .should('have.attr', 'readOnly')
  })

  it('handles empty value submission', () => {
    const onChange = cy.stub().as('onChange')
    cy.mount(<EditableInput {...defaultProps} onChange={onChange} />)
    
    cy.get('[data-cy="editable-input"]').click()
    cy.get('[data-cy="editable-input"]').clear()
    cy.get('[data-cy="editable-input-submit"]').click()
    
    cy.get('@onChange').should('not.have.been.called')
    cy.get('[data-cy="editable-input"]')
      .should('have.value', defaultProps.value)
      .should('have.attr', 'readOnly')

    cy.get('[data-cy="editable-input-edit"]')
    .should('exist')
    .should('have.attr', 'aria-label', 'Edit value')
  })

  it('applies correct styles in different states', () => {
    cy.mount(<EditableInput {...defaultProps} />)
    
    // Check non-editing styles
    cy.get('[data-cy="editable-input-wrapper"]')
      .should('have.class', 'border')
      .should('have.class', 'rounded-lg')
    
    // Check editing styles
    cy.get('[data-cy="editable-input"]').click()
    cy.get('[data-cy="editable-input"]')
      .should('have.class', 'bg-white')
      .should('have.class', 'focus:ring-2')
  })

  it('is accessible', () => {
    cy.mount(<EditableInput {...defaultProps} />)
    
    // Check initial state accessibility
    cy.get('[data-cy="editable-input"]')
      .should('have.attr', 'aria-label', 'Click to edit value')
    
    // Check editing state accessibility
    cy.get('[data-cy="editable-input"]').click()
    cy.get('[data-cy="editable-input"]')
      .should('have.attr', 'aria-label', 'Edit value')
    cy.get('[data-cy="editable-input-submit"]')
      .should('have.attr', 'aria-label', 'Submit changes')
    cy.get('[data-cy="editable-input-cancel"]')
      .should('have.attr', 'aria-label', 'Cancel changes')
  })

  it('maintains responsive layout', () => {
    cy.mount(<EditableInput {...defaultProps} />)
    
    // Test mobile layout
    cy.viewport('iphone-6')
    cy.get('[data-cy="editable-input-wrapper"]')
      .should('have.class', 'border')
    
    // Test desktop layout
    cy.viewport(1024, 768)
    cy.get('[data-cy="editable-input-wrapper"]')
      .should('have.class', 'md:border-none')
  })
})
