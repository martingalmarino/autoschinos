import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] flex items-center justify-center overflow-hidden pt-20 pb-8">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/images/hero-bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center sm:text-left text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl mx-auto sm:mx-0 py-8 sm:py-12">
          <p className="text-sm sm:text-base font-semibold tracking-wide uppercase mb-3 text-white/90">
            autoschinos.ar
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight uppercase">
            Descubrí el auto chino ideal para vos
          </h1>
          <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-xl">
            Marcas, modelos y fichas técnicas de autos chinos en Argentina.
          </p>
          <div className="flex justify-center sm:justify-start">
            <Link
              href="/catalogo"
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg text-base sm:text-lg transition-colors duration-200 w-full sm:w-auto max-w-xs sm:max-w-none text-center"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
