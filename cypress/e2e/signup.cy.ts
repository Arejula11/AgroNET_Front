
const BASE_URL = 'http://localhost:4321/';

describe('Signup Page Tests', () => {
  beforeEach(() => {
    // Mock reCAPTCHA para evitar problemas en testing
    cy.window().then((win) => {
      win.grecaptcha = {
        ready: (callback) => callback(),
        execute: () => Promise.resolve('test-recaptcha-token')
      };
    });

    cy.visit('/signup');
  });

  // Test de carga inicial y elementos principales
  it('should display the main signup form with correct content', () => {
    // Verificar logo
    cy.get('img[alt="AgroNet"]')
      .should('be.visible')
      .and('have.attr', 'src', '/favicon.svg');

    // Verificar título principal
    cy.get('h2')
      .should('be.visible')
      .and('contain', 'Crea un cuenta en AgroNET')
      .and('have.class', 'text-2xl/9')
      .and('have.class', 'font-bold')
      .and('have.class', 'text-gray-900');

    // Verificar que existe el formulario
    cy.get('form.space-y-6')
      .should('be.visible')
      .and('have.attr', 'method', 'POST');
  });

  // Test de todos los campos del formulario
  it('should display all required form fields with correct labels', () => {
    const expectedFields = [
      { name: 'username', label: 'Nombre de usuario', type: 'text' },
      { name: 'email', label: 'Correo electrónico', type: 'email' },
      { name: 'telephone', label: 'Número de teléfono', type: 'tel' },
      { name: 'password', label: 'Contraseña', type: 'password' },
      { name: 'confirm-password', label: 'Repetir contraseña', type: 'password' }
    ];

    expectedFields.forEach((field) => {
      // Verificar label
      cy.get(`label[for="${field.name}"]`)
        .should('be.visible')
        .and('contain', field.label)
        .and('have.class', 'text-sm/6')
        .and('have.class', 'font-medium')
        .and('have.class', 'text-gray-900');

      // Verificar input
      cy.get(`input[name="${field.name}"]`)
        .should('be.visible')
        .and('have.attr', 'type', field.type)
        .and('have.attr', 'id', field.name)
        .and('have.attr', 'required')
    });
  });


  // Test del botón de registro
  it('should display register button with correct attributes', () => {
    cy.get('button[type="button"]')
      .should('be.visible')
      .and('contain', 'Registrarse')
      .and('have.attr', 'onclick', 'handleSubmit(event)')
      .and('have.class', 'bg-primary-green')
      .and('have.class', 'hover:bg-secondary-green')
      .and('have.class', 'text-white')
      .and('have.class', 'font-semibold');
  });


  

  

  

  // Test de reCAPTCHA
  it('should handle reCAPTCHA integration', () => {
    // Verificar que el script de reCAPTCHA se carga
    cy.get('script[src*="recaptcha"]').should('exist');

    // Verificar que la función handleSubmit existe
    cy.window().then((win) => {
      expect(win.handleSubmit).to.be.a('function');
    });
  });

  // Test de responsividad
  it('should be responsive on different screen sizes', () => {
    // Test en desktop
    cy.viewport(1280, 720);
    cy.get('h2').should('be.visible');
    cy.get('form').should('be.visible');

    // Test en tablet
    cy.viewport(768, 1024);
    cy.get('h2').should('be.visible');
    cy.get('form').should('be.visible');

    // Test en mobile
    cy.viewport(375, 667);
    cy.get('h2').should('be.visible');
    cy.get('form').should('be.visible');

    // Verificar que el formulario se adapta correctamente
    cy.get('.sm\\:mx-auto.sm\\:w-full.sm\\:max-w-sm').should('exist');
  });

  // Test de estilos CSS
  it('should have correct styling for form elements', () => {
    // Verificar estilos de inputs
    cy.get('input').each(($input) => {
      cy.wrap($input)
        .should('have.class', 'block')
        .and('have.class', 'w-full')
        .and('have.class', 'rounded-md')
        .and('have.class', 'bg-white')
        .and('have.class', 'focus:outline-secondary-green');
    });

    // Verificar estilos de selects
    cy.get('select').each(($select) => {
      cy.wrap($select)
        .should('have.class', 'block')
        .and('have.class', 'w-full')
        .and('have.class', 'rounded-md')
        .and('have.class', 'bg-white');
    });

    // Verificar estilos del botón
    cy.get('button[type="button"]')
      .should('have.class', 'flex')
      .and('have.class', 'w-full')
      .and('have.class', 'justify-center')
      .and('have.class', 'rounded-md')
      .and('have.class', 'bg-primary-green');
  });

  

  // Test de performance
  it('should load within reasonable time', () => {
    cy.visit('/signup', { timeout: 10000 });
    
    // Verificar que los elementos principales se cargan rápidamente
    cy.get('h2', { timeout: 5000 }).should('be.visible');
    cy.get('form', { timeout: 5000 }).should('be.visible');
    cy.get('input', { timeout: 5000 }).should('have.length', 5);
    cy.get('select', { timeout: 5000 }).should('have.length', 2);
  });
});