const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
    /* returning false here prevents Cypress from failing the test */
    if (resizeObserverLoopErrRe.test(err.message)) {
        return false
    }
})
describe('OneMenu QR Order and Pay several cases', () => {

    it('should order product on OneMenu QR Order & Pay and then pay for it on csob payment gateway', () => {

        cy.visit ('https://table.one-test.cz/storyous-5e6dee68e2b89e0015a89922-60bf2dc4bfa07d0015d1954a/19/Menu');
        //find button Objednat and click
        cy.get('button[type="button"]').contains('Objednat').click({ force: true });
        //confirm order click button('Objednat 50,00 Kč (1 ks)')
        cy.get('a[href="/OrderSummary"]').click({ force: true });
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
        cy.wait(500);
        //transfer to the payment gateway
        //fill card number
        cy.get('input[id="cardnumber"]').type('4125010001000208');
        //ignore error element is covered
        //cy.get('[disabled]').click({force: true}).
        //fill expiration date
        cy.get('input[id="expiry"]').type('1121',{ force: true });
        //fill cvc
        cy.get('input[id="cvc"]').type('111',{ force: true });
        //finish payment
        cy.contains('Zaplatit').click({ force: true });
        //waiting for the transfer back to the menu page
        cy.wait(3000);
        //verification 
        cy.url().should('include', 'iplatebnibrana.csob');
        //payment finishing
        cy.get('h1').should('contain', 'ACS server simulator');
        cy.wait(12000);
        //check the customer is back on the menu page
        cy.url().should('include', 'table.one-test.cz');
        //check message 'Platba úspěšně proběhla'
        cy.get('div[role="alert"]')
        .should('contain','Platba úspěšně proběhla');

        //check waiting for the confirmation;
       // cy.wait(800);
        //cy.get('div[class="font-size-medium q-mb-none text-weight-bold q-my-auto"]')
        //.should('contain','Vaše objednávka čeká na přijetí restauraci');
    });
})
//add case Palce is close 
//should assert 'Omlouváme se, ale podnik nyní objednávky nepřijímá, objednejte si prosím u číšníka.'

// Add click Rozumím