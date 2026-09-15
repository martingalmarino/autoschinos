export const brandDescriptions: Record<string, string> = {
  jac: 'JAC Motors es una de las marcas chinas más importantes en Argentina, ofreciendo vehículos de alta calidad con tecnología moderna y precios competitivos. Desde SUV familiares hasta pick-ups robustas, JAC combina diseño, confort y eficiencia.',
  chery:
    'Chery es una de las marcas chinas más reconocidas en Argentina, destacándose por su innovación tecnológica y diseño moderno. Ofrece SUV compactos y familiares que combinan elegancia, confort y tecnología a precios accesibles.',
  geely:
    'Geely es una de las marcas chinas más innovadoras en Argentina, reconocida por su compromiso con la tecnología y el diseño moderno. Ofrece SUV que combinan elegancia, confort y tecnología de vanguardia.',
  haval:
    'Haval es una marca china de vanguardia en Argentina, especializada en SUV con tecnología híbrida y eléctrica. Combina diseño moderno, innovación y eficiencia energética.',
  dfsk: 'DFSK es una marca china especializada en vehículos comerciales y SUV en Argentina, ofreciendo soluciones versátiles para el trabajo y la familia a precios accesibles.',
  baic: 'BAIC es una de las marcas chinas más prestigiosas en Argentina, reconocida por su innovación tecnológica y diseño. Ofrece SUV familiares y sedanes a precios competitivos.',
  foton:
    'Foton es una marca china especializada en vehículos comerciales y pick-ups en Argentina, ofreciendo soluciones robustas y confiables para el trabajo.',
  mg: 'MG es una marca con herencia británica y tecnología china establecida en Argentina. Ofrece SUV y sedanes modernos con buena relación calidad-precio.',
  lifan:
    'Lifan es una marca china consolidada en Argentina con vehículos accesibles y confiables, enfocada en movilidad práctica con buena relación calidad-precio.',
  dongfeng:
    'Dongfeng es una de las marcas chinas más grandes del mundo, presente en Argentina con una variada gama de vehículos familiares y comerciales.',
  'great-wall':
    'Great Wall es una marca china de prestigio en Argentina, reconocida por calidad e innovación. Ofrece pick-ups y vehículos robustos y confiables.',
  changan:
    'Changan es una de las marcas chinas más antiguas y respetadas, presente en Argentina con SUV modernos y tecnología avanzada.',
  byd: 'BYD es líder mundial en vehículos eléctricos e híbridos, llegando a Argentina con tecnología de vanguardia en movilidad sustentable.',
  faw: 'FAW (First Automotive Works) es una de las marcas automotrices más grandes de China, con décadas de experiencia en manufactura y una amplia gama de vehículos.',
};

export function getBrandDescription(brandSlug: string, displayName: string): string {
  return (
    brandDescriptions[brandSlug] ||
    `${displayName} es una marca china reconocida en Argentina por su calidad, innovación y precios competitivos.`
  );
}

export const SPEC_LABELS: Record<string, string> = {
  motor: 'Motor',
  potencia: 'Potencia',
  traccion: 'Tracción',
  capacidad_tanque: 'Capacidad del tanque',
  peso: 'Peso',
};
