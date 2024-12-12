/// <reference types="cypress" />

describe('funcionabilidade: Produtos ', () => {

    beforeEach(() => {
        
        cy.visit('http://lojaebac.ebaconline.art.br/produtos/')
    });

    it('deve selecionar um produto da lista', () => {

        cy.get('.products > .row')
            //.first()
            //.last()
            //.eq(2)
            .contains('Argus All-Weather Tank')
            .click()

            cy.get('#tab-title-description > a').should('contain' , 'Descrição')
        
    });
});