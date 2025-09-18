import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, canonical, noindex = false }) => {
  const siteUrl = 'https://www.autoschinos.ar';
  const fullTitle = `${title} | autoschinos.ar`;

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
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      
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
