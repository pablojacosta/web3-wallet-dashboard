/// <reference types="cypress" />

describe('Mint Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should connect wallet and show address', () => {
    cy.get('[data-testid="mock-connect-button"]').click();

    cy.get('[data-testid="mock-wallet-address"]').should('contain', '0x14Df18359448ADdC29c39538DCF07D7baBC75537');
  });

  it('should validate mint amount limits', () => {
    cy.get('[data-testid="mock-connect-button"]').click();

    cy.get('[data-testid="toggle-DAI"]').click();

    // Test minimum amount
    cy.get('[data-testid="mint-amount-input"]').type('0.0001');
    cy.get('[data-testid="button-mint"]').click();
    cy.contains('Minting limit not met! You must mint at least 0.01 token per transaction.');
    cy.contains('button', 'Close').click();

    // Test maximum amount
    cy.get('[data-testid="mint-amount-input"]').type('101');
    cy.get('[data-testid="button-mint"]').click();
    cy.contains('Minting limit reached! You can mint up to 100 tokens per transaction.');
    cy.contains('button', 'Close').click();

    // Test valid amount
    cy.get('[data-testid="mint-amount-input"]').type('10');

    cy.intercept('POST', '**/https://sepolia.drpc.org/**', {
      statusCode: 200,
      body: { hash: '0xmockedhash', isLoading: false },
    }).as('mintTx');

    cy.intercept('POST', '**/https://sepolia.drpc.org/**', (req) => {
      if (req.body.method === 'eth_getTransactionReceipt') {
        req.reply({
          statusCode: 200,
          body: { result: { status: '0x1' } },
        });
      }
    }).as('mockTxReceipt');

    cy.get('[data-testid="button-mint"]').click();

    cy.wait('@mintTx');
    cy.wait('@mockTxReceipt');

    cy.contains('button', 'Close').click();
  });
});
