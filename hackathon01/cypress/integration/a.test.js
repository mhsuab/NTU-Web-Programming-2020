/// <reference types="cypress" />

describe("Test A", () => {
    it('Test four weeks', () => {
        cy.visit('index.html')
        cy.get('.Cal-content-row').should('have.length',4)
    })
    // it('Test hover', () => {
    //     cy.visit('index.html')
    //     cy.get('.date').eq(0).trigger('mouseover')
    //     cy.get('.date').eq(0).should('have.css', 'background-color', 'rgba(0, 0, 0, 0.103)')
    // })
    // cypress cannot set :hover pseudo class
    it('Test click', () => {
        cy.visit('index.html')
        cy.get('.date').eq(0).click()
        cy.get('.date').eq(0).should('have.css', 'background-color', 'rgb(0, 0, 0)')
    })
    it('Test add texts', () => {
        cy.visit('index.html')
        cy.get('.date').eq(0).click()
        cy.get('#cal-input').type('hello, world')
        cy.get('#cal-button').click()
        cy.get('.date').eq(0).contains('hello, world')
    })
    it('Test add texts with enter', () => {
        cy.visit('index.html')
        cy.get('.date').eq(0).click()
        cy.get('#cal-input').type('goodbye, world')
        cy.get('#cal-input').type('{enter}')
        cy.get('.date').eq(0).contains('goodbye, world')
    })
    it('Test add texts with specific color', () => {
        cy.visit('index.html')
        cy.get('input[type=color]')
        .invoke('val', '#abcdef')
        .trigger('change')
        cy.get('.date').eq(0).click()
        cy.get('#cal-input').type('color test')
        cy.get('#cal-button').click()
        cy.get('.date').eq(0).contains('color test').should('have.css', 'color', 'rgb(171, 205, 239)')
    })
})