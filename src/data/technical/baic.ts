import { anioDe, basePublic, ficha, fuente, hecho, PEND, seccion } from './helpers';

const centro = fuente(
  'baic-centro',
  'Centro de descargas BAIC Argentina',
  'https://baic.com.ar/centro-de-descargas/',
  'primaria',
  'Índice oficial consultado con los PDF de ruta julio 2025',
  'No cierra una garantía única: el material institucional también publica 7 años/100.000 y no se copia 7 años/150.000 a cada variante.'
);

const x55 = fuente(
  'baic-x55',
  'Brochure BAIC X55 Luxury',
  'https://baic.com.ar/wp-content/uploads/2025/07/Brochure__BAIC_X55_Luxury.pdf',
  'primaria',
  'PDF en ruta julio 2025',
  'X55 II Luxury 1.5T.'
);
const x55p = fuente(
  'baic-x55-plus',
  'Brochure BAIC X55 Plus',
  'https://baic.com.ar/wp-content/uploads/2025/07/Brochure__BAIC_X55_Plus.pdf',
  'primaria',
  'PDF en ruta julio 2025'
);
const bj30 = fuente(
  'baic-bj30',
  'Brochure BAIC BJ30 4x4',
  'https://baic.com.ar/wp-content/uploads/2025/07/Brochure__BAIC_BJ30_4x4.pdf',
  'primaria',
  'PDF en ruta julio 2025',
  'Documento HEV/DHT. No es un naftero con caja AT8.'
);
const bj40 = fuente(
  'baic-bj40',
  'Brochure BAIC BJ40',
  'https://baic.com.ar/wp-content/uploads/2025/07/Brochure__BAIC_BJ40.pdf',
  'primaria',
  'PDF en ruta julio 2025',
  'Corresponde a BJ40 PLUS, no a cualquier generación o BJ40 Pro.'
);
const bj60 = fuente(
  'baic-bj60',
  'Brochure BAIC BJ60',
  'https://baic.com.ar/wp-content/uploads/2025/07/Brochure__BAIC_BJ60.pdf',
  'primaria',
  'PDF en ruta julio 2025',
  'Versión Flagship descripta en el relevamiento.'
);
const eu5 = fuente(
  'baic-eu5',
  'Brochure BAIC EU5',
  'https://baic.com.ar/wp-content/uploads/2025/07/Brochure__BAIC_EU5.pdf',
  'primaria',
  'PDF en ruta julio 2025'
);
const u5 = fuente(
  'baic-u5',
  'Brochure BAIC U5 Plus',
  'https://baic.com.ar/wp-content/uploads/2025/07/Brochure__BAIC_U5_Plus.pdf',
  'primaria',
  'PDF en ruta julio 2025',
  'Versión Honor.'
);
const x35 = fuente(
  'baic-x35',
  'Brochure BAIC X35 Luxury',
  'https://baic.com.ar/wp-content/uploads/2025/07/Brochure__BAIC_X35_Luxury.pdf',
  'primaria',
  'PDF en ruta julio 2025',
  'Luxury 1.5T CVT.'
);

const anioBaic = anioDe('folleto argentino de ruta julio 2025; el año-modelo no queda certificado por la etiqueta del catálogo');
const sinPrecio = 'Consultar precio. No hay lista primaria fechada y consistente para BAIC.';

export const baicSheets = [
  ficha({
    id: 'baic-x55-ii-2025',
    cobertura: 'integrada',
    correspondencia:
      'El folleto es X55 II Luxury 1.5T. La potencia no se unifica: el texto comercial dice 183 HP y la tabla 138 kW a 5.500 rpm. No se “corrige” a 188 HP. Los airbags también contradicen 6 y 8.',
    fuentes: [x55, centro],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Código y cilindrada', 'A156T2H, 1.498 cm³', 'baic-x55'),
        hecho('Torque', '305 Nm entre 1.500 y 4.500 rpm', 'baic-x55'),
      ]),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'DCT de 7 marchas', 'baic-x55'),
        hecho('Tracción', 'Delantera', 'baic-x55'),
        hecho('Combustible', 'Nafta', 'baic-x55'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.620 × 1.886 × 1.680 mm', 'baic-x55'),
        hecho('Distancia entre ejes', '2.735 mm', 'baic-x55'),
        hecho('Tanque', '56 L', 'baic-x55'),
        hecho('Neumáticos', '225/55 R19', 'baic-x55'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'Independiente / multibrazo', 'baic-x55'),
        hecho('Frenos', 'Discos ventilados y sólidos', 'baic-x55'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Pantallas', '10,1 y 10,25 pulgadas', 'baic-x55'),
        hecho('Butacas', 'Calefaccionadas y ventiladas', 'baic-x55'),
        hecho('ADAS citado', 'BSD', 'baic-x55'),
      ]),
    ],
    conflictos: [
      'Potencia: el texto comercial dice 183 HP y la tabla 138 kW a 5.500 rpm. No se publica una sola cifra ni se convierte a 188 HP.',
      'Airbags: la tabla indica 6 y otra página del mismo folleto indica 8.',
    ],
    pendientes: [
      'Peso no confirmado en el extracto (se retira el valor aproximado de 1.580 kg).',
      'Garantía específica de esta variante, sin copiar una fórmula institucional única.',
    ],
    precios: [],
    public: basePublic({
      descripcion:
        'SUV 1.5 turbo con DCT de 7 marchas y tracción delantera.',
      combustible: 'Nafta',
      transmision: 'DCT 7',
      precio: sinPrecio,
      especificaciones: {
        motor: '1.498 cm³ A156T2H',
        potencia: 'Sin cifra única',
        traccion: 'Delantera',
        capacidad_tanque: '56 L',
        peso: PEND,
      },
      caracteristicas: [
        'DCT 7 y tracción delantera',
        'Pantallas de 10,1 y 10,25 pulgadas, butacas calefaccionadas y ventiladas, BSD',
      ],
      anioNota: anioBaic,
      avisoCorto: 'Potencia y airbags quedan en conflicto dentro del folleto.',
    }),
  }),
  ficha({
    id: 'baic-x55-plus-2025',
    cobertura: 'integrada',
    correspondencia:
      'El X55 Plus documentado es 1.5T con DCT de 7 marchas y tracción delantera. No es CVT ni 174 HP. El tanque del folleto es 60 L.',
    fuentes: [x55p, centro],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', '1.5T A156T2H', 'baic-x55-plus'),
        hecho('Potencia', '185 HP', 'baic-x55-plus'),
      ]),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'DCT de 7 marchas', 'baic-x55-plus'),
        hecho('Tracción', 'Delantera', 'baic-x55-plus'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.745 × 1.892 × 1.715 mm', 'baic-x55-plus'),
        hecho('Distancia entre ejes', '2.800 mm', 'baic-x55-plus'),
        hecho('Peso', '1.625 kg', 'baic-x55-plus'),
        hecho('Tanque', '60 L', 'baic-x55-plus'),
        hecho('Neumáticos', '235/55 R19', 'baic-x55-plus'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson delante y multibrazo detrás', 'baic-x55-plus'),
        hecho('Frenos', 'Discos ventilados y discos', 'baic-x55-plus'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', 'Frontales, laterales y de cortina', 'baic-x55-plus'),
        hecho('Estabilidad', 'ESP', 'baic-x55-plus'),
        hecho('ADAS', 'AEB, BSD, LDW, TJA y cámara 360°', 'baic-x55-plus'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Pantallas', 'Multimedia 12,3 pulgadas e instrumental de 7', 'baic-x55-plus'),
        hecho('Climatización', 'Bizona', 'baic-x55-plus'),
        hecho('Butacas', 'Ventilación, calefacción y masaje', 'baic-x55-plus'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Garantía específica de la variante, no tomada del slogan institucional.'],
    precios: [],
    public: basePublic({
      descripcion:
        'SUV 1.5 turbo con doble embrague de 7 marchas y 185 HP.',
      combustible: 'Nafta',
      transmision: 'DCT 7',
      precio: sinPrecio,
      especificaciones: {
        motor: '1.5T A156T2H',
        potencia: '185 HP',
        traccion: 'Delantera',
        capacidad_tanque: '60 L',
        peso: '1.625 kg',
      },
      caracteristicas: [
        'Airbags frontales, laterales y de cortina, más ESP',
        'AEB, BSD, LDW, TJA y cámara 360°',
        'Pantalla de 12,3 pulgadas, climatizador bizona y butacas con ventilación, calor y masaje',
      ],
      anioNota: anioBaic,
    }),
  }),
  ficha({
    id: 'baic-bj30-2025',
    cobertura: 'integrada',
    correspondencia:
      'El brochure argentino del BJ30 4x4 es híbrido HEV con transmisión DHT y tracción AWD. No es el naftero con automática de 8 marchas publicado antes. La cifra térmica “116” no tiene unidad identificada y no se le asigna una.',
    fuentes: [bj30, centro],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Tipo', 'Híbrido HEV: nafta más batería', 'baic-bj30'),
        hecho('Potencia combinada', '404 HP y 685 Nm', 'baic-bj30'),
        hecho('Eléctrico delantero', '174 HP y 315 Nm', 'baic-bj30'),
        hecho('Eléctrico trasero', '74 HP y 135 Nm', 'baic-bj30'),
      ]),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'DHT', 'baic-bj30'),
        hecho('Tracción', 'AWD', 'baic-bj30'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.730 × 1.910 × 1.790 mm', 'baic-bj30'),
        hecho('Distancia entre ejes', '2.820 mm', 'baic-bj30'),
        hecho('Tanque', '51 L', 'baic-bj30'),
        hecho('Neumáticos', '235/60 R19', 'baic-bj30'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson delante y multibrazo detrás', 'baic-bj30'),
        hecho('Frenos', 'Discos ventilados y discos', 'baic-bj30'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '6', 'baic-bj30'),
        hecho('ADAS', 'AEB, IACC, LKA, BSD, RCTA y cámara 360°', 'baic-bj30'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Pantallas', '10,25 y 14,6 pulgadas', 'baic-bj30'),
        hecho('Climatización', 'Bizona', 'baic-bj30'),
      ]),
    ],
    conflictos: [],
    pendientes: [
      'Unidad de la cifra térmica “116”: no se publica como HP ni como kW.',
      'Capacidad de batería.',
      'Garantía específica de la variante.',
    ],
    precios: [],
    public: basePublic({
      descripcion:
        'SUV híbrido BJ30 4x4 con caja DHT y tracción integral.',
      combustible: 'Híbrido (HEV)',
      transmision: 'DHT',
      categoria: 'SUV híbrido',
      precio: sinPrecio,
      especificaciones: {
        motor: 'HEV nafta + batería (BJ30 4x4)',
        potencia: '404 HP y 685 Nm combinados; eléctricos 174 HP y 74 HP',
        traccion: 'AWD',
        capacidad_tanque: '51 L',
        peso: PEND,
      },
      caracteristicas: [
        'Caja DHT y tracción integral',
        '6 airbags',
        'AEB, IACC, LKA, BSD, RCTA y cámara 360°',
        'Pantallas de 10,25 y 14,6 pulgadas, climatizador bizona',
      ],
      anioNota: anioBaic,
      avisoCorto: 'Es el híbrido DHT del brochure, no un naftero AT8.',
    }),
  }),
  ficha({
    id: 'baic-bj40-2025',
    cobertura: 'integrada',
    correspondencia:
      'El PDF corresponde a BJ40 PLUS, no a otra generación, Pro o BJ40 genérico. Trae doble airbag frontal: no respalda los 7 airbags que figuraban. La potencia del folleto es 221 HP.',
    fuentes: [bj40, centro],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', '2.0 turbo', 'baic-bj40'),
        hecho('Potencia', '221 HP', 'baic-bj40'),
        hecho('Torque', '380 Nm entre 1.800 y 3.600 rpm', 'baic-bj40'),
      ]),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Tracción', 'Seleccionable 2WD/4WD', 'baic-bj40'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.630 × 1.925 × 1.871 mm', 'baic-bj40'),
        hecho('Distancia entre ejes', '2.745 mm', 'baic-bj40'),
        hecho('Tanque', '75 L', 'baic-bj40'),
        hecho('Baúl', '532 / 965 L', 'baic-bj40'),
        hecho('Neumáticos', '265/65 R17', 'baic-bj40'),
      ]),
      seccion('chasis', 'Frenos', [
        hecho('Frenos', 'Discos ventilados y sólidos', 'baic-bj40'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', 'Doble airbag frontal', 'baic-bj40'),
        hecho('Estabilidad', 'ESP', 'baic-bj40'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Techo', 'Desmontable', 'baic-bj40'),
        hecho('Pantallas', '12,3 y 10 pulgadas', 'baic-bj40'),
        hecho('Butacas', 'Eléctricas y calefaccionadas', 'baic-bj40'),
      ]),
    ],
    conflictos: [],
    pendientes: [
      'Tipo de caja: el extracto no dice si es manual o automática.',
      'Peso. Se retira el valor aproximado de 2.200 kg.',
      'Cámara 360° y asistente de pendiente no están en este extracto.',
      'Garantía específica.',
    ],
    precios: [],
    public: basePublic({
      descripcion:
        'BJ40 PLUS: motor 2.0 turbo de 221 HP y tracción 2WD o 4WD seleccionable.',
      combustible: 'Nafta',
      transmision: '2WD/4WD seleccionable',
      precio: sinPrecio,
      especificaciones: {
        motor: '2.0 turbo (BJ40 PLUS)',
        potencia: '221 HP',
        traccion: '2WD/4WD seleccionable',
        capacidad_tanque: '75 L',
        peso: PEND,
      },
      caracteristicas: [
        'Alcance limitado a BJ40 PLUS',
        'Doble airbag frontal y ESP',
        'Techo desmontable, pantallas de 12,3 y 10 pulgadas, butacas eléctricas y calefaccionadas',
      ],
      anioNota: anioBaic,
      avisoCorto: 'Los datos son del BJ40 PLUS, no de cualquier BJ40.',
    }),
  }),
  ficha({
    id: 'baic-bj60-2025',
    cobertura: 'integrada',
    correspondencia:
      'Flagship 2.0T mild hybrid 48 V, 263 HP, AT8 y tracción seleccionable. La suspensión del folleto es doble brazo y multibrazo: no se mantiene la suspensión neumática publicada. El tanque es 85 L.',
    fuentes: [bj60, centro],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', '2.0 turbo mild hybrid 48 V', 'baic-bj60'),
        hecho('Potencia', '263 HP', 'baic-bj60'),
        hecho('Torque', '406 Nm', 'baic-bj60'),
      ]),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'Automática de 8 marchas', 'baic-bj60'),
        hecho('Tracción', '2WD/4WD seleccionable', 'baic-bj60'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '5.040 × 1.955 × 1.925 mm', 'baic-bj60'),
        hecho('Distancia entre ejes', '2.820 mm', 'baic-bj60'),
        hecho('Tanque', '85 L', 'baic-bj60'),
        hecho('Neumáticos', '275/50 R20', 'baic-bj60'),
        hecho('Plazas', '7', 'baic-bj60'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'Doble brazo delante y multibrazo detrás', 'baic-bj60'),
        hecho('Frenos', 'Discos ventilados', 'baic-bj60'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', 'Frontales, laterales y de cortina', 'baic-bj60'),
        hecho('Estabilidad', 'ESP', 'baic-bj60'),
        hecho('ADAS', 'ACC, AEB, LKA, BSD y TSR', 'baic-bj60'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Pantallas', 'Instrumental 10,25 pulgadas, central 12,8 y HUD', 'baic-bj60'),
        hecho('Audio', '12 parlantes', 'baic-bj60'),
        hecho('Climatización', 'Tres zonas', 'baic-bj60'),
      ]),
    ],
    conflictos: [],
    pendientes: [
      'Peso.',
      'Bloqueos de diferencial: no están en el extracto y se retiran.',
      'Garantía específica.',
    ],
    precios: [],
    public: basePublic({
      descripcion:
        'SUV grande: motor 2.0 turbo mild hybrid de 48 V, 263 HP, caja automática de 8 marchas y siete plazas.',
      combustible: 'Nafta (mild hybrid 48 V)',
      transmision: 'AT8, 2WD/4WD seleccionable',
      precio: sinPrecio,
      especificaciones: {
        motor: '2.0 turbo mild hybrid 48 V',
        potencia: '263 HP',
        traccion: '2WD/4WD seleccionable',
        capacidad_tanque: '85 L',
        peso: PEND,
      },
      caracteristicas: [
        '7 plazas',
        'Airbags frontales, laterales y de cortina, ESP',
        'ACC, AEB, LKA, BSD y TSR',
        'Pantallas de 10,25 y 12,8 pulgadas, HUD, 12 parlantes y climatizador de tres zonas',
      ],
      anioNota: anioBaic,
      avisoCorto: 'Mild hybrid 48 V. No se mantiene la suspensión neumática.',
    }),
  }),
  ficha({
    id: 'baic-eu5-2025',
    cobertura: 'integrada',
    correspondencia:
      'Eléctrico con batería CATL ternaria de 49,6 kWh y 416 km NEDC. Se retira la batería de 60 kWh. En la carga se prioriza la tabla del PDF, no el texto comercial de 6 horas.',
    fuentes: [eu5, centro],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Potencia', '120 kW / 163 HP', 'baic-eu5'),
        hecho('Torque', '240 Nm', 'baic-eu5'),
      ]),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'Una marcha', 'baic-eu5'),
        hecho('Tracción', 'Delantera', 'baic-eu5'),
      ]),
      seccion('ev', 'Batería y carga', [
        hecho('Química y capacidad', 'CATL ternaria, 49,6 kWh', 'baic-eu5'),
        hecho('Autonomía', '416 km NEDC', 'baic-eu5'),
        hecho('Carga DC', '30–80 % en 30 minutos o menos', 'baic-eu5'),
        hecho('Carga general', '10–100 % en 9 horas o menos a 25 °C', 'baic-eu5'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.650 × 1.820 × 1.520 mm', 'baic-eu5'),
        hecho('Distancia entre ejes', '2.670 mm', 'baic-eu5'),
        hecho('Peso', '1.580 kg', 'baic-eu5'),
        hecho('Baúl', '430 L', 'baic-eu5'),
        hecho('Neumáticos', '215/50 R17', 'baic-eu5'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión trasera', 'Multibrazo', 'baic-eu5'),
        hecho('Frenos', 'Discos ventilados y sólidos', 'baic-eu5'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '6', 'baic-eu5'),
        hecho('Estabilidad', 'ESP y TCS', 'baic-eu5'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Pantalla', 'Central de 9 pulgadas', 'baic-eu5'),
      ]),
    ],
    conflictos: [
      'El texto comercial habla de 6 horas de carga y la tabla publica otros tiempos. Se muestra la tabla.',
    ],
    pendientes: ['Tipo de conector y potencias AC/DC en kW no salieron del extracto.'],
    precios: [],
    public: basePublic({
      descripcion:
        'Sedán eléctrico: 120 kW, batería de 49,6 kWh y 416 km NEDC.',
      combustible: '100% Eléctrico',
      transmision: 'Una marcha',
      precio: sinPrecio,
      especificaciones: {
        motor: 'Eléctrico',
        potencia: '120 kW / 163 HP',
        traccion: 'Delantera',
        capacidad_tanque: 'No aplica (eléctrico)',
        peso: '1.580 kg',
      },
      caracteristicas: [
        'Batería CATL ternaria de 49,6 kWh',
        '416 km NEDC',
        '6 airbags, ESP y TCS',
        'Pantalla central de 9 pulgadas',
      ],
      anioNota: anioBaic,
      avisoCorto: 'Batería 49,6 kWh. Se retiró el dato de 60 kWh.',
    }),
  }),
  ficha({
    id: 'baic-u5-plus-2025',
    cobertura: 'integrada',
    correspondencia:
      'U5 Plus Honor: 1.499 cm³, 111 HP y CVT delantera. La cantidad de airbags queda en conflicto entre la tabla y el texto comercial.',
    fuentes: [u5, centro],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Cilindrada', '1.499 cm³', 'baic-u5'),
        hecho('Potencia', '111 HP', 'baic-u5'),
        hecho('Torque', '142 Nm', 'baic-u5'),
      ]),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'CVT', 'baic-u5'),
        hecho('Tracción', 'Delantera', 'baic-u5'),
        hecho('Combustible', 'Nafta', 'baic-u5'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.660 × 1.820 × 1.480 mm', 'baic-u5'),
        hecho('Distancia entre ejes', '2.670 mm', 'baic-u5'),
        hecho('Tanque', '48 L', 'baic-u5'),
        hecho('Baúl', '430 L', 'baic-u5'),
        hecho('Peso', '1.255 kg', 'baic-u5'),
        hecho('Neumáticos', '205/55 R16 o 205/50 R17, según configuración', 'baic-u5'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y eje torsional', 'baic-u5'),
        hecho('Frenos', 'Discos ventilados y sólidos', 'baic-u5'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Estabilidad', 'ESP y TCS', 'baic-u5'),
        hecho('Asistencias', 'BSD, LDW y cámara 360°', 'baic-u5'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Pantallas', '12,3 pulgadas y instrumental de 7', 'baic-u5'),
      ]),
    ],
    conflictos: [
      'Airbags: la tabla indica frontales y laterales; el texto comercial dice 6. No se elige una cantidad.',
    ],
    pendientes: ['Garantía específica.'],
    precios: [],
    public: basePublic({
      descripcion:
        'Sedán 1.5 de 111 HP con CVT.',
      combustible: 'Nafta',
      transmision: 'CVT',
      precio: sinPrecio,
      especificaciones: {
        motor: '1.499 cm³',
        potencia: '111 HP',
        traccion: 'Delantera',
        capacidad_tanque: '48 L',
        peso: '1.255 kg',
      },
      caracteristicas: [
        'CVT y tracción delantera',
        'ESP, TCS, BSD, LDW y cámara 360°',
        'Pantalla de 12,3 pulgadas e instrumental de 7',
      ],
      anioNota: anioBaic,
      avisoCorto: 'Airbags sin cantidad única: el folleto se contradice.',
    }),
  }),
  ficha({
    id: 'baic-x35-2025',
    cobertura: 'integrada',
    correspondencia:
      'Luxury 1.5T CVT. La potencia de tabla “110(100)” está mal rotulada y no se publica como HP. Se retiran los 116 HP aproximados.',
    fuentes: [x35, centro],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Cilindrada', '1.499 cm³ turbo', 'baic-x35'),
        hecho('Torque', '210 Nm', 'baic-x35'),
      ]),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'CVT', 'baic-x35'),
        hecho('Tracción', 'Delantera', 'baic-x35'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.325 × 1.830 × 1.640 mm', 'baic-x35'),
        hecho('Distancia entre ejes', '2.570 mm', 'baic-x35'),
        hecho('Tanque', '46 L', 'baic-x35'),
        hecho('Baúl', '390 L', 'baic-x35'),
        hecho('Neumáticos', '215/50 R17', 'baic-x35'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y eje torsional', 'baic-x35'),
        hecho('Frenos', 'Discos ventilados y sólidos', 'baic-x35'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '2', 'baic-x35'),
        hecho('Estabilidad', 'ESP, TCS y HHC', 'baic-x35'),
        hecho('Cámara', 'Trasera', 'baic-x35'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Pantalla', '8 pulgadas', 'baic-x35'),
        hecho('Techo', 'Panorámico', 'baic-x35'),
      ]),
    ],
    conflictos: [
      'La tabla de potencia dice “110(100)” sin un rótulo utilizable. No se traduce a HP.',
    ],
    pendientes: ['Potencia en una unidad explícita.', 'Garantía específica.'],
    precios: [],
    public: basePublic({
      descripcion:
        'SUV chico Luxury con motor 1.5 turbo, CVT, dos airbags y tanque de 46 litros.',
      combustible: 'Nafta',
      transmision: 'CVT',
      precio: sinPrecio,
      especificaciones: {
        motor: '1.499 cm³ turbo',
        potencia: 'Sin cifra única',
        traccion: 'Delantera',
        capacidad_tanque: '46 L',
        peso: PEND,
      },
      caracteristicas: [
        '2 airbags, ESP, TCS y HHC',
        'Cámara trasera, pantalla de 8 pulgadas y techo panorámico',
      ],
      anioNota: anioBaic,
      avisoCorto: 'Potencia de tabla ilegible: no se publica como HP.',
    }),
  }),
];
