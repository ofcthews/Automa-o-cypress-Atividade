/// <reference types="cypress" />

const perfil = require('../../fixtures/perfil.json');
const URL_LOGIN = 'http://lojaebac.ebaconline.art.br/minha-conta/';
const SELECTORS = {
    username: '#username',
    password: '#password',
    loginButton: '.woocommerce-form > .button',
    accountGreeting: '.woocommerce-MyAccount-content > :nth-child(2)',
    errorMessage: '.woocommerce-error > li',
};

describe('Funcionalidade Login', () => {
    beforeEach(() => {
        cy.visit(URL_LOGIN); // Corrigido
    });

    afterEach(() => {
        cy.screenshot();
    });

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('Mathews.teste@teste.com');
        cy.get('#password').type('Mathews3012');
        cy.get('.woocommerce-form > .button').click();
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, mathews.teste (não é mathews.teste? Sair')
        
    });

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('Mathews.teste@.com'); // Usuário inválido
        cy.get('#password').type('Mathews3012');
        cy.get('.woocommerce-form > .button').click();

        // Valida a mensagem de erro para usuário inválido
        cy.get(SELECTORS.errorMessage)
            .should('exist')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.eq(MESSAGES.invalidUser);
            });
    });

    it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
       cy.get('#username').type('Mathews.teste@teste.com');
       cy.get('#password').type('Mathews302'); // Senha inválida
       cy.get('.woocommerce-form > .button').click();

        // Valida a mensagem de erro para senha inválida
        cy.get(SELECTORS.errorMessage)
            .should('exist')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.eq(MESSAGES.invalidPassword);
            });
    });

    it('Deve fazer login com sucesso - usando massa de dados', () => {
        cy.get('#username').type(perfil.usuario);
        cy.get('#password').type(perfil.senha);
        cy.get('.woocommerce-form > .button').click();
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, mathews.teste (não é mathews.teste? Sair')

    });

    it('Deve fazer login com sucesso - usando fixture', () => {
        cy.fixture('perfil').then((dados) => { // Corrigido
            cy.get('#username').type(perfil.usuario);
            cy.get('#password').type(perfil.senha);
            cy.get('.woocommerce-form > .button').click();
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, mathews.teste (não é mathews.teste? Sair')
    
        });
    });

    it.only('Deve fazer login com sucesso usando comandos customizados',  () => {

        cy.login('Mathews.teste@teste.com','Mathews3012')
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, mathews.teste (não é mathews.teste? Sair')

    });
});
