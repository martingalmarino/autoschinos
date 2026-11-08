import { anioDe, basePublic, ficha, fuente, hecho, PEND, precio, seccion } from './helpers';

const lista = fuente(
  'chery-lista-20261006',
  'Lista pública Chery Argentina N°14',
  'https://chery.com.ar/wp-content/uploads/2026/10/20261006_CHERY-ARG-PUBLICA-N°14-OCT26-Segunda.pdf',
  'primaria',
  '6/10/2026, lista N°14',
  'Vigente desde esa fecha hasta su reemplazo. Excluye administrativos, patentamiento, seguro de transporte y flete. La conversión a pesos depende del tipo de cambio al cierre. No certifica que no exista una lista posterior.'
);

const pdf2 = fuente(
  'chery-tiggo2-my25',
  'PDF MY25 Tiggo 2 PRO MAX',
  'https://chery.com.ar/wp-content/uploads/2025/12/MY25_TIGGO2_PRO.pdf',
  'primaria',
  'MY25, archivo en ruta diciembre 2025',
  'Es el documento enlazado para Tiggo 2 PRO MAX Comfort MT y CVT. Los PDF de agosto y diciembre difieren en dirección y en la descripción de la CVT: no se combinan.'
);

const pdf4 = fuente(
  'chery-tiggo4',
  'Ficha técnica Tiggo 4 Pro',
  'https://chery.com.ar/wp-content/uploads/2026/10/FICHA-TECNICA-TIGGO-4-PRO.pdf',
  'primaria',
  'Documento actual, ruta octubre 2026',
  'Versión 1.5T CVT Luxury. El lanzamiento es de 2026: no se atribuye a un supuesto MY2025.'
);

const pdf8 = fuente(
  'chery-tiggo8-my25',
  'PDF MY25 Tiggo 8 Pro',
  'https://chery.com.ar/wp-content/uploads/2025/12/MY25_TIGGO_8_PRO.pdf',
  'primaria',
  'MY25, archivo en ruta diciembre 2025',
  '290T 1.6T 7DCT Luxury. No confirma la ficha de catálogo etiquetada 2023.'
);

const exclusiones =
  'Excluye administrativos, patentamiento, seguro de transporte y flete. Pesos según tipo de cambio acordado al cierre.';

export const cherySheets = [
  ficha({
    id: 'chery-tiggo-2-pro-2025',
    cobertura: 'integrada',
    correspondencia:
      'La página sigue llamándose Tiggo 2 Pro, pero el PDF oficial hoy enlazado es el Tiggo 2 PRO MAX MY25 (Comfort MT y CVT). Esos datos no sustituyen en silencio al nombre de la ficha ni a un supuesto MY2025 genérico. Los precios son solo de esas dos versiones Pro Max.',
    fuentes: [pdf2, lista],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Cilindrada', '1.499 cm³', 'chery-tiggo2-my25'),
        hecho('Configuración', '4 cilindros, 16 válvulas', 'chery-tiggo2-my25'),
        hecho('Potencia', '85 kW / 116 CV a 6.150 rpm', 'chery-tiggo2-my25'),
        hecho('Torque', '138 Nm a 4.000 rpm', 'chery-tiggo2-my25'),
      ], 'Alcance: Tiggo 2 PRO MAX MY25.'),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'MT5 o CVT, según versión Comfort', 'chery-tiggo2-my25'),
        hecho('Tracción', '4x2', 'chery-tiggo2-my25'),
      ], 'La descripción interna de la CVT y de la dirección cambia entre los PDF de agosto y diciembre. No se publica un detalle único.'),
      seccion('dimensiones', 'Dimensiones y capacidades', [
        hecho('Medidas', '4.200 × 1.760 × 1.570 mm', 'chery-tiggo2-my25'),
        hecho('Distancia entre ejes', '2.550 mm', 'chery-tiggo2-my25'),
        hecho('Baúl', '420 L', 'chery-tiggo2-my25'),
        hecho('Tanque', '51 L', 'chery-tiggo2-my25'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '4', 'chery-tiggo2-my25'),
        hecho('Estabilidad', 'ESP', 'chery-tiggo2-my25'),
        hecho('Frenos', 'ABS, EBD y TCS', 'chery-tiggo2-my25'),
      ]),
      seccion('confort', 'Confort y multimedia', [
        hecho('Pantalla', '9 pulgadas', 'chery-tiggo2-my25'),
        hecho('Visión', 'Cámara y sensores', 'chery-tiggo2-my25'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Vehículo', '7 años o 150.000 km, según ese documento', 'chery-tiggo2-my25'),
      ]),
    ],
    conflictos: [
      'Los PDF de agosto y diciembre no describen igual la dirección ni la CVT. Esos puntos quedan sin una versión única.',
    ],
    pendientes: [
      'Falta resolver si el Tiggo 2 Pro de esta URL es el mismo producto que el Tiggo 2 PRO MAX MY25.',
      'Android Auto y Apple CarPlay no están en el extracto de este PDF: no se listan ni se niegan.',
    ],
    precios: [
      precio({
        version: 'Tiggo 2 PRO MAX Comfort MT',
        lista: 23000,
        fechaLista: '6/10/2026',
        vigencia: 'Desde el 6/10/2026 hasta el reemplazo de la lista. No es una vigencia de noviembre.',
        exclusiones,
        fuenteId: 'chery-lista-20261006',
        estado: 'lista-fechada',
      }),
      precio({
        version: 'Tiggo 2 PRO MAX Comfort CVT',
        lista: 25500,
        fechaLista: '6/10/2026',
        vigencia: 'Desde el 6/10/2026 hasta el reemplazo de la lista. No es una vigencia de noviembre.',
        exclusiones,
        fuenteId: 'chery-lista-20261006',
        estado: 'lista-fechada',
      }),
    ],
    public: basePublic({
      descripcion:
        'La ficha argentina vigente que Chery enlaza es el Tiggo 2 PRO MAX MY25, en Comfort manual o CVT. No reemplaza por sí sola el nombre Tiggo 2 Pro de esta página.',
      combustible: 'Nafta',
      transmision: 'MT5 o CVT (Tiggo 2 PRO MAX MY25)',
      precio:
        'USD 23.000 MT / USD 25.500 CVT — solo Tiggo 2 PRO MAX Comfort, lista Chery 6/10/2026 hasta su reemplazo.',
      precioOrden: { moneda: 'USD', monto: 23000 },
      especificaciones: {
        motor: '1.499 cm³ (Tiggo 2 PRO MAX MY25)',
        potencia: '85 kW / 116 CV a 6.150 rpm',
        traccion: '4x2',
        capacidad_tanque: '51 L',
        peso: PEND,
      },
      caracteristicas: [
        'Documento aplicado: Tiggo 2 PRO MAX MY25 Comfort MT y CVT',
        '4 airbags, ESP, ABS, EBD y TCS',
        'Pantalla de 9 pulgadas, cámara y sensores',
        'Garantía del documento: 7 años o 150.000 km',
      ],
      anioNota: anioDe('Tiggo 2 PRO MAX MY25 (PDF de diciembre 2025), no un MY2025 genérico de Tiggo 2 Pro'),
      avisoCorto: 'El PDF vigente es el Tiggo 2 PRO MAX MY25, no un Tiggo 2 Pro genérico.',
      aviso:
        'Chery enlaza el PDF del Tiggo 2 PRO MAX MY25. Los datos y los precios de esta página corresponden solo a Comfort MT y CVT de ese documento. No se presentó como si fueran la ficha previa de “Tiggo 2 Pro 2025”.',
    }),
  }),
  ficha({
    id: 'chery-tiggo-4-pro-2025',
    cobertura: 'integrada',
    correspondencia:
      'La ficha oficial actual es 1.5T CVT Luxury y corresponde a un lanzamiento de 2026. No se atribuye automáticamente a la etiqueta 2025 del catálogo. El ADAS de la lista de precios se muestra aparte de la ficha técnica.',
    fuentes: [pdf4, lista],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Cilindrada', '1.498 cm³, turbo', 'chery-tiggo4'),
        hecho('Potencia', '147 CV / 108 kW', 'chery-tiggo4'),
        hecho('Torque', '210 Nm', 'chery-tiggo4'),
      ], 'Versión documentada: 1.5T CVT Luxury.'),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'CVT', 'chery-tiggo4'),
        hecho('Tracción', 'Delantera', 'chery-tiggo4'),
      ]),
      seccion('dimensiones', 'Dimensiones y capacidades', [
        hecho('Medidas', '4.320 × 1.831 × 1.652 mm', 'chery-tiggo4'),
        hecho('Distancia entre ejes', '2.610 mm', 'chery-tiggo4'),
        hecho('Baúl', '340 L', 'chery-tiggo4'),
        hecho('Tanque', '51 L', 'chery-tiggo4'),
        hecho('Peso en orden de marcha', '1.388 kg', 'chery-tiggo4'),
        hecho('Llantas', '17 pulgadas', 'chery-tiggo4'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '6', 'chery-tiggo4'),
        hecho('Estabilidad', 'ESP y TCS', 'chery-tiggo4'),
        hecho('ADAS en la lista de precios', 'ACC, FCW, AEB, LDW e IHC para la versión de esa lista', 'chery-lista-20261006', 'confirmado', 'No se copia a un supuesto MY2025.'),
      ]),
      seccion('confort', 'Confort y multimedia', [
        hecho('Pantallas', 'Multimedia e instrumental de 10,25 pulgadas', 'chery-tiggo4'),
        hecho('Cámara', '360°', 'chery-tiggo4'),
        hecho('Carga', 'Cargador inalámbrico', 'chery-tiggo4'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Vehículo', '7 años o 150.000 km, según el documento', 'chery-tiggo4'),
      ]),
    ],
    conflictos: [],
    pendientes: [
      'No hay otra versión argentina cerrada en este relevamiento además de Luxury CVT.',
    ],
    precios: [
      precio({
        version: 'Tiggo 4 PRO Luxury FL CVT',
        lista: 28700,
        fechaLista: '6/10/2026',
        vigencia: 'Desde el 6/10/2026 hasta el reemplazo de la lista.',
        exclusiones,
        fuenteId: 'chery-lista-20261006',
        estado: 'lista-fechada',
      }),
    ],
    public: basePublic({
      descripcion:
        'SUV con motor 1.5 turbo. La ficha oficial actual describe la versión Luxury CVT de un lanzamiento 2026, con seis airbags y pantallas de 10,25 pulgadas.',
      combustible: 'Nafta',
      transmision: 'CVT (Luxury 1.5T, documento 2026)',
      precio:
        'USD 28.700 — Tiggo 4 PRO Luxury FL CVT, lista Chery 6/10/2026 hasta su reemplazo.',
      precioOrden: { moneda: 'USD', monto: 28700 },
      especificaciones: {
        motor: '1.498 cm³ turbo',
        potencia: '147 CV / 108 kW',
        traccion: 'Delantera',
        capacidad_tanque: '51 L',
        peso: '1.388 kg en orden de marcha',
      },
      caracteristicas: [
        'Alcance: Luxury 1.5T CVT, lanzamiento 2026',
        '6 airbags, ESP y TCS',
        'Pantallas de 10,25 pulgadas, cámara 360° y cargador inalámbrico',
        'La lista de precios suma ACC, FCW, AEB, LDW e IHC para esa versión',
        'Garantía del documento: 7 años o 150.000 km',
      ],
      anioNota: anioDe('ficha Tiggo 4 Pro Luxury de 2026, no un MY2025'),
      avisoCorto: 'Datos del Luxury CVT 2026, no de un MY2025 genérico.',
    }),
  }),
  ficha({
    id: 'chery-tiggo-8-pro-2023',
    cobertura: 'integrada',
    correspondencia:
      'El PDF es MY25 290T 1.6T 7DCT Luxury y no confirma la ficha que el catálogo etiqueta como 2023. El baúl de 890 L no se muestra como volumen con siete ocupantes. El precio de lista no es el valor viejo de U$S 54.056.',
    fuentes: [pdf8, lista],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Cilindrada', '1.598 cm³ turbo', 'chery-tiggo8-my25'),
        hecho('Potencia', '137 kW / 186 CV a 5.500 rpm', 'chery-tiggo8-my25'),
        hecho('Torque', '290 Nm a 4.000 rpm', 'chery-tiggo8-my25'),
        hecho('Combustible', 'Nafta RON 92', 'chery-tiggo8-my25'),
      ], 'Alcance: MY25 290T 7DCT Luxury.'),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'DCT de 7 marchas', 'chery-tiggo8-my25'),
        hecho('Tracción', 'Delantera', 'chery-tiggo8-my25'),
      ]),
      seccion('dimensiones', 'Dimensiones y capacidades', [
        hecho('Medidas', '4.720 × 1.860 × 1.705 mm', 'chery-tiggo8-my25'),
        hecho('Distancia entre ejes', '2.710 mm', 'chery-tiggo8-my25'),
        hecho('Tanque', '51 L', 'chery-tiggo8-my25'),
        hecho('Peso', '1.629 kg', 'chery-tiggo8-my25'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '6', 'chery-tiggo8-my25'),
        hecho('Estabilidad', 'ESP y TCS', 'chery-tiggo8-my25'),
        hecho('ADAS', 'El PDF indica ADAS en esta versión Luxury', 'chery-tiggo8-my25'),
      ]),
      seccion('confort', 'Confort y multimedia', [
        hecho('Plazas', '7, en la versión Luxury MY25', 'chery-tiggo8-my25'),
        hecho('Pantallas', '12,3 pulgadas de multimedia e instrumental', 'chery-tiggo8-my25'),
        hecho('Audio', 'Sony, 8 parlantes', 'chery-tiggo8-my25'),
        hecho('Cámara', '360°', 'chery-tiggo8-my25'),
        hecho('Techo', 'Panorámico', 'chery-tiggo8-my25'),
        hecho('Asientos delanteros', 'Eléctricos y calefaccionados', 'chery-tiggo8-my25'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Vehículo MY25', '7 años o 150.000 km', 'chery-tiggo8-my25'),
      ]),
    ],
    conflictos: [],
    pendientes: [
      'El PDF publica baúl de 890 L sin una configuración de asientos suficientemente precisa. No se muestra como volumen con siete ocupantes.',
      'Esta evidencia no reconstruye la unidad que el catálogo había fechado en 2023.',
    ],
    precios: [
      precio({
        version: 'Tiggo 8 PRO 290T 1.6T 7DCT Luxury',
        lista: 41800,
        fechaLista: '6/10/2026',
        vigencia: 'Desde el 6/10/2026 hasta el reemplazo de la lista. No valúa una unidad 2023.',
        exclusiones,
        fuenteId: 'chery-lista-20261006',
        estado: 'lista-fechada',
      }),
    ],
    public: basePublic({
      descripcion:
        'SUV de tres filas. Los datos de esta página salen del PDF MY25 290T 7DCT Luxury y de la lista del 6/10/2026. No confirman la ficha etiquetada 2023 ni el precio anterior en pesos.',
      combustible: 'Nafta',
      transmision: 'DCT 7 (MY25 290T Luxury)',
      precio:
        'USD 41.800 — Tiggo 8 PRO 290T 1.6T 7DCT Luxury, lista Chery 6/10/2026 hasta su reemplazo.',
      precioOrden: { moneda: 'USD', monto: 41800 },
      especificaciones: {
        motor: '1.598 cm³ turbo (MY25 290T)',
        potencia: '137 kW / 186 CV a 5.500 rpm',
        traccion: 'Delantera',
        capacidad_tanque: '51 L',
        peso: '1.629 kg',
      },
      caracteristicas: [
        'Alcance: MY25 290T 7DCT Luxury, no la etiqueta 2023',
        '7 plazas en ese documento',
        '6 airbags, ESP, TCS y ADAS',
        'Pantallas de 12,3 pulgadas, audio Sony, cámara 360° y techo panorámico',
        'Garantía MY25: 7 años o 150.000 km',
      ],
      anioNota: anioDe('PDF MY25, que no confirma la etiqueta 2023 del catálogo'),
      avisoCorto: 'Ficha MY25. No confirma el modelo etiquetado 2023.',
    }),
  }),
];
