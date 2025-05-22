const BASE_URL = 'http://localhost:4321/';

describe('Edit User Page Tests', () => {
  beforeEach(() => {
    
    cy.login("testE2E@gmail.com", "testE2EtestE2E")
    cy.visit('/editar-perfil'); // Cambia si tu ruta es diferente
  });

  // Test de carga inicial y encabezado
  it('should display the edit user page with correct header', () => {
    cy.get('h2')
      .should('contain', 'Edita tu cuenta de AgroNET')
      .and('have.class', 'font-bold')
      .and('have.class', 'text-gray-900');
  });


  // Test de formulario de edición de datos básicos
  it('should display the user info form with correct fields', () => {
    cy.get('input[name="username"]')
      .should('have.value', 'testE2E')
      .and('have.class', 'bg-white');

    cy.get('select[name="role"]')
      .should('contain', 'Agricultor pequeño')
      .and('contain', 'Agricultor mediano');

    cy.get('select[name="autonomousCommunity"]')
      .should('contain', 'Madrid')
      .and('contain', 'Cataluña');
  });

  // Test de formulario de contraseña
  it('should display password change form with validation', () => {
    cy.get('input[name="old-password"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('input[name="confirm-password"]').should('exist');

    // Validación negativa
    cy.get('input[name="password"]').type('123');
    cy.get('input[name="confirm-password"]').type('456');
    cy.get('form').eq(2).submit();

    cy.contains('La contraseña debe tener al menos 8 caracteres y coincidir');
  });

  

  // Test de responsividad
  it('should be responsive on multiple screen sizes', () => {
    const viewports = [
      [1280, 720], // desktop
      [768, 1024], // tablet
      [375, 667]   // mobile
    ];

    viewports.forEach(([w, h]) => {
      cy.viewport(w, h);
      cy.get('h2').should('be.visible');
      cy.get('form').should('exist');
    });
  });

  

  // Test de performance de carga
  it('should load edit-user page quickly', () => {
    cy.visit('/editar-perfil', { timeout: 10000 });

    cy.get('h2', { timeout: 5000 }).should('be.visible');
    cy.get('form', { timeout: 5000 }).should('have.length.at.least', 1);
  });

  // Test de subida de imagen de perfil
  it('should upload profile image successfully', () => {
    cy.intercept('POST', '/api/upload', { statusCode: 200, body: { imageUrl: '/images/nueva.jpg' } }).as('upload');
    cy.get('input[type="file"][name="photo"]')
      .selectFile('cypress/fixtures/profile.jpg', { force: true });
    cy.get('form').eq(0).submit();
    cy.url().should('include', '/mapa');

  });

  // Test de edición de datos básicos
  it('should edit user basic info successfully', () => {
    cy.intercept('POST', '/api/edit-user', { statusCode: 200 }).as('editUser');
    cy.get('input[name="username"]').clear().type('testE2E');
    cy.get('select[name="role"]').select('Agricultor mediano');
    cy.get('select[name="autonomousCommunity"]').select('Aragón');
    cy.get('form').eq(1).submit();
    cy.url().should('include', '/mapa');
  });

  // Test de cambio de contraseña y redirección
  it('should change password and redirect to /mapa', () => {
    cy.intercept('POST', '/api/edit-password', { statusCode: 200 }).as('editPass');
    cy.get('input[name="old-password"]').type('testE2EtestE2E');
    cy.get('input[name="password"]').type('testE2EtestE2E');
    cy.get('input[name="confirm-password"]').type('testE2EtestE2E');
    cy.get('form').eq(2).submit();
    cy.url().should('include', '/mapa');
  });

});
