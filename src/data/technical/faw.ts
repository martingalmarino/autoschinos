import { anioDe, basePublic, ficha, fuente, hecho, PEND, seccion } from './helpers';

const actis = fuente(
  'faw-actis',
  'Ficha FAW Actis del importador, vía concesionario',
  'https://famlylaplata.com.ar/fichas/ficha-tecnica-faw-actis.pdf',
  'primaria',
  'PDF argentino distribuido por concesionario',
  'Desmiente el 1.0 de 60 HP.'
);
const t33 = fuente(
  'faw-t33',
  'Novedad del importador sobre T33',
  'https://famly.com.ar/site/novedad/61',
  'primaria',
  '11/1/2023',
  'Confirma motor y caja. La ficha PDF de otro concesionario no se enlaza: no pudo recuperarse.'
);

const motorActis = [
  hecho('Motor', '1.5 nafta', 'faw-actis'),
  hecho('Potencia', '102 CV entre 5.600 y 6.000 rpm', 'faw-actis'),
  hecho('Torque', '135 Nm entre 4.000 y 4.600 rpm', 'faw-actis'),
  hecho('Caja', 'Manual de 5 marchas', 'faw-actis'),
  hecho('Tanque', '45 L', 'faw-actis'),
];
const consultar = 'Consultar precio. Sin lista vigente en este relevamiento.';

export const fawSheets = [
  ficha({
    id: 'faw-actis-truck-2025',
    cobertura: 'integrada',
    correspondencia:
      'Actis Truck: 1.5 de 102 CV, no 1.0 de 60 HP. Tanque 45 L y carga 650 kg. Caja abierta de 2,70 m.',
    fuentes: [actis],
    secciones: [
      seccion('motor', 'Motor', motorActis),
      seccion('dimensiones', 'Dimensiones y caja', [
        hecho('Medidas', '4.620 × 1.675 × 1.955 mm', 'faw-actis'),
        hecho('Distancia entre ejes', '2.960 mm', 'faw-actis'),
        hecho('Caja', '2.700 × 1.585 × 340 mm', 'faw-actis'),
        hecho('Carga', '650 kg', 'faw-actis'),
        hecho('Neumáticos', '175/70 R14LT', 'faw-actis'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y ballestas', 'faw-actis'),
        hecho('Frenos', 'Disco y tambor', 'faw-actis'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '2', 'faw-actis'),
        hecho('Frenos', 'ABS y EBD', 'faw-actis'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Habitáculo', 'Radio USB, aire acondicionado y dirección eléctrica', 'faw-actis'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Tracción no explícita en el extracto.', 'Precio vigente.'],
    precios: [],
    public: basePublic({
      descripcion:
        'Mini truck de caja abierta. La ficha del importador indica 1.5 de 102 CV y 650 kg de carga, no el 1.0 de 60 HP publicado antes.',
      combustible: 'Nafta',
      transmision: 'Manual 5 velocidades',
      precio: consultar,
      especificaciones: {
        motor: '1.5 nafta',
        potencia: '102 CV entre 5.600 y 6.000 rpm',
        traccion: PEND,
        capacidad_tanque: '45 L',
        peso: PEND,
      },
      caracteristicas: [
        'Carga 650 kg y caja de 2,70 m',
        '2 airbags, ABS y EBD',
        'Radio USB, aire acondicionado y dirección eléctrica',
      ],
      anioNota: anioDe('ficha del importador; no certifica la etiqueta 2025'),
      avisoCorto: '1.5 de 102 CV. Se retiró el 1.0 de 60 HP.',
    }),
  }),
  ficha({
    id: 'faw-actis-box-2025',
    cobertura: 'integrada',
    correspondencia:
      'Actis Box con el mismo 1.5 de 102 CV. Volumen 6,44 m³ y carga 650 kg. Se retiran 1.0, 60 HP, tanque de 37 L y peso aproximado.',
    fuentes: [actis],
    secciones: [
      seccion('motor', 'Motor', motorActis),
      seccion('dimensiones', 'Dimensiones y caja', [
        hecho('Medidas', '4.760 × 1.760 × 2.470 mm', 'faw-actis'),
        hecho('Distancia entre ejes', '2.960 mm', 'faw-actis'),
        hecho('Caja', '2.550 × 1.560 × 1.620 mm, 6,44 m³', 'faw-actis'),
        hecho('Carga', '650 kg', 'faw-actis'),
        hecho('Neumáticos', '175/70 R14LT', 'faw-actis'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y ballestas', 'faw-actis'),
        hecho('Frenos', 'Disco y tambor', 'faw-actis'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '2', 'faw-actis'),
        hecho('Frenos', 'ABS y EBD', 'faw-actis'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Habitáculo', 'Radio USB, aire acondicionado y dirección eléctrica', 'faw-actis'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Precio vigente.'],
    precios: [],
    public: basePublic({
      descripcion:
        'Furgón cerrado Actis Box: 1.5 de 102 CV, 6,44 m³ y 650 kg de carga según la ficha del importador.',
      combustible: 'Nafta',
      transmision: 'Manual 5 velocidades',
      precio: consultar,
      especificaciones: {
        motor: '1.5 nafta',
        potencia: '102 CV entre 5.600 y 6.000 rpm',
        traccion: PEND,
        capacidad_tanque: '45 L',
        peso: PEND,
      },
      caracteristicas: [
        'Volumen 6,44 m³ y carga 650 kg',
        '2 airbags, ABS y EBD',
        'Radio USB, aire acondicionado y dirección eléctrica',
      ],
      anioNota: anioDe('ficha del importador; no certifica la etiqueta 2025'),
      avisoCorto: '1.5 de 102 CV. Se retiró el 1.0 de 60 HP.',
    }),
  }),
  ficha({
    id: 'faw-t33-2025',
    cobertura: 'historica',
    correspondencia:
      'La novedad del importador del 11/1/2023 confirma 1.2 turbo de inyección directa, 143 CV, 4 cilindros y 16 válvulas, con DCT de 7 marchas. No se recuperó la ficha de dimensiones. Se retiran tanque de 50 L, peso, 6 airbags, ESP y el largo de 4,3 m.',
    fuentes: [t33],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', '1.2 turbo, inyección directa, 4 cilindros y 16 válvulas', 'faw-t33', 'historico'),
        hecho('Potencia', '143 CV', 'faw-t33', 'historico'),
        hecho('Caja', 'DCT de 7 marchas', 'faw-t33', 'historico'),
      ], 'Comunicación del 11/1/2023. No trae el resto de la ficha.'),
    ],
    conflictos: [],
    pendientes: [
      'Torque, dimensiones, tracción, tanque, peso y matriz de seguridad o equipamiento.',
      'La ficha PDF de Pesado Castro no se enlaza: la página fallaba.',
      'Precio vigente.',
    ],
    precios: [],
    public: basePublic({
      descripcion:
        'SUV del que el importador confirmó, el 11/1/2023, un 1.2 turbo de 143 CV y DCT de 7 marchas. El resto de la ficha sigue pendiente.',
      combustible: 'Nafta',
      transmision: 'DCT 7',
      precio: consultar,
      especificaciones: {
        motor: '1.2 turbo inyección directa',
        potencia: '143 CV',
        traccion: PEND,
        capacidad_tanque: PEND,
        peso: PEND,
      },
      caracteristicas: [
        'Dato del importador, 11/1/2023',
        '4 cilindros y 16 válvulas',
      ],
      anioNota: anioDe('comunicación del 11/1/2023, no una ficha MY2025'),
      avisoCorto: 'Solo motor y caja están confirmados. El resto se retiró.',
    }),
  }),
];
