// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Import Tailwind CSS and global styles
import '../../src/index.css'

import { mount } from 'cypress/react18'

// Add any global context providers your components need
const customMount = (component: React.ReactNode, options = {}) => {
  // Wrap your component with any necessary providers (Theme, Router, etc.)
  const wrapped = component
  // Example with providers:
  // const wrapped = (
  //   <ThemeProvider>
  //     <RouterProvider>
  //       {component}
  //     </RouterProvider>
  //   </ThemeProvider>
  // )
  
  return mount(wrapped, options)
}

Cypress.Commands.add('mount', customMount)

// Example use:
// cy.mount(<MyComponent />)