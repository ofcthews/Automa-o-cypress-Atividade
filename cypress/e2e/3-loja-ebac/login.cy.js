/// <reference types ="cypress"/> 

describe('funcionalidade loin', () => {
    
    it('Deve fazer login com sucesso ', () => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        cy.get('#username').type('Mathews.teste@teste.com')
        cy.get('#password').type('Mathews3012')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain','Olá, mathews.teste (não é mathews.teste? Sair)')
        
    })
});