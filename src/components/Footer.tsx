import React from 'react';

const Footer: React.FC = () => {
  // Navegación y exploración
  const navigationLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Catálogo', href: '/catalogo' },
    { name: 'Marcas', href: '/marcas' },
    { name: 'Buscar Modelos', href: '/catalogo' }
  ];

  // Información de la empresa
  const companyLinks = [
    { name: 'Acerca de AutosChinos', href: '#' },
    { name: 'Contacto', href: '#' },
    { name: 'Información Técnica', href: '#' },
    { name: 'Preguntas Frecuentes', href: '#' }
  ];

  // Enlaces legales
  const legalLinks = [
    { name: 'Términos y Condiciones', href: '/terminos-condiciones' },
    { name: 'Política de Privacidad', href: '/politica-privacidad' },
    { name: 'Cookies', href: '/politica-cookies' },
    { name: 'Aviso Legal', href: '/aviso-legal' }
  ];

  // Redes sociales removidas - reemplazadas por crédito de desarrollo
  /*const socialLinks = [
    {
      name: 'Facebook',
      href: '#',
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE4IDJoLTNhNSA1IDAgMCAwLTUgNXYzSDd2NGgzdjEwaDR2LTEwaDN2LTRIMTVWN0E1IDUgMCAwIDAgMTggMnoiIGZpbGw9IiM2Mzc0ODciLz4KPC9zdmc+'
    },
    {
      name: 'Instagram',
      href: '#',
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMiIgeT0iMiIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiByeD0iNSIgcnk9IjUiIGZpbGw9IiM2Mzc0ODciLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxjaXJjbGUgY3g9IjE3LjUiIGN5PSI2LjUiIHI9IjEuNSIgZmlsbD0id2hpdGUiLz4KPC9zdmc+'
    },
    {
      name: 'YouTube',
      href: '#',
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIzIDYuNjFhMi45IDIuOSAwIDAgMC0yLjA1LTIuMDVDMTguNzUgNCAxMiA0IDEyIDRzLTYuNzUgMC04Ljk1LjU2QTIuOSAyLjkgMCAwIDAgMSA2LjYxQTEyLjE3IDEyLjE3IDAgMCAwIDAgMTJhMTIuMTcgMTIuMTcgMCAwIDAgMSA1LjM5QTIuOSAyLjkgMCAwIDAgMy4wNSAxOS40NEM1LjI1IDIwIDEyIDIwIDEyIDIwczYuNzUgMCA4Ljk1LS41NkEyLjkgMi45IDAgMCAwIDIyIDE3LjM5QTEyLjE3IDEyLjE3IDAgMCAwIDIzIDEyYTEyLjE3IDEyLjE3IDAgMCAwLTEtNS4zOXoiIGZpbGw9IiM2Mzc0ODciLz4KPHBvbHlnb24gcG9pbnRzPSIxMCwxNSA1LDkgMTUsOSIgZmlsbD0id2hpdGUiLz4KPC9zdmc+'
    },
    {
      name: 'TikTok',
      href: '#',
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5LjU5IDkuNjNhNS4wOSA1LjA5IDAgMCAxLTEuMDEtMy4wN1Y2aC0zLjA5djYuMThhMyA0IDAgMSAxLTYgMGMwLTEuNjYgMS4zNC0zIDMtM2EuNzQuNzQgMCAwIDEgLjE0IDB2LTMuMDhhNy4wOSA3LjA5IDAgMCAwLTcuMDkgNy4wOWMwIDMuOTIgMy4xNyA3LjA5IDcuMDkgNy4wOXM3LjA5LTMuMTcgNy4wOS03LjA5VjkuNjN6IiBmaWxsPSIjNjM3NDg3Ii8+Cjwvc3ZnPg=='
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjQ0IDJIMy41NkMuNzkgMiAwIDIuNzkgMCAzLjU2djE2Ljg4QzAgMjEuMjEuNzkgMjIgMy41NiAyMmgxNi44OGMyLjc3IDAgMy41Ni0uNzkgMy41Ni0zLjU2VjMuNTZDMjQgMi43OSAyMy4yMSAyIDIwLjQ0IDJ6bS0xNi4zMyAxOC4yM0gzLjU2VjguNDNoLjU1djExLjh6bS0uMjgtMTMuNDFjLS4xOCAwLS4zMy0uMTUtLjMzLS4zM3MuMTUtLjMzLjMzLS4zMy4zMy4xNS4zMy4zMy0uMTUuMzMtLjMzLjMzem0xMy40MSAxMy40MWgtLjU1di01LjY0YzAtMS4zMS0uNDctMS45Ny0xLjQ3LTEuOTctLjgxIDAtMS4yOS41NS0xLjUxIDEuMDh2Ni41M2gtLjU1VjguNDNoLjU1djEuNTFjLjQ0LS42OSAxLjIxLTEuMDcgMi4wNy0xLjA3IDEuNTMgMCAyLjY4IDEuMDQgMi42OCAzLjI5djYuMDF6IiBmaWxsPSIjNjM3NDg3Ii8+Cjwvc3ZnPg=='
    }
  ]; */

  return (
    <footer className="text-white footer-neutral-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Navegación & Exploración */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">
              Navegación & Exploración
            </h4>
            <ul className="space-y-2">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Información de la Empresa */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">
              Nuestra Empresa
            </h4>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Enlaces Legales */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">
              Legal & Privacidad
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 underline"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Información del Sitio */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 via-primary-400 to-red-500 bg-clip-text text-transparent drop-shadow-sm mb-4">
                autoschinos.ar
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm mb-6">
                Tu portal de información sobre autos chinos en Argentina. Explorá fichas técnicas y especificaciones de las principales marcas.
              </p>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-gray-300 font-medium text-sm">Email</p>
                <p className="text-gray-400 text-sm">info@autoschinos.ar</p>
              </div>
              <div>
                <p className="text-gray-300 font-medium text-sm">Ubicación</p>
                <p className="text-gray-400 text-sm">Argentina</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 autoschinos.ar. Todos los derechos reservados.
            </p>
            <div className="text-gray-400 text-sm">
              Desarrollado por{' '}
              <a 
                href="mailto:m.galmarino@gmail.com" 
                className="text-white hover:text-gray-300 transition-colors duration-200 font-medium underline"
              >
                Martín Galmarino
              </a>
              {' '}🤖
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
