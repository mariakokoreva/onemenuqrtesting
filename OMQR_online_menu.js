const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
    /* returning false here prevents Cypress from failing the test */
    if (resizeObserverLoopErrRe.test(err.message)) {
        return false
    }
})
describe('OneMenu QR Online Menu', () => {

    it('should open online menu, chceck there are some products and check there is no button Objednat ', () => {

        cy.visit ('https://table.one-test.cz/storyous-5e6dee68e2b89e0015a89922-60bf2decbfa07d0015d1954c/27/Menu');
        //check there are some products
        //cy.contains('Káva').click({ force: true });
        //check other category
        //cy.contains('Dezert').click({ force: true });
        //scroll the page down and up
        //check there is no button Objednat
        //cy.get('button').contains('Objednat').should('not.exist');
    });

})