describe('Checkout', () => {
  it('Completes a checkout flow', () => {
    cy.visit('http://localhost:3001/checkout/')

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

    cy.get('#shipments').should('not.be.empty')

    cy.get('#shipments')
      .find('form')
      .then(function ($forms) {
        $forms.each(function () {
          const $check = Cypress.$(this).find('input[type="radio"]').first()
          const $submit = Cypress.$(this).find('button[type="submit"]').first()
          $check.prop('checked', true)
          $submit.click()
          // Cypress.$(this).submit()
        })
      })

    cy.get('#payments').should('not.be.empty')

    cy.get(
      '#payments #payment-methods input[type="radio"][data-payment-method-type="wire_transfers"]',
    ).check()

    cy.get('#payments #payment-methods button[type="submit"]').click()

    cy.get('#order-status').should('have.text', 'placed')
  })
})
