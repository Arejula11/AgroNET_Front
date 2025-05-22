const BASE_URL = 'http://localhost:4321/';

describe('Landing Page Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  // Test de carga inicial y elementos principales
  it('should display the main hero section with correct content', () => {
    // Verificar título principal
    cy.get('h1')
      .should('be.visible')
      .and('contain', 'Bienvenido a')
      .and('contain', 'AgroNET');

    // Verificar que el texto "AgroNET" tiene la clase correcta para el color
    cy.get('h1 span')
      .should('have.class', 'text-secondary-green')
      .and('contain', 'AgroNET');

    // Verificar descripción
    cy.get('p')
      .first()
      .should('be.visible')
      .and('contain', 'La plataforma colaborativa para agricultores')
      .and('contain', 'Comparte datos de tus cosechas')
      .and('contain', 'precios de mercado en tiempo real')
      .and('contain', 'alertas climáticas personalizadas');

    // Verificar botón de iniciar sesión
    cy.get('a[href="/login"]')
      .should('be.visible')
      .and('contain', 'Iniciar sesión')
      .and('have.class', 'bg-primary-green');
  });

  // Test de navegación al login
  it('should navigate to login page when clicking "Iniciar sesión"', () => {
    cy.get('a[href="/login"]')
      .should('be.visible')
      .click();

    cy.url().should('include', '/login');
    cy.get('h2').should('contain', 'Inicia sesión en tu cuenta');
  });

  // Test de las tarjetas de funcionalidades
  it('should display all feature cards with correct content', () => {
    const expectedCards = [
      {
        title: 'Mercado',
        description: 'Consulta precios históricos y actuales de productos agrícolas',
        image: 'mercado.webp'
      },
      {
        title: 'Mapa interactivo',
        description: 'Visualiza el mapa del catastro de españa',
        image: 'mapa.webp'
      },
      {
        title: 'Foro comunitario',
        description: 'Comparte experiencias, resuelve dudas y colabora',
        image: 'foro2.webp'
      },
      {
        title: 'Alertas climáticas',
        description: 'Visualiza el mapa de españa con alertas climáticas',
        image: 'alertas.webp'
      }
    ];

    // Verificar que hay exactamente 4 tarjetas
    cy.get('section li.card').should('have.length', 4);

    // Verificar cada tarjeta individualmente
    expectedCards.forEach((card, index) => {
      cy.get('section li.card').eq(index).within(() => {
        // Verificar título
        cy.get('h3')
          .should('be.visible')
          .and('contain', card.title)
          .and('have.class', 'text-primary-green');

        // Verificar descripción
        cy.get('p')
          .should('be.visible')
          .and('contain.text', card.description);

        // Verificar imagen
        cy.get('img')
          .should('be.visible')
          .and('have.attr', 'src', `/${card.image}`)
          .and('have.attr', 'alt', card.title === 'Mapa interactivo' ? 'Mapa' : 
               card.title === 'Foro comunitario' ? 'Foro' : 
               card.title === 'Alertas climáticas' ? 'Alertas' : 'Mercado');
      });
    });
  });

  // Test de responsividad básica
  it('should be responsive on different screen sizes', () => {
    // Test en desktop
    cy.viewport(1280, 720);
    cy.get('h1').should('be.visible');
    cy.get('section li.card').should('have.css', 'width').and('not.equal', '100%');

    // Test en tablet
    cy.viewport(768, 1024);
    cy.get('h1').should('be.visible');
    cy.get('section li.card').first().should('be.visible');

    // Test en mobile
    cy.viewport(375, 667);
    cy.get('h1').should('be.visible');
    cy.get('section li.card').first().should('be.visible');
    
    // En mobile, las tarjetas deberían ocupar el ancho completo
    cy.get('section li.card').first().should('have.class', 'w-full');
  });


  // Test de estructura HTML y accesibilidad
  it('should have proper HTML structure and accessibility', () => {
    // Verificar estructura semántica
    cy.get('section').should('exist');
    cy.get('article').should('exist');
    cy.get('ul').should('exist');
    cy.get('li').should('have.length.at.least', 4);

    // Verificar jerarquía de encabezados
    cy.get('h1').should('have.length', 1);
    cy.get('h3').should('have.length', 4);

    // Verificar atributos alt en imágenes
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.attr', 'alt').and('not.be.empty');
    });

    // Verificar que el enlace tiene el href correcto
    cy.get('a[href="/login"]').should('have.attr', 'href', '/login');
  });

  // Test de contenido específico de cada tarjeta
  it('should display correct specific content for each feature card', () => {
    // Tarjeta Mercado
    cy.get('section li.card').eq(0).within(() => {
      cy.get('h3').should('contain', 'Mercado');
      cy.get('p').should('contain', 'Compara y toma mejores decisiones de compra o venta');
    });

    // Tarjeta Mapa
    cy.get('section li.card').eq(1).within(() => {
      cy.get('h3').should('contain', 'Mapa interactivo');
      cy.get('p').should('contain', 'Conoce la ubicación de tus cultivos y los de otros agricultores');
    });

    // Tarjeta Foro
    cy.get('section li.card').eq(2).within(() => {
      cy.get('h3').should('contain', 'Foro comunitario');
      cy.get('p').should('contain', 'comunidad activa');
    });

    // Tarjeta Alertas
    cy.get('section li.card').eq(3).within(() => {
      cy.get('h3').should('contain', 'Alertas climáticas');
      cy.get('p').should('contain', 'condiciones climáticas adversas que puedan afectar tus cultivos');
    });
  });

  // Test de carga de imágenes
  it('should load all images correctly', () => {
    const expectedImages = [
      '/mercado.webp',
      '/mapa.webp', 
      '/foro2.webp',
      '/alertas.webp'
    ];

    expectedImages.forEach((imageSrc) => {
      cy.get(`img[src="${imageSrc}"]`)
        .should('be.visible')
        .and(($img) => {
          // Verificar que la imagen se ha cargado correctamente
          expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
    });
  });

  // Test de estilos CSS
  it('should have correct CSS classes and styling', () => {
    // Verificar clases del título principal
    cy.get('h1')
      .should('have.class', 'text-5xl')
      .and('have.class', 'font-extrabold')
      .and('have.class', 'text-primary-green');

    // Verificar clases del botón
    cy.get('a[href="/login"]')
      .should('have.class', 'bg-primary-green')
      .and('have.class', 'hover:bg-secondary-green')
      .and('have.class', 'text-white')
      .and('have.class', 'rounded-xl');

    // Verificar clases de las tarjetas
    cy.get('section li.card')
      .should('have.class', 'rounded-xl')
      .and('have.class', 'shadow-lg')
      .and('have.class', 'bg-white');
  });

  // Test de layout y espaciado
  it('should have proper layout and spacing', () => {
    // Verificar que el contenido principal está centrado
    cy.get('.flex.flex-col.items-center.justify-center')
      .should('exist')
      .and('have.class', 'mt-24');

    // Verificar espaciado entre elementos
    cy.get('.space-y-8').should('exist');
    
    // Verificar que las tarjetas tienen el gap correcto
    cy.get('.gap-10').should('exist');

    // Verificar altura de las tarjetas
    cy.get('section li.card').each(($card) => {
      cy.wrap($card).should('have.class', 'h-[460px]');
    });
  });

  // Test de performance básica
  it('should load within reasonable time', () => {
    cy.visit('/', { timeout: 10000 });
    
    // Verificar que los elementos principales se cargan rápidamente
    cy.get('h1', { timeout: 5000 }).should('be.visible');
    cy.get('section li.card', { timeout: 5000 }).should('have.length', 4);
    cy.get('a[href="/login"]', { timeout: 5000 }).should('be.visible');
  });

  // Test de scroll y visibilidad
  it('should display all content when scrolling', () => {
    // Verificar contenido inicial visible
    cy.get('h1').should('be.visible');
    
    // Hacer scroll hacia abajo para ver las tarjetas
    cy.get('section').scrollIntoView();
    
    // Verificar que todas las tarjetas son visibles después del scroll
    cy.get('section li.card').should('have.length', 4);
    cy.get('section li.card').each(($card) => {
      cy.wrap($card).should('be.visible');
    });
  });
});