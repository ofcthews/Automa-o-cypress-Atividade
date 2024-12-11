/// <reference types="cypress" />

describe('Funcionalidade Login', () => {
    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/');
    });

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('Mathews.teste@teste.com');
        cy.get('#password').type('Mathews3012');
        cy.get('.woocommerce-form > .button').click();
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)')
            .should('contain', 'Olá, mathews.teste (não é mathews.teste? Sair)');
    });
    
    afterEach(() => {
        cy.screenshot()
    });

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('Mathews.teste@.com'); // Usuário inválido
        cy.get('#password').type('Mathews3012');
        cy.get('.woocommerce-form > .button').click();

        // Verifica se a mensagem de erro existe e valida o texto correto
        cy.get('.woocommerce-error > li', { timeout: 10000 })
            .should('exist')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.eq(
                    'Erro: O usuário Mathews.teste@.com não está registrado neste site. Se você não está certo de seu nome de usuário, experimente o endereço de e-mail.'
                );
            });
    });

    it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('Mathews.teste@teste.com');
        cy.get('#password').type('Mathews302'); // Senha inválida
        cy.get('.woocommerce-form > .button').click();

        // Verifica se a mensagem de erro existe e valida o texto correto
        cy.get('.woocommerce-error > li', { timeout: 10000 })
            .should('exist')
            .invoke('text')
            .then((text) => {
                expect(text.trim()).to.eq(
                    'Erro: A senha fornecida para o e-mail Mathews.teste@teste.com está incorreta. Perdeu a senha?'
                );
            });
    });
});

