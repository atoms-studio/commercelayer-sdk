describe('Refresh token', () => {
  it('Refreshes the token if invalid', () => {
    cy.visit('http://localhost:3001/refresh-token/')

    

    cy.get('#ready').should('have.text', 'ready')

    cy.get('[name="first_name"]').type('John')
    cy.get('[name="last_name"]').type('Doe')
    cy.get('[name="line_1"]').type('Marshall Lane')
    cy.get('[name="city"]').type('Palm Coast')
    cy.get('[name="zip_code"]').type('32137')
    cy.get('[name="state_code"]').type('FL')
    cy.get('[name="country_code"]').type('US')
    cy.get('[name="phone"]').type('1234567890')
    cy.get('#shipping-address').submit()