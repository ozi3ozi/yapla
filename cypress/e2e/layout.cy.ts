describe("Layout", () => {
  beforeEach(() => {
    cy.resetTheme();
    cy.visit("/");
    // Wait for any theme-related operations to complete
    cy.get("html").should("not.have.class", "dark");
  });

  it("renders essential layout elements", () => {
    // Header elements
    cy.get('[data-cy="header"]').should("be.visible");
    cy.get('[data-cy="header-logo"]')
      .should("be.visible")
      .and("have.attr", "alt", "Yapla");
    cy.get('[data-cy="theme-toggle"]').should("be.visible");

    // SideMenu elements
    cy.get('[data-cy="side-menu"]').should("be.visible");
    cy.get('[data-cy^="menu-item menu-item-"]')
      .should("have.length", 5)
      .and("be.visible");

    // Footer elements
    cy.get('[data-cy="footer"]').should("be.visible");
  });

  it("handles theme switching across components", () => {
    // Ensure we start with light theme
    cy.get("html").should("not.have.class", "dark");

    // Switch to dark theme
    cy.get('[data-cy="theme-toggle"]').click();
    cy.get("html").should("have.class", "dark");

    // Verify theme persistence
    cy.reload();
    cy.get("html").should("have.class", "dark");

    // Switch back to light theme
    cy.get('[data-cy="theme-toggle"]').click();
    cy.get("html").should("not.have.class", "dark");
  });

  it("handles side menu expansion and mobile responsiveness", () => {
    // Desktop view - menu should be visible and collapsed by default
    cy.get('[data-cy="side-menu"]')
      .should("be.visible")
      .and("have.class", "w-20");
    cy.get('[data-cy="menu-item-icon"]').should("be.visible");
    cy.get('[data-cy="menu-item-text"]').should("not.be.visible");

    // Expand menu
    cy.get('[data-cy="toggle-expand"]').click();
    cy.get('[data-cy="side-menu"]').should("have.class", "w-64");
    cy.get('[data-cy="menu-item-icon"]').should("be.visible");
    cy.get('[data-cy="menu-item-text"]').should("be.visible");

    // Mobile view
    cy.viewport("iphone-6");
    cy.get('[data-cy="side-menu"]')
      .should("have.class", "-translate-x-full")
      .and("not.be.visible");

    // Open mobile menu
    cy.get('[data-cy="mobile-menu-button"]').click();
    cy.get('[data-cy="side-menu"]')
      .should("have.class", "translate-x-0")
      .and("be.visible");

    // Close mobile menu
    cy.get('[data-cy="mobile-menu-button"]').click();
    cy.get('[data-cy="side-menu"]').should("have.class", "-translate-x-full");
  });

  it("handles navigation and 404 pages", () => {
    // Wait for side menu to be visible
    cy.get('[data-cy="side-menu"]').should("be.visible");

    // Test navigation to unimplemented route
    cy.get('[data-cy="menu-item menu-item-members"]').click();
    cy.url().should("include", "/members");

    // Verify 404 page content
    cy.get("h1").should("contain", "Page non trouvée");

    // Test back to home using the 404 page button
    cy.contains("Retour à l'accueil").click();
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);

    // Verify we're back at dashboard
    cy.get('[data-cy="menu-item menu-item-dashboard"]')
      .should("have.class", "bg-white/10")
      .and("have.class", "text-white");
  });
});
