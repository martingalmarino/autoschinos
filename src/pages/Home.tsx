import React from 'react';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchBlock from '../components/SearchBlock';
import FeaturedModels from '../components/FeaturedModels';
import BrandPills from '../components/BrandPills';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Autos Chinos en Argentina 2025 – Marcas, Modelos y Novedades"
        description="Conocé todas las marcas y modelos de autos chinos disponibles en Argentina. Información actualizada, precios de referencia, seguridad y tendencias 2025."
        keywords="autos chinos, argentina, marcas chinas, modelos 2025, chery, geely, byd, haval, jac"
        canonical="https://www.autoschinos.ar/"
      />
      <Navbar />
      <main>
        <Hero />
        <SearchBlock />
        <FeaturedModels />
        <BrandPills />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
