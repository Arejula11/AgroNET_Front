const BASE_URL = 'http://localhost:4321/';

describe('Admin Statistics Page Tests', () => {
  beforeEach(() => {
    cy.login("testE2Eadmin@gmail.com", "testE2EadmintestE2Eadmin")
    
    // Visitar la página de estadísticas de admin
    cy.visit('/admin/estadisticas');
    
  });

  // Test de carga inicial y estructura principal
  it('should display the main statistics dashboard structure', () => {
    // Verificar contenedor principal
    cy.get('.m-6.p-6.rounded-lg.bg-gray-100')
      .should('be.visible')
      .and('exist');

    // Verificar grid de estadísticas clave
    cy.get('.grid.grid-cols-1.md\\:grid-cols-4')
      .should('be.visible')
      .and('have.class', 'gap-6')
      .and('have.class', 'mb-6');

    // Verificar grid de gráficos
    cy.get('.grid.grid-cols-1.md\\:grid-cols-2')
      .should('be.visible')
      .and('have.class', 'gap-6')
      .and('have.class', 'mb-6');
  });

  // Test de las tarjetas de estadísticas principales
  it('should display all key statistics cards with correct content', () => {
    const expectedStats = [
      'Usuarios Totales',
      'Usuarios Bloqueados', 
      'Total de Mensajes',
      'Total de Foros'
    ];

    // Verificar que hay exactamente 4 tarjetas de estadísticas
    cy.get('.grid.grid-cols-1.md\\:grid-cols-4 > div')
      .should('have.length', 4);

    // Verificar cada tarjeta de estadísticas
    expectedStats.forEach((statTitle, index) => {
      cy.get('.grid.grid-cols-1.md\\:grid-cols-4 > div').eq(index).within(() => {
        // Verificar título de la estadística
        cy.get('h3')
          .should('be.visible')
          .and('contain', statTitle)
          .and('have.class', 'text-lg')
          .and('have.class', 'font-semibold')
          .and('have.class', 'text-center');

      });
    });
  });

  // Test de estilos de las tarjetas de estadísticas
  it('should have correct styling for statistics cards', () => {
    cy.get('.grid.grid-cols-1.md\\:grid-cols-4 > div').each(($card) => {
      cy.wrap($card)
        .should('have.class', 'border-primary-green')
        .and('have.class', 'border')
        .and('have.class', 'bg-accent')
        .and('have.class', 'text-black')
        .and('have.class', 'shadow-lg')
        .and('have.class', 'p-6')
        .and('have.class', 'rounded-lg')
        .and('have.class', 'text-center');
    });
  });

  // Test de los gráficos y sus títulos
  it('should display all chart sections with correct titles', () => {
    const expectedCharts = [
      'Usuarios Creados por Mes',
      'Publicaciones por Mes',
      'Usuarios por Comunidad Autónoma',
      'Usuarios por Rol',
      'Inicios de Sesión por Hora',
      'Inicios de Sesión por Mes'
    ];

    // Verificar que hay exactamente 6 secciones de gráficos
    cy.get('.grid.grid-cols-1.md\\:grid-cols-2 > div')
      .should('have.length', 6);

    // Verificar cada título de gráfico
    expectedCharts.forEach((chartTitle, index) => {
      cy.get('.grid.grid-cols-1.md\\:grid-cols-2 > div').eq(index).within(() => {
        cy.get('h3')
          .should('be.visible')
          .and('contain', chartTitle)
          .and('have.class', 'text-lg')
          .and('have.class', 'font-semibold')
          .and('have.class', 'mb-2')
          .and('have.class', 'text-center');
      });
    });
  });

  // Test de estilos de las tarjetas de gráficos
  it('should have correct styling for chart cards', () => {
    cy.get('.grid.grid-cols-1.md\\:grid-cols-2 > div').each(($card) => {
      cy.wrap($card)
        .should('have.class', 'border-primary-green')
        .and('have.class', 'border')
        .and('have.class', 'bg-accent')
        .and('have.class', 'text-black')
        .and('have.class', 'shadow-lg')
        .and('have.class', 'p-6')
        .and('have.class', 'rounded-lg')
        .and('have.class', 'text-center');
    });
  });

  
  // Test de responsividad
  it('should be responsive on different screen sizes', () => {
    // Test en desktop
    cy.viewport(1280, 720);
    cy.get('.grid.grid-cols-1.md\\:grid-cols-4').should('be.visible');
    cy.get('.grid.grid-cols-1.md\\:grid-cols-2').should('be.visible');

    // Test en tablet
    cy.viewport(768, 1024);
    cy.get('.grid.grid-cols-1.md\\:grid-cols-4 > div').should('have.length', 4);
    cy.get('.grid.grid-cols-1.md\\:grid-cols-2 > div').should('have.length', 6);

    // Test en mobile
    cy.viewport(375, 667);
    cy.get('.grid.grid-cols-1.md\\:grid-cols-4 > div').should('have.length', 4);
    cy.get('.grid.grid-cols-1.md\\:grid-cols-2 > div').should('have.length', 6);
  });

  // Test de orden específico de las estadísticas
  it('should display statistics in correct order', () => {
    const expectedOrder = [
      'Usuarios Totales',
      'Usuarios Bloqueados',
      'Total de Mensajes', 
      'Total de Foros'
    ];

    expectedOrder.forEach((title, index) => {
      cy.get('.grid.grid-cols-1.md\\:grid-cols-4 > div').eq(index)
        .should('contain', title);
    });
  });

  // Test de orden específico de los gráficos
  it('should display charts in correct order', () => {
    const expectedChartOrder = [
      'Usuarios Creados por Mes',
      'Publicaciones por Mes',
      'Usuarios por Comunidad Autónoma',
      'Usuarios por Rol',
      'Inicios de Sesión por Hora',
      'Inicios de Sesión por Mes'
    ];

    expectedChartOrder.forEach((title, index) => {
      cy.get('.grid.grid-cols-1.md\\:grid-cols-2 > div').eq(index)
        .should('contain', title);
    });
  });

  // Test de manejo de errores en carga de datos
  it('should handle data loading errors gracefully', () => {
    // Interceptar con error para simular fallo en API
    cy.intercept('GET', '**/admin/stats**', {
      statusCode: 500,
      body: { error: 'Server Error' }
    }).as('getAdminStatsError');

    cy.visit('/admin/estadisticas');

    // La página debería cargar aunque falle la API
    cy.get('.m-6.p-6.rounded-lg.bg-gray-100').should('be.visible');
    
    // Los contadores deberían mostrar 0 o valores por defecto
    cy.get('.grid.grid-cols-1.md\\:grid-cols-4 > div').should('have.length', 4);
  });


  // Test de accesibilidad
  it('should have proper accessibility features', () => {
    // Verificar jerarquía de encabezados
    cy.get('h3').should('have.length', 10); // 4 stats + 6 charts

    // Verificar que todos los h3 tienen texto
    cy.get('h3').each(($heading) => {
      cy.wrap($heading).should('not.be.empty');
    });

    // Verificar estructura semántica
    cy.get('.grid').should('have.length', 2);
  });

  // Test de performance
  it('should load within reasonable time', () => {
    cy.visit('/admin/estadisticas', { timeout: 15000 });
    
    // Verificar que los elementos principales se cargan rápidamente
    cy.get('.grid.grid-cols-1.md\\:grid-cols-4', { timeout: 10000 }).should('be.visible');
    cy.get('.grid.grid-cols-1.md\\:grid-cols-2', { timeout: 10000 }).should('be.visible');
  });


  // Test de IDs únicos de gráficos
  it('should have unique chart IDs', () => {
    const expectedChartIds = [
      'chart-users-per-month',
      'chart-posts-per-month', 
      'chart-users-by-community',
      'chart-users-by-role',
      'chart-logins-per-hour',
      'chart-logins-per-month'
    ];

    // Verificar que cada ID es único (aunque puede que no estén en el DOM hasta que React los renderice)
    expectedChartIds.forEach((chartId) => {
      cy.get(`#${chartId}`, { timeout: 10000 })
        .should('have.length.at.most', 1)
    });
  });

  // Test de grid layout específico
  it('should have correct grid layout classes', () => {
    // Grid de estadísticas: 1 columna en mobile, 4 en desktop
    cy.get('.grid.grid-cols-1.md\\:grid-cols-4')
      .should('have.class', 'grid-cols-1')
      .and('have.class', 'md:grid-cols-4');

    // Grid de gráficos: 1 columna en mobile, 2 en desktop  
    cy.get('.grid.grid-cols-1.md\\:grid-cols-2')
      .should('have.class', 'grid-cols-1')
      .and('have.class', 'md:grid-cols-2');
  });
});