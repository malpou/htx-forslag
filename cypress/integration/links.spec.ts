/// <reference types="Cypress" />

describe('Frontpage', () => {
    it('login btn should navigate to the login page', () => {
        // Start from the index page
        cy.visit('/')

        // Find a link with an href attribute containing "about" and click it
        cy.get("#btn-login").click()

        // The new url should include "/enter"
        cy.url().should('include', '/enter')
    })

    it('logo should navigate back to home pagpe', () => {
        // Start from the index page
        cy.visit('/enter')

        // Find logo and click it
        cy.get(".btn-logo").click()

        // The new url should include "/"
        cy.url().should('include', '/')
    })
})