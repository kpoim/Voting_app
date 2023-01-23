/// <reference types="cypress" />

import cityOptions from "../fixtures/city-options"

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
const customCommands = {
    'addOptions': (count) => {
        // @ts-ignore
        for (let i = 0; i < count; i++) {
            cy.get('[data-test=new-option-input]').type(cityOptions[i])
            cy.get('[data-test=add-new-option-button]').click()
        }
    },
    'selectOption': (index) => cy.get(`[data-test=voting-options-wraper] input[type=radio]`).eq(index).click(),
    'vote': () => cy.get('[data-test=vote-button]').click(),
    'getChartItem': (index) => cy.get('[data-test=results-chart]').children().eq(index),
    'getVotedOption': (index) => cy.get('[data-test=voted-options]').children().eq(index)
}
Cypress.Commands.addAll(customCommands);

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }