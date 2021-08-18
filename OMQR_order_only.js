const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
    /* returning false here prevents Cypress from failing the test */
    if (resizeObserverLoopErrRe.test(err.message)) {
        return false
    }
})
describe('OneMenu QR Order without payment', () => {

    it('should order product on OneMenu QR Order ', () => {

        cy.visit ('https://table.one-test.cz/storyous-5e6dee68e2b89e0015a89922-60bf2e1bbfa07d0015d1954e/24/Menu');
        //order item 
        cy.get('button[type="button"]').contains('Objednat').click({ force: true });
        //confirm order summary
        cy.get('a[href="/OrderSummary"]').click({ force: true });
        //confirm order
        cy.contains('Potvrdit').click({ force: true });
        //fill the name
        cy.get('input[name="name"]').type('Maru Testing'); //fill the box 
        // fil e-mail
        cy.get('input[name="email"]').type('postestingm@gmail.com'); //fill the box
        //terms and conditions agreement
        cy.get('[type="checkbox"]').first().check({ force: true });
        //send order
        cy.contains('Odeslat objednávku').click({ force: true });
        //check message 'Objednávka úspěšně proběhla'
        cy.get('div[role="alert"]')
       .should('contain','Objednávka úspěšně proběhla')
       //order is waiting for confirmation 'Vaše objednávka čeká na potvrzení restauraci'
       cy.get('p[class="q-banner__content col text-body2"]')
       .should('contain','Vaše objednávka čeká na potvrzení restauraci')
    });
})
