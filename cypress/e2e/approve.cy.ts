/// <reference types="cypress" />

describe('Approve Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="mock-connect-button"]').click();
  });

  it('should connect wallet and show address', () => {
    cy.get('[data-testid="mock-wallet-address"]').should('contain', '0x14Df18359448ADdC29c39538DCF07D7baBC75537');
  });

  it('should validate spender address', () => {
    cy.get('[data-testid="toggle-DAI"]').click();
    cy.get('[data-testid="address-input-approve"]').type('invalid-address');
    cy.get('[data-testid="amount-input-approve"]').type('10');
    cy.get('[data-testid="button-approve"]').click();
    cy.contains('Invalid spender address');
  });

  it('should complete a successful approve', () => {
    cy.get('[data-testid="toggle-DAI"]').click();
    cy.get('[data-testid="address-input-approve"]').type('0x1234567890123456789012345678901234567890');
    cy.get('[data-testid="amount-input-approve"]').type('10');

    cy.intercept('POST', '**/https://sepolia.drpc.org/**', {
      statusCode: 200,
      body: { hash: '0xmockedhash', isLoading: false },
    }).as('approveTx');

    cy.intercept('POST', '**/https://sepolia.drpc.org/**', (req) => {
      if (req.body.method === 'eth_getTransactionReceipt') {
        req.reply({
          statusCode: 200,
          body: { result: { status: '0x1' } },
        });
      }
    }).as('mockTxReceipt');

    cy.get('[data-testid="button-approve"]').click();

    cy.wait('@approveTx');
    cy.wait('@mockTxReceipt');

    cy.contains('button', 'Close').click();
  });
});
