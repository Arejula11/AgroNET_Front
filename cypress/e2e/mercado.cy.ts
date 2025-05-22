const meses = {
    enero: 0,
    febrero: 1,
    marzo: 2,
    abril: 3,
    mayo: 4,
    junio: 5,
    julio: 6,
    agosto: 7,
    septiembre: 8,
    octubre: 9,
    noviembre: 10,
    diciembre: 11,
  };

beforeEach(() => {
    cy.login("testE2E@gmail.com", "testE2EtestE2E")
})

describe('mercado test', () => {
    it('passes', () => {
        cy.visit("mercado")
        cy.get('div[name="producto"]').should('have.length', 20)

    })

    it('search test', () => {
        cy.visit("mercado")
        cy.get('#search-dropdown').type('arroz')
        cy.get('div[name="producto"]').should('have.length', 7).should('contain.text', 'Arroz')
    })

    it("product test", () => {
        cy.visit("mercado")
        cy.get('#search-dropdown').type('arroz')
        cy.get('div[name="producto"]').filter(':contains("Arroz blanco vaporizado")').first().click()

        const buttons = ['one_month0', 'six_month0', 'one_year0', 'ytd0', 'all0'];

        buttons.forEach((buttonId) => {
            cy.get(`button[id="${buttonId}"]`).click()
            cy.get(`button[id="${buttonId}"]`).within(() => {
                cy.get('div.priceChange0').should('exist')
            }) 
        });

        cy.get('nav[name="pagination"]').should('exist')
        cy.get('button[name="prevPage"]').should('exist')
        cy.get('button[name="nextPage"]').should('exist')
        let firstFecha = new Date();
        let secondFecha = new Date();

        cy.get('button[name="nextPage"]').click()
        cy.get('tbody tr').first().within(() => {
            cy.get('td').eq(1).invoke('text').then((fecha) => {
                const [dia, mesTexto, año] = fecha.replace(/de /g, "").split(" ") as [string, keyof typeof meses, string];
                firstFecha = new Date(Number(año), meses[mesTexto], Number(dia));
            });
        });

        cy.get('button[name="prevPage"]').click()
        cy.get('tbody tr').first().within(() => {
            cy.get('td').eq(1).invoke('text').then((fecha) => {
                secondFecha = new Date(fecha.trim().replace("de ", "").replace("de ", ""));
                expect(firstFecha).to.be.lessThan(secondFecha);
            });
        });

        cy.get('button[name="page"]').its('length').then((length) => {
            expect(length).to.be.greaterThan(0);
        });

        cy.get('button[name="page"]').each(($button) => {
            cy.wrap($button).click();
            cy.get('tbody tr').should('exist'); 
        });
        
        

        
    })

    it('comparator test', () => {
        cy.visit("mercado")
        cy.get('a[href="mercado/comparador"]').click();
        cy.get('button[name="desplegable1"]').click();
        cy.get('span').contains('Trigo duro').click();
        cy.get('button[name="desplegable2"]').click();
        cy.get('span').contains('Maíz grano').click();
        cy.get('h1').should('contain', 'Trigo duro');
        cy.get('h1').should('contain', 'Maíz grano');  
    })
})