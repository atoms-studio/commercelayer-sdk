describe('Basic', () => {
  it('Fetches a sku', () => {
    cy.visit('http://localhost:3001/basic/')
    // cy.intercept('POST', 'https://**.commercelayer.io/oauth/token').as(
    //   'getToken',
    // )
    cy.intercept('GET', 'https://**.commercelayer.io/api/skus').as('getSku')
    // cy.wait('@getToken')
    cy.wait('@getSku')

    cy.get('#guest-token')
      .invoke('text')
      .then((text) => {
        expect(text).to.exist
      })

    cy.get('#sku-id')
      .invoke('text')
      .then((text) => {
        expect(text).to.exist
      })
  })
})
