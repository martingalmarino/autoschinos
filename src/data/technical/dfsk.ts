import { anioDe, basePublic, ficha, fuente, hecho, PEND, precio, seccion } from './helpers';

const c31 = fuente(
  'dfsk-c31',
  'Brochure DFSK C31',
  'https://dfsk.ar/wp-content/uploads/2025/07/DFSK-Brochure-C31.pdf',
  'primaria',
  'Brochure de ruta julio 2025',
  'No se combina con el PDF de 2026 ni con versiones Plus históricas.'
);
const c31b = fuente(
  'dfsk-c31-2026',
  'PDF C31 2026',
  'https://dfsk.ar/wp-content/uploads/2026/02/C31.pdf',
  'primaria',
  'Ruta febrero 2026',
  'Existe, pero sus datos no se mezclan con el brochure de julio 2025.'
);
const c32 = fuente(
  'dfsk-c32',
  'Brochure DFSK C32',
  'https://dfsk.ar/wp-content/uploads/2025/07/DFSK-Brochure-C32.pdf',
  'primaria',
  'Brochure de ruta julio 2025'
);
const c35 = fuente(
  'dfsk-c35',
  'Brochure DFSK C35',
  'https://dfsk.ar/wp-content/uploads/2025/07/DFSK-Brochure-C35-1.pdf',
  'primaria',
  'Brochure de ruta julio 2025',
  'La distancia entre ejes impresa no se usa: parece una trocha.'
);
const glory = fuente(
  'dfsk-glory',
  'Brochure Glory 500',
  'https://dfsk.ar/wp-content/uploads/2025/10/Brochure_Glory_500.pdf',
  'primaria',
  'Brochure de ruta octubre 2025',
  'No confirma ESP.'
);
const catalogo = fuente(
  'dfsk-autocosmos',
  'Catálogo secundario Autocosmos',
  'https://www.autocosmos.com.ar/catalogo/segmentos/dfsk',
  'secundaria',
  'Página abierta en la consulta, sin fecha de lista demostrable',
  'No prueba actualidad ni que el precio corresponda al lote de los PDF nuevos.'
);

const motorComun = [
  hecho('Motor', '1.5 nafta MPI por cadena', 'dfsk-c31'),
  hecho('Potencia', '101 CV a 6.000 rpm', 'dfsk-c31'),
  hecho('Torque', '136 Nm a 3.600 rpm', 'dfsk-c31'),
  hecho('Caja', 'Manual de 5 marchas', 'dfsk-c31'),
  hecho('Tanque', '55 L', 'dfsk-c31'),
];

const anio = anioDe('brochure argentino de julio 2025; no se fusiona con el PDF de febrero 2026');

export const dfskSheets = [
  ficha({
    id: 'dfsk-c31-2025',
    cobertura: 'integrada',
    correspondencia:
      'Datos del brochure de julio 2025. Hay un PDF de febrero 2026 que no se combina. La carga publicada es 1.000 kg, no 1.250 kg. El precio secundario de C31 Plus no se presenta como lista oficial de este PDF.',
    fuentes: [c31, c31b, catalogo],
    secciones: [
      seccion('motor', 'Motor', motorComun, 'Motor común de la serie en los folletos de julio 2025.'),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'Manual de 5 marchas', 'dfsk-c31'),
      ], 'El extracto no explicita el eje de tracción. No se afirma tracción trasera.'),
      seccion('dimensiones', 'Dimensiones y caja', [
        hecho('Medidas', '4.730 × 1.655 × 1.960 mm', 'dfsk-c31'),
        hecho('Distancia entre ejes', '3.050 mm', 'dfsk-c31'),
        hecho('Caja', '2.900 × 1.540 × 370 mm', 'dfsk-c31'),
        hecho('Carga', '1.000 kg', 'dfsk-c31'),
        hecho('Neumáticos', '185R14LT 8PR', 'dfsk-c31'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y ballestas', 'dfsk-c31'),
        hecho('Frenos', 'Discos y tambores', 'dfsk-c31'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '2', 'dfsk-c31'),
        hecho('Estabilidad', 'ESP, ABS y EBD', 'dfsk-c31'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Habitáculo', 'Aire acondicionado, radio MP3/SD y levantavidrios', 'dfsk-c31'),
      ]),
    ],
    conflictos: [],
    pendientes: [
      'Diferencias del PDF de febrero 2026 y de una versión Plus respecto de este brochure.',
    ],
    precios: [
      precio({
        version: 'C31 Plus (denominación del catálogo secundario, no identificada con el brochure de julio 2025)',
        lista: 18500,
        fechaLista: 'no explicitada',
        vigencia: 'Sin vigencia demostrable.',
        fuenteId: 'dfsk-autocosmos',
        estado: 'secundario-sin-vigencia',
        nota: 'No se presenta como lista oficial ni como precio del PDF de julio 2025.',
      }),
    ],
    public: basePublic({
      descripcion:
        'Pick-up cabina simple del brochure argentino de julio 2025: 1.5 de 101 CV, caja de 2,90 m y 1.000 kg de carga publicada.',
      combustible: 'Nafta',
      transmision: 'Manual 5 velocidades',
      precio:
        'Referencia secundaria sin fecha: C31 Plus USD 18.500. No prueba vigencia ni el lote del PDF.',
      especificaciones: {
        motor: '1.5 MPI',
        potencia: '101 CV a 6.000 rpm',
        traccion: PEND,
        capacidad_tanque: '55 L',
        peso: PEND,
      },
      caracteristicas: [
        'Brochure de julio 2025, sin mezclar el PDF de 2026',
        '2 airbags, ESP, ABS y EBD',
        'Carga publicada 1.000 kg',
      ],
      anioNota: anio,
      avisoCorto: 'Carga 1.000 kg. El PDF 2026 no se mezcló.',
    }),
  }),
  ficha({
    id: 'dfsk-c32-2025',
    cobertura: 'integrada',
    correspondencia:
      'Brochure de julio 2025: carga 1.000 kg y PBV 2.315 kg. Se retiran 1.200 kg y 2.295 kg. El USD 19.500 es referencia secundaria sin fecha, no una lista oficial demostrada.',
    fuentes: [c32, catalogo],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', '1.5 nafta MPI por cadena', 'dfsk-c32'),
        hecho('Potencia', '101 CV a 6.000 rpm', 'dfsk-c32'),
        hecho('Torque', '136 Nm a 3.600 rpm', 'dfsk-c32'),
        hecho('Caja', 'Manual de 5 marchas', 'dfsk-c32'),
        hecho('Tanque', '55 L', 'dfsk-c32'),
      ]),
      seccion('transmision', 'Transmisión', [
        hecho('Caja', 'Manual de 5 marchas', 'dfsk-c32'),
      ], 'El extracto no explicita el eje de tracción.'),
      seccion('dimensiones', 'Dimensiones y caja', [
        hecho('Medidas', '4.740 × 1.655 × 1.910 mm', 'dfsk-c32'),
        hecho('Distancia entre ejes', '3.050 mm', 'dfsk-c32'),
        hecho('Caja', '2.060 × 1.540 × 370 mm', 'dfsk-c32'),
        hecho('Plazas', '5', 'dfsk-c32'),
        hecho('Carga', '1.000 kg', 'dfsk-c32'),
        hecho('PBV', '2.315 kg', 'dfsk-c32'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y ballestas', 'dfsk-c32'),
        hecho('Frenos', 'Discos y tambores', 'dfsk-c32'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '2', 'dfsk-c32'),
        hecho('Estabilidad', 'ESP, ABS y EBD', 'dfsk-c32'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Habitáculo', 'Aire acondicionado, radio MP3/SD y levantavidrios', 'dfsk-c32'),
      ]),
    ],
    conflictos: [],
    pendientes: [],
    precios: [
      precio({
        version: 'C32 en catálogo secundario',
        lista: 19500,
        fechaLista: 'no explicitada',
        vigencia: 'Sin vigencia demostrable. No es “lista oficial”.',
        fuenteId: 'dfsk-autocosmos',
        estado: 'secundario-sin-vigencia',
      }),
    ],
    public: basePublic({
      descripcion:
        'Pick-up doble cabina del brochure de julio 2025: 1.5 de 101 CV, cinco plazas, carga de 1.000 kg y PBV de 2.315 kg.',
      combustible: 'Nafta',
      transmision: 'Manual 5 velocidades',
      precio:
        'Referencia secundaria sin fecha: USD 19.500. No es una lista oficial con vigencia demostrada.',
      especificaciones: {
        motor: '1.5 MPI',
        potencia: '101 CV a 6.000 rpm',
        traccion: PEND,
        capacidad_tanque: '55 L',
        peso: 'PBV 2.315 kg',
      },
      caracteristicas: [
        '5 pasajeros',
        'Carga 1.000 kg y caja de 2,06 m',
        '2 airbags, ESP, ABS y EBD',
      ],
      anioNota: anioDe('brochure de julio 2025'),
    }),
  }),
  ficha({
    id: 'dfsk-c35-2025',
    cobertura: 'integrada',
    correspondencia:
      'Mismo 1.5 de 101 CV. Volumen 5,1 m³ y carga 1.000 kg. La distancia entre ejes de 1.435 mm del PDF no se publica. Se retiran 115 HP y la carga de 840–900 kg.',
    fuentes: [c35, catalogo],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', '1.5 nafta MPI por cadena', 'dfsk-c35'),
        hecho('Potencia', '101 CV a 6.000 rpm', 'dfsk-c35'),
        hecho('Torque', '136 Nm a 3.600 rpm', 'dfsk-c35'),
        hecho('Caja', 'Manual de 5 marchas', 'dfsk-c35'),
        hecho('Tanque', '55 L', 'dfsk-c35'),
      ]),
      seccion('dimensiones', 'Caja', [
        hecho('Medidas exteriores', '4.500 × 1.680 × 2.000 mm', 'dfsk-c35'),
        hecho('Caja', '2.600 × 1.520 × 1.330 mm', 'dfsk-c35'),
        hecho('Volumen', '5,1 m³', 'dfsk-c35'),
        hecho('Carga', '1.000 kg', 'dfsk-c35'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y ballestas', 'dfsk-c35'),
        hecho('Frenos', 'Discos y tambores', 'dfsk-c35'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '2', 'dfsk-c35'),
        hecho('Estabilidad', 'ESP, ABS y EBD', 'dfsk-c35'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Habitáculo', 'Cámara trasera y multimedia de 10 pulgadas, además de AA y radio', 'dfsk-c35'),
      ]),
    ],
    conflictos: [
      'El PDF imprime distancia entre ejes 1.435 mm. Parece una trocha y no se publica como dato de la ficha.',
    ],
    pendientes: ['Distancia entre ejes fiable.'],
    precios: [
      precio({
        version: 'C35 Plus en catálogo secundario',
        lista: 21500,
        fechaLista: 'no explicitada',
        vigencia: 'Sin vigencia demostrable.',
        fuenteId: 'dfsk-autocosmos',
        estado: 'secundario-sin-vigencia',
        nota: 'El sitio lo llamaba estimado. Sigue sin fecha de lista.',
      }),
    ],
    public: basePublic({
      descripcion:
        'Furgón del brochure de julio 2025: 1.5 de 101 CV, 5,1 m³ y 1.000 kg de carga. La distancia entre ejes del PDF no se usa.',
      combustible: 'Nafta',
      transmision: 'Manual 5 velocidades',
      precio:
        'Referencia secundaria sin fecha: C35 Plus USD 21.500. No prueba vigencia.',
      especificaciones: {
        motor: '1.5 MPI',
        potencia: '101 CV a 6.000 rpm',
        traccion: PEND,
        capacidad_tanque: '55 L',
        peso: PEND,
      },
      caracteristicas: [
        'Volumen 5,1 m³ y carga 1.000 kg',
        '2 airbags, ESP, ABS y EBD',
        'Cámara trasera y pantalla de 10 pulgadas',
      ],
      anioNota: anioDe('brochure de julio 2025'),
      avisoCorto: 'La distancia entre ejes del PDF no se publica.',
    }),
  }),
  ficha({
    id: 'dfsk-glory-500-2025',
    cobertura: 'integrada',
    correspondencia:
      '1.498 cm³, 85 kW/114 HP y CVT. El folleto no confirma ESP: se retira. También se retira la garantía de 3 años o 60.000 km, que ese documento no respalda. El precio en pesos es referencia secundaria sin fecha.',
    fuentes: [glory, catalogo],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Código y cilindrada', 'SFG15A, 1.498 cm³', 'dfsk-glory'),
        hecho('Potencia', '85 kW / 114 HP a 6.000 rpm', 'dfsk-glory'),
        hecho('Torque', '147,5 Nm entre 2.800 y 3.600 rpm', 'dfsk-glory'),
      ]),
      seccion('transmision', 'Transmisión', [
        hecho('Caja', 'CVT secuencial', 'dfsk-glory'),
        hecho('Tanque', '50 L', 'dfsk-glory'),
        hecho('Baúl', '318 L', 'dfsk-glory'),
      ]),
      seccion('chasis', 'Frenos', [
        hecho('Frenos', 'Discos en las cuatro ruedas', 'dfsk-glory'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '2', 'dfsk-glory'),
        hecho('Frenos y control', 'ABS y EBD', 'dfsk-glory'),
        hecho('Otros', 'TPMS, ISOFIX y cámara trasera', 'dfsk-glory'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Multimedia', 'Pantalla de 7 pulgadas', 'dfsk-glory'),
        hecho('Interior', 'Ecocuero y control de crucero', 'dfsk-glory'),
      ]),
    ],
    conflictos: [],
    pendientes: [
      'ESP: el folleto no lo confirma. No se lista como equipado ni como ausente.',
      'Garantía de esta edición.',
    ],
    precios: [
      precio({
        version: 'Glory 500 en catálogo secundario',
        moneda: 'ARS',
        lista: 31000000,
        fechaLista: 'no explicitada',
        vigencia: 'Sin vigencia demostrable.',
        fuenteId: 'dfsk-autocosmos',
        estado: 'secundario-sin-vigencia',
      }),
    ],
    public: basePublic({
      descripcion:
        'SUV compacto del brochure de octubre 2025: 1.5 de 114 HP y CVT. El folleto acredita dos airbags, ABS y EBD.',
      combustible: 'Nafta',
      transmision: 'CVT secuencial',
      precio:
        'Referencia secundaria sin fecha: ARS 31.000.000. No prueba vigencia.',
      especificaciones: {
        motor: '1.498 cm³ SFG15A',
        potencia: '85 kW / 114 HP a 6.000 rpm',
        traccion: PEND,
        capacidad_tanque: '50 L',
        peso: PEND,
      },
      caracteristicas: [
        '2 airbags, ABS, EBD, TPMS, ISOFIX y cámara trasera',
        'Pantalla de 7 pulgadas, ecocuero y control de crucero',
        'Discos en las cuatro ruedas',
      ],
      anioNota: anioDe('brochure de octubre 2025'),
      avisoCorto: 'ESP no confirmado por el folleto: se retiró.',
    }),
  }),
];
