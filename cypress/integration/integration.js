describe('Integration', () => {
  it('Caches tokens', () => {
    cy.visit('http://localhost:3001/integration/')

    cy.get('#no-market-get-token').click()
    cy.get('#no-market-integration-token').should('not.be.empty')

    cy.get('#market1-get-token').click()
    cy.get('#market1-integration-token').should('not.be.empty')

    cy.get('#market2-get-token').click()
    cy.get('#market2-integration-token').should('not.be.empty')

    cy.get('#market1-clone-get-token').click()
    cy.get('#market1-clone-integration-token').should('not.be.empty')

    cy.get('#market1-integration-token')
      .invoke('text')
      .then((market1Token) => {
        return cy
          .get('#market2-integration-token')
          .invoke('text')
          .then((market2Token) => [market1Token, market2Token])
      })
      .then(([market1Token, market2Token]) => {
        return cy
          .get('#market1-clone-integration-token')
          .invoke('text')
          .then((market1CloneToken) => {
            expect(market1Token).not.to.equal(market2Token)
            expect(market1Token).to.equal(market1CloneToken)
          })
      })
  })
})
