export function getBrandLogo(brandName: string): string {
  const normalizedName = brandName.toLowerCase().replace(/\s+/g, '-');
  return `/images/brands/logos/${normalizedName}-logo.png`;
}

export function getBrandFallbackLogo(
  brandName: string,
  color: string = '#6B7280'
): string {
  const svgContent = `
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="40" fill="${color}"/>
      <text x="40" y="50" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">
        ${brandName.charAt(0).toUpperCase()}
      </text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
}

export const brandColors: Record<string, string> = {
  jac: '#FF6347',
  chery: '#E11D48',
  geely: '#0056B3',
  haval: '#637487',
  byd: '#00A6F6',
  dfsk: '#8B5CB0',
  baic: '#6B7280',
  foton: '#6B7280',
  mg: '#8B5CB0',
  lifan: '#EF4444',
  dongfeng: '#8B5CB0',
  'great-wall': '#6B7280',
  changan: '#9C40B3',
  faw: '#1E40AF',
};

export function getBrandColor(brandName: string): string {
  const normalizedName = brandName.toLowerCase().replace(/\s+/g, '-');
  return brandColors[normalizedName] || '#6B7280';
}
