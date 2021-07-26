describe('Refresh token', () => {
  it('Refreshes the token if invalid', () => {
    cy.visit('http://localhost:3001/refresh-token/')
    cy.get('#sku').should('not.be.empty')
  })
})
