import React from 'react';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Inicio', href: '#' },
    { name: 'Modelos', href: '#' },
    { name: 'Marcas', href: '#' },
    { name: 'Contacto', href: '#' },
    { name: 'Financiación', href: '#' }
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 via-primary-400 to-red-500 bg-clip-text text-transparent drop-shadow-sm mb-2">
                autoschinos.ar
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Tu portal de información sobre autos chinos en Argentina. Explorá fichas técnicas, especificaciones y toda la información de las principales marcas chinas disponibles en el mercado.
              </p>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-primary-500 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Información de contacto y redes sociales */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">
              Contacto
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-gray-300 font-medium">Email</p>
                <p className="text-gray-400">info@autoschinos.ar</p>
              </div>
              <div>
                <p className="text-gray-300 font-medium">Ubicación</p>
                <p className="text-gray-400">Argentina</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-gray-400 text-sm">
                Desarrollado por{' '}
                <a 
                  href="mailto:m.galmarino@gmail.com" 
                  className="text-white hover:text-gray-300 transition-colors duration-200 font-medium"
                >
                  Martín Galmarino
                </a>
                {' '}🤖
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © autoschinos.ar 2025 – Todos los derechos reservados
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors duration-200">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors duration-200">
                Términos y Condiciones
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors duration-200">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
