/// <reference types="cypress" />

const customCommands = {
    'addOptions': (count) => {
        for (let i = 0; i < count; i++) {
            cy.fixture('city-options').then(cityOptions => {
                cy.get('[data-test=new-option-input]').type(cityOptions[i])
                cy.get('[data-test=add-new-option-button]').click()
            })}
    },
    'selectOption': (index) => cy.get(`[data-test=voting-options-wraper] input[type=radio]`).eq(index).click(),
    'vote': () => cy.get('[data-test=vote-button]').click(),
    'getChartItem': (index) => cy.get('[data-test=results-chart]').children().eq(index),
    'getVotedOption': (index) => cy.get('[data-test=voted-options]').children().eq(index)
}
Cypress.Commands.addAll(customCommands);
