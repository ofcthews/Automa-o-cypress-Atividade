/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Funcionalidade: Cadastro de usuário', () => {
  beforeEach(() => {
    // Acesse a página de cadastro
    cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/');
  });

  it('Deve completar o cadastro com sucesso usando variáveis dinâmicas', () => {
    // Gera dados dinâmicos usando o faker
    const nome = faker.person.firstName();
    const sobrenome = faker.person.lastName();
    const email = faker.internet.email(nome);
    const senha = faker.internet.password();

    // Preencha o formulário de registro
    cy.get('#reg_email').as('campoEmail').type(email);
    cy.get('#reg_password').as('campoSenha').type(senha);
    cy.get(':nth-child(4) > .button').as('botaoRegistrar').click();

    // Valide o sucesso do registro
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist');

    // Atualize os detalhes da conta
    cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').as('linkEditarConta').click();
    cy.get('#account_first_name').as('campoNome').clear().type(nome);
    cy.get('#account_last_name').as('campoSobrenome').clear().type(sobrenome);
    cy.get('.woocommerce-Button').as('botaoSalvar').click();

    // Valide o sucesso da atualização
    cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.');
  });
});
