import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = (isMobile: boolean = false) => {
    const pages = [];
    const maxVisiblePages = isMobile ? 3 : 7;
    
    if (totalPages <= maxVisiblePages) {
      // Si hay pocas páginas, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (isMobile) {
        // Versión móvil: mostrar solo página actual y adyacentes
        if (currentPage === 1) {
          pages.push(1, 2, '...');
        } else if (currentPage === totalPages) {
          pages.push('...', totalPages - 1, totalPages);
        } else {
          if (currentPage === 2) {
            pages.push(1, 2, 3, '...');
          } else if (currentPage === totalPages - 1) {
            pages.push('...', totalPages - 2, totalPages - 1, totalPages);
          } else {
            pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
          }
        }
      } else {
        // Versión desktop: lógica original
        if (currentPage <= 4) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 3) {
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 4; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        }
      }
    }
    
    return pages;
  };

  // Detectar si es móvil basado en clases de Tailwind
  const visiblePagesDesktop = getVisiblePages(false);
  const visiblePagesMobile = getVisiblePages(true);

  return (
    <>
      {/* Versión Desktop */}
      <div className="hidden md:flex justify-center items-center space-x-2 mt-8">
        {/* Botón Anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-primary-300'
          }`}
        >
          Anterior
        </button>

        {/* Números de página */}
        {visiblePagesDesktop.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  currentPage === page
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-primary-300'
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Botón Siguiente */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-primary-300'
          }`}
        >
          Siguiente
        </button>
      </div>

      {/* Versión Mobile */}
      <div className="flex md:hidden justify-center items-center mt-8">
        <div className="flex items-center bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Botón Anterior Móvil */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Página anterior"
            className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
              currentPage === 1
                ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Separador */}
          <div className="w-px h-8 bg-gray-200"></div>

          {/* Números de página móvil */}
          <div className="flex items-center">
            {visiblePagesMobile.map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-2 py-3 text-xs text-gray-500">•••</span>
                ) : (
                  <button
                    onClick={() => onPageChange(page as number)}
                    className={`min-w-[44px] h-12 text-sm font-medium transition-colors duration-200 ${
                      currentPage === page
                        ? 'bg-primary-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Separador */}
          <div className="w-px h-8 bg-gray-200"></div>

          {/* Botón Siguiente Móvil */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Página siguiente"
            className={`px-4 py-3 text-sm font-medium transition-colors duration-200 ${
              currentPage === totalPages
                ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Información de página actual (solo móvil) */}
      <div className="flex md:hidden justify-center mt-3">
        <span className="text-xs text-gray-500">
          Página {currentPage} de {totalPages}
        </span>
      </div>
    </>
  );
};

export default Pagination;
