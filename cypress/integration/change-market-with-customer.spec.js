describe('Change market', () => {
  it('Caches tokens', () => {
    cy.visit('http://localhost:3001/change-market-with-customer/')

    // cy.intercept('POST', 'https://**.commercelayer.io/oauth/token').as(
    //   'getToken',
    // )
    cy.intercept('POST', 'https://**.commercelayer.io/oauth/token').as(
      'getToken',
    )
    // cy.wait('@getToken')
    cy.wait('@getToken')

    cy.get('#market1-guest-token')
      .invoke('text')
      .then((market1Token) => {
        expect(market1Token).to.exist

        cy.get('#market2-guest-token')
          .invoke('text')
          .then((market2Token) => {
            expect(market2Token).to.exist
            expect(market2Token).to.not.equal(market1Token)

            cy.get('#market1-clone-guest-token')
              .invoke('text')
              .then((market1CLoneToken) => {
                expect(market1CLoneToken).to.exist
                expect(market1CLoneToken).to.equal(market1Token)
              })
          })
      })
  })
})
