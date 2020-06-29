// / <reference types="Cypress" />

describe('Storefront test data set', () => {
    /**
     * Test requirements:
     * - db `Cypress.env('dbName')` must exist
     * - install.lock must exist
     * - system is setup with the test data set
     */
    it('@storefront: top navigation', () => {
        cy.visit('/');
        cy.debug('1');
        cy.get('.nav > [href="/"]').should('be.visible');
        cy.debug('2');
        cy.get('.nav > [href$="/Frauen/"]').should('be.visible').click();cy.debug('3');
        cy.get('.nav > [href$="/Maenner/"]').should('be.visible').click();cy.debug('4');
        cy.get('.nav > [href$="/Accessoires/"]').should('be.visible').click();cy.debug('5');
        cy.get('.nav > [href$="/Angebote/"]').should('be.visible').click();cy.debug('6');
        cy.get('.nav > [href$="/Unsere-besten-Produkte/"]').should('be.visible').click();cy.debug('7');
        cy.get('.nav > [href$="/Fairtrade/"]').should('be.visible').click();cy.debug('8');
        cy.get('.nav > [href$="/Angebote/"]').click();cy.debug('9');
        cy.debug('10');
        cy.get('.home-link').click();cy.debug('11');
    });

    it('@storefront: put cargohose from cms page into cart', () => {
        cy.visit('/Maenner/Hosen/');cy.debug('12');

        cy.get('.js-cookie-configuration-button > .btn').should('be.visible').click();cy.debug('13');
        cy.get('.offcanvas-cookie > .btn').scrollIntoView().should('be.visible').click();cy.debug('14');

        cy.get('.cms-element-text > h2')
            .contains('Auf der Suche nach einer neuen Hose?')
            .should('be.visible');
        cy.debug('15');
        cy.get('.product-info').contains('Cargo').should('be.visible');cy.debug('16');
        cy.get('.buy-widget > .btn').should('be.visible').click();cy.debug('17');

        cy.get('.offcanvas').should('be.visible');cy.debug('18');
        cy.get('.cart-item-label').contains(/1x.*Cargo/).should('be.visible');cy.debug('19');

        cy.get('.cart-item-remove > .btn').click();cy.debug('20');
        cy.get('.cart-item-label').should('not.be.visible');cy.debug('21');
        cy.get('.alert-info > .alert-content-container > .alert-content')
            .contains('Warenkorb ist leer')
            .should('be.visible');
        cy.debug('22');
        cy.get('.offcanvas').scrollIntoView();cy.debug('23');

        cy.get('body > div.offcanvas.is-right.is-open > button').should('be.visible').click();cy.debug('24');
        cy.get('.offcanvas').should('not.be.visible');cy.debug('25');
    });

    it('@storefront: search cargohose', () => {
        cy.visit('/');cy.debug('26');
        cy.get('input[type="search"]').should('be.visible').clear().type('cargohose{enter}');cy.debug('27');

        cy.get('.search-headline').contains('cargohose').should('be.visible');cy.debug('28');
        cy.get('.search-headline').contains('1 Produkt').should('be.visible');cy.debug('29');

        cy.get('.product-info').contains('Cargo').should('be.visible');cy.debug('30');
    });

    it('@storefront: search cargohose downarrow enter', () => {
        cy.visit('/');cy.debug('31');

        cy.get('input[type="search"]').should('be.visible').clear().type('cargohose');cy.debug('32');
        cy.get('.search-suggest-product-link').should('be.visible');cy.debug('33');
        cy.get('input[type="search"]').type('{downarrow}{enter}');cy.debug('34');

        cy.get('.product-detail-name').contains('Cargohose').should('be.visible');cy.debug('35');
        cy.get('.h3.product-detail-description-title')
            .contains(/Produktinformationen.*Cargohose/)
            .should('be.visible');
        cy.debug('36');
        cy.get('.btn-buy').should('be.visible');cy.debug('37');
    });
});
