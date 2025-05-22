const BASE_URL = 'http://localhost:4321/';

describe('Admin Dashboard Tests', () => {
  beforeEach(() => {
    // Nota: Asumiendo que necesitas estar autenticado como admin para acceder
    // Aquí deberías agregar la lógica de autenticación previa si es necesaria
    cy.login("testE2Eadmin@gmail.com", "testE2EadmintestE2Eadmin")
    cy.visit('/admin');
  });

  // Test de carga inicial y elementos principales
  it('should display the main admin dashboard with correct content', () => {
    // Verificar título principal
    cy.get('h2')
      .should('be.visible')
      .and('contain', 'Bienvenido al centro de administración')
      .and('have.class', 'text-4xl')
      .and('have.class', 'text-primary-green')
      .and('have.class', 'font-display')
      .and('have.class', 'text-center');

    // Verificar que existe el grid de opciones
    cy.get('.grid.grid-cols-2.gap-8')
      .should('be.visible')
      .and('have.class', 'mt-6')
      .and('have.class', 'p-8')
      .and('have.class', 'max-w-5xl')
      .and('have.class', 'mx-auto');
  });

  // Test de las tarjetas de administración
  it('should display all admin option cards with correct content and links', () => {
    const expectedCards = [
      {
        title: 'Usuarios',
        href: '/admin/usuarios'
      },
      {
        title: 'Foros',
        href: '/admin/foros'
      },
      {
        title: 'Mensajes',
        href: '/admin/mensajes'
      },
      {
        title: 'Estadísticas',
        href: '/admin/estadisticas'
      }
    ];

    // Verificar que hay exactamente 4 tarjetas
    cy.get('.grid a').should('have.length', 4);

    // Verificar cada tarjeta individualmente
    expectedCards.forEach((card, index) => {
      cy.get('.grid a').eq(index).within(() => {
        // Verificar título
        cy.get('h3')
          .should('be.visible')
          .and('contain', card.title)
          .and('have.class', 'text-2xl')
          .and('have.class', 'font-semibold')
          .and('have.class', 'text-white')
          .and('have.class', 'text-center');
      });

      // Verificar href (fuera del within para evitar problemas de contexto)
      cy.get('.grid a').eq(index)
        .should('have.attr', 'href', card.href);
    });
  });

  // Test de estilos CSS de las tarjetas
  it('should have correct styling for admin cards', () => {
    cy.get('.grid a').each(($card) => {
      cy.wrap($card)
        .should('have.class', 'bg-primary-green')
        .and('have.class', 'shadow-lg')
        .and('have.class', 'rounded-2xl')
        .and('have.class', 'p-10')
        .and('have.class', 'flex')
        .and('have.class', 'flex-col')
        .and('have.class', 'justify-center')
        .and('have.class', 'items-center')
        .and('have.class', 'cursor-pointer')
        .and('have.class', 'hover:bg-secondary-green')
        .and('have.class', 'w-full')
        .and('have.class', 'h-48');
    });
  });

  // Test de navegación a cada sección
  it('should navigate to usuarios section', () => {
    cy.get('a[href="/admin/usuarios"]')
      .should('be.visible')
      .click();

    cy.url().should('include', '/admin/usuarios');
  });

  it('should navigate to foros section', () => {
    cy.get('a[href="/admin/foros"]')
      .should('be.visible')
      .click();

    cy.url().should('include', '/admin/foros');
  });

  it('should navigate to mensajes section', () => {
    cy.get('a[href="/admin/mensajes"]')
      .should('be.visible')
      .click();

    cy.url().should('include', '/admin/mensajes');
  });

  it('should navigate to estadisticas section', () => {
    cy.get('a[href="/admin/estadisticas"]')
      .should('be.visible')
      .click();

    cy.url().should('include', '/admin/estadisticas');
  });

  // Test del botón de cerrar sesión
  it('should display logout button with correct styling', () => {
    cy.get('button')
      .should('be.visible')
      .and('contain', 'Cerrar sesión')
      .and('have.class', 'bg-primary-green')
      .and('have.class', 'text-white')
      .and('have.class', 'font-semibold')
      .and('have.class', 'py-2')
      .and('have.class', 'px-4')
      .and('have.class', 'rounded-lg')
      .and('have.class', 'shadow-lg')
      .and('have.class', 'hover:bg-secondary-green')
      .and('have.class', 'text-2xl')
      .and('have.attr', 'onclick', 'logout()');
  });


  // Test alternativo para logout que verifica la redirección
  it('should redirect to logout page when clicking logout button', () => {
    cy.get('button[onclick="logout()"]').click();
    
    // Verificar que redirige a la página de landing
    cy.url().should('include', '/');
  });

  // Test de responsividad
  it('should be responsive on different screen sizes', () => {
    // Test en desktop
    cy.viewport(1280, 720);
    cy.get('.grid.grid-cols-2').should('be.visible');
    cy.get('.grid a').should('have.length', 4);

    // Test en tablet
    cy.viewport(768, 1024);
    cy.get('h2').should('be.visible');
    cy.get('.grid a').should('have.length', 4);

    // Test en mobile (las tarjetas podrían cambiar a una columna)
    cy.viewport(375, 667);
    cy.get('h2').should('be.visible');
    cy.get('.grid a').should('have.length', 4);
  });

  // Test de hover effects
  it('should show hover effects on admin cards', () => {
    cy.get('.grid a').first()
      .should('have.class', 'hover:bg-secondary-green')
      .trigger('mouseover');

    // Verificar que el botón de logout también tiene hover
    cy.get('button')
      .should('have.class', 'hover:bg-secondary-green')
      .trigger('mouseover');
  });

  // Test de layout y estructura
  it('should have proper layout structure', () => {
    // Verificar contenedor principal del grid
    cy.get('.grid')
      .should('have.class', 'grid-cols-2')
      .and('have.class', 'gap-8')
      .and('have.class', 'mt-6')
      .and('have.class', 'p-8')
      .and('have.class', 'max-w-5xl')
      .and('have.class', 'mx-auto');

    // Verificar contenedor del botón de logout
    cy.get('.flex.flex-col.items-center.justify-center.mt-8')
      .should('exist')
      .within(() => {
        cy.get('button').should('exist');
      });
  });

  // Test de accesibilidad
  it('should have proper accessibility features', () => {
    // Verificar que los enlaces tienen texto descriptivo
    cy.get('.grid a').each(($link) => {
      cy.wrap($link).within(() => {
        cy.get('h3').should('not.be.empty');
      });
    });

    // Verificar que el botón tiene texto descriptivo
    cy.get('button').should('contain.text', 'Cerrar sesión');

    // Verificar jerarquía de encabezados
    cy.get('h2').should('have.length', 1);
    cy.get('h3').should('have.length', 4);
  });


  // Test de dimensiones específicas
  it('should have correct card dimensions', () => {
    cy.get('.grid a').each(($card) => {
      cy.wrap($card)
        .should('have.class', 'h-48')
        .and('have.class', 'w-full');
    });
  });

  // Test de contenido específico de cada tarjeta
  it('should display correct specific content for each admin section', () => {
    // Verificar orden específico de las tarjetas
    cy.get('.grid a').eq(0).should('contain', 'Usuarios');
    cy.get('.grid a').eq(1).should('contain', 'Foros');
    cy.get('.grid a').eq(2).should('contain', 'Mensajes');
    cy.get('.grid a').eq(3).should('contain', 'Estadísticas');
  });

  // Test de performance
  it('should load within reasonable time', () => {
    cy.visit('/admin', { timeout: 10000 });
    
    // Verificar que los elementos principales se cargan rápidamente
    cy.get('h2', { timeout: 5000 }).should('be.visible');
    cy.get('.grid a', { timeout: 5000 }).should('have.length', 4);
    cy.get('button', { timeout: 5000 }).should('be.visible');
  });
});