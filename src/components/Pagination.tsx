'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = (isMobile = false) => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = isMobile ? 3 : 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    if (isMobile) {
      if (currentPage === 1) pages.push(1, 2, '...');
      else if (currentPage === totalPages)
        pages.push('...', totalPages - 1, totalPages);
      else if (currentPage === 2) pages.push(1, 2, 3, '...');
      else if (currentPage === totalPages - 1)
        pages.push('...', totalPages - 2, totalPages - 1, totalPages);
      else
        pages.push(
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...'
        );
      return pages;
    }

    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push('...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, '...');
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages
      );
    }
    return pages;
  };

  const desktop = getVisiblePages(false);
  const mobile = getVisiblePages(true);

  return (
    <>
      <div className="hidden md:flex justify-center items-center space-x-2 mt-8">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Anterior
        </button>
        {desktop.map((page, index) =>
          page === '...' ? (
            <span key={`d-${index}`} className="px-3 py-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              type="button"
              key={`d-${page}`}
              onClick={() => onPageChange(page as number)}
              className={`w-10 h-10 rounded-lg text-sm font-medium ${
                currentPage === page
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          Siguiente
        </button>
      </div>

      <div className="flex md:hidden justify-center items-center mt-8">
        <div className="flex items-center bg-white rounded-xl shadow border overflow-hidden">
          <button
            type="button"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Página anterior"
            className="px-4 py-3 text-sm"
          >
            ←
          </button>
          {mobile.map((page, index) =>
            page === '...' ? (
              <span key={`m-${index}`} className="px-2 text-xs text-gray-500">
                •••
              </span>
            ) : (
              <button
                type="button"
                key={`m-${page}`}
                onClick={() => onPageChange(page as number)}
                className={`min-w-[44px] h-12 text-sm font-medium ${
                  currentPage === page
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                {page}
              </button>
            )
          )}
          <button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Página siguiente"
            className="px-4 py-3 text-sm"
          >
            →
          </button>
        </div>
      </div>
    </>
  );
}
