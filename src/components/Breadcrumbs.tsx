import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  name: string;
  href: string;
  current: boolean;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  // Mapeo de rutas a nombres legibles
  const routeNames: { [key: string]: string } = {
    '/': 'Inicio',
    '/catalogo': 'Catálogo',
    '/marcas': 'Marcas',
    '/resenas': 'Reseñas',
    '/contacto': 'Contacto'
  };

  // Generar breadcrumbs basado en la ruta actual
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [];

    // Siempre incluir "Inicio" como primer elemento (excepto si estamos en home)
    if (location.pathname !== '/') {
      breadcrumbs.push({
        name: 'Inicio',
        href: '/',
        current: false
      });
    }

    // Construir breadcrumbs para cada segmento de la ruta
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      
      breadcrumbs.push({
        name: routeNames[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: currentPath,
        current: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // No mostrar breadcrumbs en la página de inicio
  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-4">
          <ol className="flex items-center space-x-2">
            {breadcrumbs.map((breadcrumb, index) => (
              <li key={breadcrumb.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />
                )}
                
                {breadcrumb.current ? (
                  <span className="flex items-center text-sm font-medium text-gray-500">
                    {index === 0 && breadcrumb.name === 'Inicio' && (
                      <HomeIcon className="h-4 w-4 mr-1" />
                    )}
                    {breadcrumb.name}
                  </span>
                ) : (
                  <Link
                    to={breadcrumb.href}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-500 transition-colors duration-200"
                  >
                    {index === 0 && breadcrumb.name === 'Inicio' && (
                      <HomeIcon className="h-4 w-4 mr-1" />
                    )}
                    {breadcrumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
