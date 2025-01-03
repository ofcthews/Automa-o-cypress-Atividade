/// <reference types="cypress" />

// Constantes para seletores e mensagens
const URL_LOGIN = 'http://lojaebac.ebaconline.art.br/minha-conta/';
const SELECTORS = {
    username: '#username',
    password: '#password',
    loginButton: '.woocommerce-form > .button',
    accountGreeting: '.woocommerce-MyAccount-content > :nth-child(2)',
    errorMessage: '.woocommerce-error > li',
};
const MESSAGES = {
    invalidUser: 'Erro: O usuário Mathews.teste@.com não está registrado neste site. Se você não está certo de seu nome de usuário, experimente o endereço de e-mail.',
    invalidPassword: 'Erro: A senha fornecida para o e-mail Mathews.teste@teste.com está incorreta. Perdeu a senha?',
};

describe('Funcionalidade Login', () => {
    beforeEach(() => {
        cy.visit(URL_LOGIN);
    });

    afterEach(() => {
        cy.screenshot();
    });

    it('Deve fazer login com sucesso', () => {
        cy.get(SELECTORS.username).as('campoUsuario').type('Mathews.teste@teste.com');
        cy.get(SELECTORS.password).as('campoSenha').type('Mathews3012');
        cy.get(SELECTORS.loginButton).as('botaoLogin').click();
        cy.get(SELECTORS.accountGreeting)
            .should('contain', 'Olá, mathews.teste (não é mathews.teste? Sair)');
    });

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get(SELECTORS.username).type('Mathews.teste@.com'); // Usuário inválido
        cy.get(SELECTORS.password).type('Mathews3012');
        cy.get(SELECTORS.loginButton).click();

        // Valida a mensagem de erro para usuário inválido
        cy.get(SELECTORS.errorMessage)
            .should('exist')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.eq(MESSAGES.invalidUser);
            });
    });

    it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get(SELECTORS.username).type('Mathews.teste@teste.com');
        cy.get(SELECTORS.password).type('Mathews302'); // Senha inválida
        cy.get(SELECTORS.loginButton).click();

        // Valida a mensagem de erro para senha inválida
        cy.get(SELECTORS.errorMessage)
            .should('exist')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.eq(MESSAGES.invalidPassword);
            });
    });
});
