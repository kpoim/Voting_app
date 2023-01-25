/// <reference types="cypress" />

context('Actions', () => {
  let cityOptions;
  let eightyCharactersInput;
  before(() => {
    cy.fixture('city-options').then((options) => {
      cityOptions = options;
    })
    eightyCharactersInput = (() => {
      let text = '';
      for (let i = 0; i < 8; i++) {
          for(let y = 0; y < 10; y++) {
              text = `${text}${y}`;
          }
      }
      return text;
    })();
  })
  beforeEach(() => {
    cy.visit('http://localhost:12506/')
  })

  it('should have empty inputs and disabled buttons in setup screen', () => {
    cy.get('[data-test=title-input]').should('be.empty')
    cy.get('[data-test=new-option-input]').should('be.empty')
    cy.get('[data-test=add-new-option-button]').should('be.disabled')
    cy.get('[data-test=reset-button]').should('be.disabled')
  })


  it('shouldn\'t have any content in the voting and results screen', () => {
    cy.get('[data-test=voting-options-wraper]').should('not.exist')
    cy.get('[data-test=results-chart]').should('not.exist')
  })

  it('should accept a poll question and update voting and results screens', () => {
    const pollQuestion = 'What is the largest city by population?';
    cy.get('[data-test=title-input]')
      .type(pollQuestion)
      .blur()
      .should('have.value', pollQuestion)

    cy.get('[data-test=voting-title]').should('have.text', pollQuestion)
    cy.get('[data-test=results-title]').should('have.text', pollQuestion)
  })

  it('should accept a new option and dislay it in the voting screen', () => {
    console.log(cityOptions)
    cy.get('[data-test=new-option-input]').type(cityOptions[0])
    cy.get('[data-test=add-new-option-button]').should('be.enabled').click()
    cy.get('[data-test=new-option-input]').should('be.empty')

    cy.get(`[data-test=setup-option-${0}] input`).should('have.value', cityOptions[0])

    cy.get('[data-test=voting-options-wraper]').should('exist')
      .children().eq(0).should('have.text', cityOptions[0])
  })

  it('should not allow to vote with less than two options', () => {
    cy.addOptions(2)

    // select the 1st radio button
    cy.selectOption(1)
    cy.get('[data-test=vote-button]').should('be.enabled')

    // remove 2nd option
    cy.get(`[data-test=setup-option-${1}] button`).click()

    cy.get('[data-test=vote-button]').should('be.disabled')
  })

  it('should not allow more that 80 characters in the input fields', () => { 
    function testInputBySelector (selector) {
      cy.get(selector).type(eightyCharactersInput).invoke('val').should('have.length', 80)
      cy.get(selector).type('abc').invoke('val').should('have.length', 80)
      cy.get(selector).should('have.value', eightyCharactersInput)
    }
    testInputBySelector('[data-test=title-input]')

    testInputBySelector('[data-test=new-option-input]')

    cy.get('[data-test=add-new-option-button]').click()
    cy.get('[data-test=setup-option-0] input').clear()
    testInputBySelector('[data-test=setup-option-0] input')
  })

  it('should accept a maximum of 10 options', () => {
    cy.addOptions(10)
    cy.get('[data-test=new-option-input]').should('not.exist')
    cy.get('[data-test=add-new-option-button]').should('not.exist')

    cy.get('[data-test=setup-option-0] button').click()
    cy.get('[data-test=new-option-input]').should('exist')
    cy.get('[data-test=add-new-option-button]').should('exist')
  })

  it('should clear everything on reset', () => {
    cy.addOptions(2)
    cy.selectOption(0)
    cy.vote()

    cy.get('[data-test=results-chart]').should('exist')

    cy.get('[data-test=reset-button]').click().should('be.disabled')

    cy.get('[data-test=voting-options-wraper]').should('not.exist')
    cy.get('[data-test=results-chart]').should('not.exist')
  })

  it('should accept a vote and display the chart', () => {
    cy.addOptions(2)
    cy.selectOption(0)
    cy.vote()

    cy.getChartItem(0).should('have.text', '1')
    cy.getVotedOption(0).should('have.text', cityOptions[0])
  })

  it('should remove options from voting and results screen', () => {
    cy.addOptions(3)
    cy.selectOption(0)
    cy.vote()
    cy.selectOption(1)
    cy.vote()

    // remove 1st option, down to 2 options, 1 item in chart
    cy.get('[data-test=setup-option-0] button').click()
    cy.get('[data-test=voting-options-wraper]').children().should('have.length', 2)
    cy.get('[data-test=results-chart]').children().should('have.length', 1)

    // remove 1st option, down to 1 option, no chart
    cy.get('[data-test=setup-option-0] button').click()
    cy.get('[data-test=results-chart]').should('not.exist')
  })

  it('should highlight the voted option while hovering chart item', () => {
    cy.addOptions(3)
    cy.selectOption(0)
    cy.vote()
    cy.selectOption(1)
    cy.vote()
    cy.selectOption(2)
    cy.vote()

    cy.getChartItem(1).trigger('pointerover')
    cy.getVotedOption(1).should('have.class', 'highlight')
  })

  it('should highlight the chart item while hovering the list item', () => {
    cy.addOptions(3)
    cy.selectOption(0)
    cy.vote()
    cy.selectOption(1)
    cy.vote()
    cy.selectOption(2)
    cy.vote()

    cy.getVotedOption(1).trigger('pointerover')
    cy.getChartItem(1).should('have.class', 'highlight')
  })
})
