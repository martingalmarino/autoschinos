import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  noindex?: boolean;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, canonical, noindex = false, image }) => {
  const siteUrl = 'https://www.autoschinos.ar';
  const fullTitle = `${title} | autoschinos.ar`;
  const defaultImage = `${siteUrl}/images/hero-bg.jpg`; // Imagen por defecto
  const ogImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;

  return (
    <Helmet>
      {/* Título */}
      <title>{title}</title>
      
      {/* Meta descripción */}
      <meta name="description" content={description} />
      
      {/* Keywords */}
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical || siteUrl} />
      <meta property="og:site_name" content="autoschinos.ar" />
      <meta property="og:locale" content="es_AR" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={description} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={description} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="es-AR" />
      
      {/* Google AdSense */}
      <script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6771833588582297"
        crossOrigin="anonymous"
      ></script>
    </Helmet>
  );
};

export default SEO;
