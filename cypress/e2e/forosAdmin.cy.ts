beforeEach(() => {
    cy.login("testE2Eadmin@gmail.com", "testE2EadmintestE2Eadmin")
})

describe('foros test', () => {
    const num = Math.floor(Math.random() * 100000)

    it('passes', () => {
        cy.visit("admin/foros")
    })

    it('create forum', () => {
        cy.visit("admin/foros")
        cy.get('button[name="createForumDialog"]').click()
        cy.get('input[id="title"]').type('Test forum' + num)
        cy.get('input[id="description"]').type('Test forum description' + num)
        cy.get('button[name="createForum"]').click()
        cy.get('input[id="search-dropdown"]').should('exist').clear().type('Test forum'+num)
        cy.get('div[name="forum"]').should("have.length", 1).should('contain.text', `Test forum`+num)
    })

    it('edit forum', () => {
        cy.visit("admin/foros")
        cy.get('input[id="search-dropdown"]').should('exist').type('Test forum'+num)
        cy.get('div[name="forum"]').should("have.length", 1).should('contain.text', `Test forum`+num).first().within(() => {
            cy.get('button[name="editForumDialog"]').should('exist').click()
        })
        cy.get('input[name="titleEdit"]').clear().type('Test forum edited' + num)
        cy.get('input[name="descriptionEdit"]').clear().type('Test forum description edited' + num)
        cy.get('button[name="editForum"]').click()
        cy.get('input[id="search-dropdown"]').should('exist').clear().type('Test forum'+num)
        cy.get('div[name="forum"]').should("have.length", 0)
        cy.get('input[id="search-dropdown"]').should('exist').clear().type('Test forum edited'+num)
        cy.get('div[name="forum"]').should("have.length", 1).should('contain.text', `Test forum edited`+num)
    })

    it('delete forum', () => {
        cy.visit("admin/foros")
        cy.get('input[id="search-dropdown"]').should('exist').clear().type('Test forum edited'+num)
        cy.get('div[name="forum"]').should("have.length", 1).should('contain.text', `Test forum edited`+num).first().within(() => {
            cy.get('button[name="editForumDialog"]').should('exist').click()
        })
        cy.get('button[name="deleteForum"]').click()
        cy.get('input[id="search-dropdown"]').should('exist').clear().type('Test forum edited'+num)
        cy.get('div[name="forum"]').should("have.length", 0)
    })

})