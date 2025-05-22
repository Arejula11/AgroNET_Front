
beforeEach(() => {
    cy.login("testE2Eadmin@gmail.com", "testE2EadmintestE2Eadmin")
})

describe('foros test', () => {
    it('passes', () => {
        cy.visit("admin/mensajes")
    })

    
    it('delete message', () => {
        cy.visit("admin/mensajes")
        cy.get('tr[name="message"]').first().within(() => {
            cy.get('td').eq(1).invoke('text').then((text) => {
                cy.wrap(text).as('message') // Save message for later use
            })
            cy.get('button[name="deleteMessage"]').click()
        })
        cy.get('@message').then((message) => {
            cy.get('tr[name="message"]').first().should('not.contain.text', message)
        })

    })


})