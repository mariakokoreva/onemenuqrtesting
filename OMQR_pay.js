//const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
//Cypress.on('uncaught:exception', (err) => {
    /* returning false here prevents Cypress from failing the test */
    //if (resizeObserverLoopErrRe.test(err.message)) {
        //return false
   // }
//})
describe('OneMenu QR Online Menu', () => {

    it('should open page and pay for the Cappucino ', () => {

        cy.visit ('https://table.one-test.cz/storyous-5e6dee68e2b89e0015a89922-60bf2e44bfa07d0015d19550/30/Payment');
    //find button Zaplatit and click
    cy.get('button[type="button"]').contains('Zaplatit').click({ force: true });
    //confirm payment 55 Kč
    cy.get('a[href="/Payment/Summary"]').click({ force: true });
    // skip tips and click 'Zaplatit kartou online'
    cy.contains('Přejít k platbě').click({ force: true });
    //fill the name
    cy.get('input[name="name"]').type('Maru Testing'); //fill the box 
    //fill e-mail address
    cy.get('input[name="email"]').type('postestingm@gmail.com'); //fill the box
    //agree terms and conditions
    cy.get('[type="checkbox"]').first().check({ force: true });
    //confirm payment
    cy.contains('Přejít k platbě').click({ force: true });
    //transfer to the payment gateway
    //fill card number
    cy.get('input[id="cardnumber"]').type('4125010001000208');
    //fill expiration date
    cy.get('input[id="expiry"]').type('1121',{ force: true });
    //fill cvc
    cy.get('input[id="cvc"]').type('111',{ force: true });
    //finish payment
    cy.contains('Zaplatit').click({ force: true });
    //waiting for the transfer back to the menu page
    cy.wait(2000);
    //verification 
    cy.url().should('include', 'iplatebnibrana.csob');
    //payment finishing
    cy.get('h1').should('contain', 'ACS server simulator');
    cy.wait(9000);
    //check the customer is back on the menu page
    cy.url().should('include', 'table.one-test.cz');
    //check message 'Platba úspěšně proběhla'
    cy.get('div[role="alert"]')
    .should('contain','Platba úspěšně proběhla');
});

})