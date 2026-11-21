/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace -- extensão de tipos do Cypress exige namespace
declare namespace Cypress {
    interface Chainable {
        login(email: string, password: string):Chainable<void>
    }
}

Cypress.Commands.add('login', (username, password) => {
    cy.session([username, password], () =>{
        cy.visit("http://localhost:5173/")
        cy.get('input[type="email"]').type(username)
        cy.get('input[type="password"]').type(password)
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/home')
    })
})