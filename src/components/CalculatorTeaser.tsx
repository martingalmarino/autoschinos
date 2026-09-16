import Link from 'next/link';

export default function CalculatorTeaser() {
  return (
    <section className="py-16 bg-gradient-to-br from-emerald-700 to-teal-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          ¿Cuánto podrías ahorrar con un híbrido o eléctrico?
        </h2>
        <p className="text-lg text-emerald-50 max-w-2xl mx-auto mb-8">
          Calculá el costo de uso con modelos reales del catálogo: multi-marca,
          nafta/kWh editables y proyección a 5 años.
        </p>
        <Link
          href="/calculadora-ahorro"
          className="inline-block bg-white text-emerald-800 font-bold py-3 px-8 rounded-lg hover:bg-emerald-50 transition-colors"
        >
          Abrir calculadora de ahorro
        </Link>
      </div>
    </section>
  );
}
