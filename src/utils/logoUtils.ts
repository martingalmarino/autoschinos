// Utility para manejar logos de marcas de forma dinámica

export const getBrandLogo = (brandName: string, fallbackColor: string = '#6B7280'): string => {
  // Normalizar el nombre de la marca para el archivo
  const normalizedName = brandName.toLowerCase().replace(/\s+/g, '-');
  
  // Intentar usar el logo PNG real
  const logoPath = `/images/brands/logos/${normalizedName}-logo.png`;
  
  // Por ahora retornamos la ruta del PNG
  // En una implementación más avanzada, podríamos verificar si el archivo existe
  // y usar un fallback SVG si no existe
  return logoPath;
};

export const getBrandFallbackLogo = (brandName: string, color: string = '#6B7280'): string => {
  // SVG genérico como fallback
  const svgContent = `
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="40" fill="${color}"/>
      <text x="40" y="50" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
        ${brandName.charAt(0).toUpperCase()}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svgContent)}`;
};

// Mapeo de marcas conocidas con sus colores
export const brandColors: { [key: string]: string } = {
  'jac': '#FF6347',
  'chery': '#E11D48',
  'geely': '#0056B3',
  'haval': '#637487',
  'byd': '#00A6F6',
  'dfsk': '#8B5CB0',
  'baic': '#6B7280',
  'foton': '#6B7280',
  'mg': '#8B5CB0',
  'lifan': '#EF4444',
  'dongfeng': '#8B5CB0',
  'great-wall': '#6B7280',
  'changan': '#9C40B3',
  'shineray': '#EF4444'
};

export const getBrandColor = (brandName: string): string => {
  const normalizedName = brandName.toLowerCase().replace(/\s+/g, '-');
  return brandColors[normalizedName] || '#6B7280';
};
