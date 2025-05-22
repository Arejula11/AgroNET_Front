const BASE_URL = 'http://localhost:4321/';

describe('Login Page Tests', () => {
  // Configuración antes de cada test
  beforeEach(() => {
    cy.visit('/');
    cy.get('a[href="/login"]').click();
    cy.url().should('include', '/login');
    cy.get('h2').should('contain', 'Inicia sesión en tu cuenta');
  });

  // Test de login exitoso
  it('should successfully login with valid credentials', () => {
    // Arrange - Preparar datos de prueba
    const validEmail = 'testE2E@gmail.com';
    const validPassword = 'testE2EtestE2E';

    // Act - Realizar acciones
    cy.get('input[name="email"]')
      .should('be.visible')
      .type(validEmail)
      .should('have.value', validEmail);

    cy.get('input[name="password"]')
      .should('be.visible')
      .type(validPassword)
      .should('have.value', validPassword);

    cy.get('button[type="submit"]')
      .should('be.visible')
      .and('contain', 'Iniciar sesión')
      .click();

    // Assert - Verificar resultados
    cy.url().should('eq', BASE_URL + 'mapa', { timeout: 20000 });
    
    // Verificar que no hay mensajes de error
    cy.get('.text-red-600').should('not.exist');
  });

  // Test de credenciales incorrectas - email inválido
  it('should show error message with invalid email', () => {
    const invalidEmail = 'testE2EError@gmail.com';
    const validPassword = 'testE2EtestE2E';

    cy.get('input[name="email"]').type(invalidEmail);
    cy.get('input[name="password"]').type(validPassword);
    
    cy.get('button[type="submit"]').click();

    // Verificar que permanece en la página de login
    cy.url().should('eq', BASE_URL + 'login');
    
    // Verificar mensaje de error específico
    cy.get('.text-red-600')
      .should('be.visible')
      .and('contain', 'Credenciales incorrectas. Inténtalo de nuevo.');

  });

  // Test de credenciales incorrectas - contraseña inválida
  it('should show error message with invalid password', () => {
    const validEmail = 'testE2E@gmail.com';
    const invalidPassword = 'testE2Error';

    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type(invalidPassword);
    
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', BASE_URL + 'login');
    
    cy.get('.text-red-600')
      .should('be.visible')
      .and('contain', 'Credenciales incorrectas. Inténtalo de nuevo.');
  });

  // Test de validación de longitud de contraseña
  it('should show error message when password is too short', () => {
    const validEmail = 'testE2E@gmail.com';
    const shortPassword = 'test';

    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type(shortPassword);
    
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', BASE_URL + 'login');
    
    cy.get('.text-red-600')
      .should('be.visible')
      .and('contain', 'La contraseña debe tener al menos 8 caracteres.');
  });

  // Test de campos requeridos
  it('should require email and password fields', () => {
    // Intentar enviar formulario sin completar campos
    cy.get('button[type="submit"]').click();

    // Los campos requeridos deben mostrar validación del navegador
    cy.get('input[name="email"]:invalid').should('exist');
    cy.get('input[name="password"]:invalid').should('exist');

    // Verificar que permanece en la página de login
    cy.url().should('include', '/login');
  });

  // Test de validación de formato de email
  it('should validate email format', () => {
    const invalidEmail = 'invalid-email-format';
    const validPassword = 'testE2EtestE2E';

    cy.get('input[name="email"]').type(invalidEmail);
    cy.get('input[name="password"]').type(validPassword);
    
    // El campo email debe ser inválido por formato
    cy.get('input[name="email"]:invalid').should('exist');
    
    cy.get('button[type="submit"]').click();
    
    // Debería permanecer en la página por validación HTML5
    cy.url().should('include', '/login');
  });

  // Test de navegación a página de registro
  it('should navigate to signup page when clicking create account link', () => {
    cy.get('a[href="/signup"]')
      .should('be.visible')
      .and('contain', 'Crea una cuenta')
      .click();

    cy.url().should('include', '/signup');
  });

  // Test de presencia de elementos de la interfaz
  it('should display all required UI elements', () => {
    // Verificar logo
    cy.get('img[alt="AgroNet"]').should('be.visible');

    // Verificar título
    cy.get('h2').should('contain', 'Inicia sesión en tu cuenta');

    // Verificar campos del formulario
    cy.get('label[for="email"]').should('contain', 'Correo electrónico');
    cy.get('input[name="email"]')
      .should('be.visible')
      .and('have.attr', 'type', 'email')
      .and('have.attr', 'required');

    cy.get('label[for="password"]').should('contain', 'Contraseña');
    cy.get('input[name="password"]')
      .should('be.visible')
      .and('have.attr', 'type', 'password')
      .and('have.attr', 'required');

    // Verificar botón de envío
    cy.get('button[type="submit"]')
      .should('be.visible')
      .and('contain', 'Iniciar sesión');

    // Verificar enlaces adicionales
    cy.get('a').should('contain', '¿Olvidaste tu contraseña?');
    cy.get('a[href="/signup"]').should('contain', 'Crea una cuenta');

    // Verificar botones de OAuth
    cy.get('button').should('contain', 'Google');
    cy.get('button').should('contain', 'GitHub');
  });

  // Test de accesibilidad básica
  it('should have proper form accessibility', () => {
    // Verificar que los labels están asociados correctamente
    cy.get('label[for="email"]').should('exist');
    cy.get('input[id="email"]').should('exist');
    
    cy.get('label[for="password"]').should('exist');
    cy.get('input[id="password"]').should('exist');

    // Verificar atributos de autocompletado
    cy.get('input[name="email"]').should('have.attr', 'autocomplete', 'email');
    cy.get('input[name="password"]').should('have.attr', 'autocomplete', 'current-password');
  });

  it('logout test', () => { 
    cy.login("testE2E@gmail.com", "testE2EtestE2E")
    cy.visit("mercado")
    cy.get('button[name="perfilDropdown"]').click()
    cy.get('a[href="/logout"]').click()
    cy.visit("mercado")
    cy.url().should('eq', BASE_URL+'login')

  })

})
