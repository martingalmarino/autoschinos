import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] flex items-center justify-center overflow-hidden pt-20 pb-8">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjAiIHk9IjQwMCIgd2lkdGg9IjE5MjAiIGhlaWdodD0iNjgwIiBmaWxsPSIjRTVFN0VCIi8+CjxyZWN0IHg9IjIwMCIgeT0iNTAwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0QxRDVEQiIvPgo8cmVjdCB4PSI2MDAiIHk9IjQ4MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMjAiIGZpbGw9IiNEQzI2MjYiLz4KPHJlY3QgeD0iMTAwMCIgeT0iNTAwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0QxRDVEQiIvPgo8cmVjdCB4PSIxNDAwIiB5PSI0ODAiIHdpZHRoPSIzMDAiIGhlaWdodD0iMjIwIiBmaWxsPSIjRkY2MzQ3Ii8+Cjx0ZXh0IHg9Ijk2MCIgeT0iMzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3MjgwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZvbnQtd2VpZ2h0PSJib2xkIj5Db25jZXNpb25hcmlvIGRlIEF1dG9zPC90ZXh0Pgo8L3N2Zz4K')`
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center sm:text-left text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl mx-auto sm:mx-0 py-8 sm:py-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight uppercase">
            Tu próximo auto chino te está esperando
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-200 leading-relaxed">
            Explorá nuestro catálogo de usados y 0km disponibles
          </p>
          <div className="flex justify-center sm:justify-start">
            <button className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-200 w-full sm:w-auto max-w-xs sm:max-w-none">
              Ver catálogo
            </button>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
