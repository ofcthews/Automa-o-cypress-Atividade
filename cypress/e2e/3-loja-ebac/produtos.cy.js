/// <reference types="cypress" />

describe('Funcionalidade: Produtos', () => {

    // Antes de cada teste, visita a página de produtos
    beforeEach(() => {
        cy.visit('produtos');
    });

    it('Deve selecionar um produto da lista e verificar a descrição', () => {
        // Seleciona o produto com base no texto e clica nele
        cy.get('.products > .row')
            .contains('Argus All-Weather Tank')
            .click();

        // Verifica se a aba de descrição contém o texto "Descrição"
        cy.get('#tab-title-description > a').should('contain', 'Descrição');
    });
});