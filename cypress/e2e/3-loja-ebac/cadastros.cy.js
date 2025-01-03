/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Funcionalidade: cadastro ', () => {

    beforeEach(() => {

        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
        
    });
    
    
it('Deve completar o cadastro com sucesso - usando variaveis', () => {

    var nome = faker.person.firstName() //(firstName) para prieiro nome 
    var email = faker.internet.email(nome) 
    var sobrenome = faker.person.lastName() //(lastName) para sobre nome

    cy.get('#reg_email').type(email)
    cy.get('#reg_password').type(faker.internet.password())
    cy.get(':nth-child(4) > .button').click()
    cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')
    cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
    cy.get('#account_first_name').type(nome)
    cy.get('#account_last_name').type(sobrenome)
    cy.wait(5000)
    cy.get('.woocommerce-Button').click()
    cy.get('.woocommerce-message').should('contain' , 'Detalhes da conta modificados com sucesso.')

   });
 
  
});