describe('Customer', () => {
  it('Signs a customer in', () => {
    cy.visit('http://localhost:3001/customer/')

    cy.get('#customer-email').type(Cypress.env('customer_email'))
    cy.get('#customer-password').type(Cypress.env('customer_password'))
    cy.get('#market1-get-token').click()
    cy.get('#customer1-token').should('not.be.empty')
    cy.get('#customer1-is-logged-in').should('have.text', 'true')

    cy.get('#market2-get-token').click()
    cy.get('#guest-token').should('not.be.empty')
    cy.get('#customer2-token').should('be.empty')
    cy.get('#customer2-is-logged-in').should('have.text', 'false')
  })
})
