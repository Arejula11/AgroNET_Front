beforeEach(() => {
    cy.login("testE2E@gmail.com", "testE2EtestE2E")
})

describe('foros test', () => {
    it('passes', () => {
        cy.visit("foros")
    })

    it('search forum', () => {
        cy.visit("foros")
        cy.get('input[id="search-dropdown"]').should('exist').type('Test forum')
        cy.get('div[name="forum"]').filter((_, el) => el.textContent?.trim() === "Test forum").first().click()

    })
    const num = Math.floor(Math.random() * 100000)
    const num1 = Math.floor(Math.random() * 100000)
    it('create message', () => {
        cy.visit("foros")
        cy.get('h5').filter((_, el) => el.textContent?.trim() === "Test forum").first().click()
        cy.get('div[name="message"]').should('exist')
        cy.get('textarea[id="messageArea"]').type(`Test message ${num}`)
        cy.get('div[name="createMessage"]').click()
        cy.get('div[name="message"]').should('contain.text', `Test message ${num}`)
    }) 

    it('create message again', () => {
        cy.visit("foros")
        cy.get('h5').filter((_, el) => el.textContent?.trim() === "Test forum").first().click()
        cy.get('div[name="message"]').should('exist')
        cy.get('textarea[id="messageArea"]').type(`Test message ${num1}`)
        cy.get('div[name="createMessage"]').click()
        cy.get('div[name="message"]').should('contain.text', `Test message ${num1}`)
    }) 

    it('edit message', () => {
        cy.visit("foros")
        cy.get('h5').filter((_, el) => el.textContent?.trim() === "Test forum").first().click()
        cy.get('div[name="message"]').should('exist')
        cy.get('div[name="message"]').should('contain.text', `Test message ${num1}`).first().within(() => {
            cy.get('button[name="dropdown"]').click()
            cy.get('button[name="editMessage"]').should('exist')
            cy.get('button[name="editMessage"]').click()
        })
        cy.get('input[name="editMessageInput"]').clear().type(`Test message edited ${num1}`)
        cy.get('button[name="saveMessage"]').click()
        cy.get('div[name="message"]').should('contain.text', `Test message edited ${num1}`)
        cy.get('div[name="message"]').should('not.contain.text', `Test message ${num1}`)

    }) 

    it('delete message', () => {
        cy.visit("foros")
        cy.get('h5').filter((_, el) => el.textContent?.trim() === "Test forum").first().click()
        cy.get('div[name="message"]').should('contain.text', `Test message edited ${num1}`).first().within(() => {
            cy.get('button[name="dropdown"]').click()
            cy.get('button[name="deleteMessage"]').should('exist')
            cy.get('button[name="deleteMessage"]').click()

        }
        )
        cy.get('div[name="message"]').should('not.contain.text', `Test message edited ${num1}`)
    })


})