/// <reference types="cypress" />

describe('Allowance Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="mock-connect-button"]').click();
  });

  it('should connect wallet and show address', () => {
    cy.get('[data-testid="mock-wallet-address"]').should('contain', '0x14Df18359448ADdC29c39538DCF07D7baBC75537');
  });

  it('should validate spender address', () => {
    cy.get('[data-testid="toggle-DAI"]').click();
    cy.get('[data-testid="spender-input"]').type('invalid-address');
    cy.get('[data-testid="button-check"]').click();
    cy.contains('Invalid spender address');
  });

  it('should show spender address allowance', () => {
    cy.get('[data-testid="toggle-DAI"]').click();
    cy.get('[data-testid="spender-input"]').type('0x1234567890123456789012345678901234567890');
    cy.get('[data-testid="button-check"]').click();
  });
});
