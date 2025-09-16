import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] flex items-center justify-center overflow-hidden pt-20 pb-8">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-bg.jpg')`
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center sm:text-left text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl mx-auto sm:mx-0 py-8 sm:py-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight uppercase">
            Descubrí el auto chino ideal para vos
          </h1>
          <div className="flex justify-center sm:justify-start">
            <button 
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-200 w-full sm:w-auto max-w-xs sm:max-w-none"
              onClick={() => window.location.href = '/catalogo'}
            >
              Ver catálogo
            </button>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
