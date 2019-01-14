// https://docs.cypress.io/api/introduction/api.html

describe('Option 1 and option 2 generation', () => {
  before(() => {
    cy.visit('/');
    cy.get('[data-cy="addOption"]').click();
    cy.get('[data-cy="optionExpiries"]').first().type(6);
    cy.get('[data-cy="optionSplitDetails"]').first().click();
  });

  it('generates 6 legs', () => {
    cy.get('[data-cy="optionLeg"]').should('have.length', 6);
  });

  it('inverts call/put', () => {
    cy.get('[data-cy="optionType"]').should('contain', 'call');
    cy.get('[data-cy="legType"]').should('contain', 'put');
    cy.get('[data-cy="optionTypeToggle"]').first().click();
    cy.get('[data-cy="optionType"]').should('contain', 'put');
    cy.get('[data-cy="legType"]').should('contain', 'call');
  });

  it('inverts buy/sell', () => {
    cy.get('[data-cy="optionNotionalTypeToggle"]').should('contain', 'sell');
    cy.get('[data-cy="legNotionalType"]').should('contain', 'buy');
    cy.get('[data-cy="optionNotionalTypeToggle"]').first().click();
    cy.get('[data-cy="optionNotionalTypeToggle"]').should('contain', 'buy');
    cy.get('[data-cy="legNotionalType"]').should('contain', 'sell');
  });
});
