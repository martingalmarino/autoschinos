import React from 'react';
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
