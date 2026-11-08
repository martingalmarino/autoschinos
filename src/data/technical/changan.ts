import { anioDe, basePublic, ficha, fuente, hecho, PEND, seccion } from './helpers';

const pdf = fuente(
  'changan-2019',
  'Ficha Changan pick-up, Cargo Box y Cargo Van',
  'https://motormagazine.com.ar/wp-content/uploads/2019/03/Ficha-Tecnica-Changan-Pick-up-Cargo-Box-y-Cargo-Van.pdf',
  'historica',
  'PDF de 2019, alojado por la prensa y leído en tabla',
  'Motor común de las tres carrocerías. No es una ficha 2025.'
);
const nota = fuente(
  'changan-nota',
  'Lanzamiento en Motor Magazine',
  'https://motormagazine.com.ar/lanzamiento-changan-pickup-cargo-box-y-cargo-van/',
  'historica',
  'Cobertura del lanzamiento, 2019',
  'Garantía histórica de 4 años o 100.000 km. La página oficial vieja del box refrigerado hoy no se recomienda.'
);

const motor = [
  hecho('Cilindrada', '1.243 cm³ nafta', 'changan-2019', 'historico'),
  hecho('Potencia', '92 HP a 6.000 rpm', 'changan-2019', 'historico'),
  hecho('Torque', '113 Nm a 4.800 rpm', 'changan-2019', 'historico'),
  hecho('Caja', 'Manual de 5 marchas', 'changan-2019', 'historico'),
  hecho('Tracción', 'Trasera', 'changan-2019', 'historico'),
  hecho('Tanque', '40 L', 'changan-2019', 'historico'),
];

const anio = anioDe('PDF argentino de 2019, no una ficha vigente 2025');
const consultar = 'Consultar precio. Sin lista vigente en este relevamiento.';

export const changanSheets = [
  ficha({
    id: 'changan-md201-cargo-box-2025',
    cobertura: 'historica',
    correspondencia:
      'MD201 Cargo Box en el PDF de 2019: 92 HP, no 97. Carga 855 kg. Garantía histórica de 4 años o 100.000 km.',
    fuentes: [pdf, nota],
    secciones: [
      seccion('motor', 'Motor', motor, 'Fuente histórica de 2019, común a las tres carrocerías.'),
      seccion('dimensiones', 'Dimensiones y caja', [
        hecho('Medidas', '4.615 × 1.620 × 2.265 mm', 'changan-2019', 'historico'),
        hecho('Distancia entre ejes', '2.900 mm', 'changan-2019', 'historico'),
        hecho('Caja', '2.625 × 1.500 × 1.500 mm', 'changan-2019', 'historico'),
        hecho('Carga', '855 kg', 'changan-2019', 'historico'),
        hecho('Neumáticos', '175/70 R14LT', 'changan-2019', 'historico'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y ballestas', 'changan-2019', 'historico'),
        hecho('Frenos', 'Disco y tambor', 'changan-2019', 'historico'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '2', 'changan-2019', 'historico'),
        hecho('Frenos', 'ABS', 'changan-2019', 'historico'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Habitáculo', 'Aire acondicionado y radio AM/FM/AUX', 'changan-2019', 'historico'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Lanzamiento', '4 años o 100.000 km', 'changan-nota', 'historico'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Ficha y precio vigentes.'],
    precios: [],
    public: basePublic({
      descripcion:
        'Furgón de caja cerrada MD201 según el PDF argentino de 2019: 1.243 cm³, 92 HP y 855 kg de carga. Es fuente histórica.',
      combustible: 'Nafta',
      transmision: 'Manual 5 velocidades',
      precio: consultar,
      especificaciones: {
        motor: '1.243 cm³ (PDF 2019)',
        potencia: '92 HP a 6.000 rpm',
        traccion: 'Trasera',
        capacidad_tanque: '40 L',
        peso: PEND,
      },
      caracteristicas: [
        'Fuente histórica de 2019',
        '2 airbags, ABS y aire acondicionado',
        'Carga 855 kg',
        'Garantía histórica de 4 años o 100.000 km',
      ],
      anioNota: anio,
      avisoCorto: 'PDF de 2019: 92 HP, no 97.',
    }),
  }),
  ficha({
    id: 'changan-md201-cargo-van-2025',
    cobertura: 'historica',
    correspondencia:
      'En la documentación argentina de 2019 el furgón se llama M201 Cargo Van, no MD201. Mide distinto del box y carga 650 kg. El nombre de la página se corrigió y la URL anterior redirige.',
    fuentes: [pdf, nota],
    secciones: [
      seccion('motor', 'Motor', motor, 'Mismo motor histórico de 2019.'),
      seccion('dimensiones', 'Dimensiones y caja', [
        hecho('Medidas', '3.980 × 1.620 × 1.890 mm', 'changan-2019', 'historico'),
        hecho('Distancia entre ejes', '2.560 mm', 'changan-2019', 'historico'),
        hecho('Carga', '650 kg', 'changan-2019', 'historico'),
        hecho('Caja', '2.130 × 1.252 × 1.380 mm', 'changan-2019', 'historico'),
        hecho('Neumáticos', '165/70 R14LT', 'changan-2019', 'historico'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y ballestas', 'changan-2019', 'historico'),
        hecho('Frenos', 'Disco y tambor', 'changan-2019', 'historico'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '2', 'changan-2019', 'historico'),
        hecho('Frenos', 'ABS', 'changan-2019', 'historico'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Habitáculo', 'Aire acondicionado y radio AM/FM/AUX', 'changan-2019', 'historico'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Lanzamiento', '4 años o 100.000 km', 'changan-nota', 'historico'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Ficha y precio vigentes.'],
    precios: [],
    public: basePublic({
      descripcion:
        'Furgón que la ficha argentina de 2019 denomina M201 Cargo Van, no MD201. Motor 1.243 cm³ de 92 HP y carga de 650 kg.',
      combustible: 'Nafta',
      transmision: 'Manual 5 velocidades',
      categoria: 'Van de carga',
      precio: consultar,
      especificaciones: {
        motor: '1.243 cm³ (PDF 2019)',
        potencia: '92 HP a 6.000 rpm',
        traccion: 'Trasera',
        capacidad_tanque: '40 L',
        peso: PEND,
      },
      caracteristicas: [
        'Denominación documental: M201 Cargo Van',
        'Fuente histórica de 2019',
        'Carga 650 kg',
        '2 airbags y ABS',
      ],
      anioNota: anio,
      avisoCorto: 'Se llama M201, no MD201. Datos del PDF de 2019.',
      aviso:
        'El nombre publicado MD201 Cargo Van no coincide con el furgón argentino del PDF de 2019, que es M201 Cargo Van. La URL vieja redirige a este nombre. Los 97 HP se reemplazaron por los 92 HP de esa ficha histórica.',
    }),
  }),
  ficha({
    id: 'changan-md201-pickup-2025',
    cobertura: 'historica',
    correspondencia:
      'MD201 Pickup del mismo PDF de 2019. Carga 950 kg y caja de 2,75 m. Potencia 92 HP, no 97.',
    fuentes: [pdf, nota],
    secciones: [
      seccion('motor', 'Motor', motor, 'Fuente histórica de 2019.'),
      seccion('dimensiones', 'Dimensiones y caja', [
        hecho('Medidas', '4.560 × 1.645 × 1.890 mm', 'changan-2019', 'historico'),
        hecho('Distancia entre ejes', '2.900 mm', 'changan-2019', 'historico'),
        hecho('Caja', '2.750 × 1.520 × 370 mm', 'changan-2019', 'historico'),
        hecho('Carga', '950 kg', 'changan-2019', 'historico'),
        hecho('Neumáticos', '175/70 R14LT', 'changan-2019', 'historico'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y ballestas', 'changan-2019', 'historico'),
        hecho('Frenos', 'Disco y tambor', 'changan-2019', 'historico'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '2', 'changan-2019', 'historico'),
        hecho('Frenos', 'ABS', 'changan-2019', 'historico'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Habitáculo', 'Aire acondicionado y radio AM/FM/AUX', 'changan-2019', 'historico'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Lanzamiento', '4 años o 100.000 km', 'changan-nota', 'historico'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Ficha y precio vigentes.'],
    precios: [],
    public: basePublic({
      descripcion:
        'Pickup MD201 del PDF de 2019: 92 HP, caja de 2,75 m y 950 kg de carga. No es una ficha vigente.',
      combustible: 'Nafta',
      transmision: 'Manual 5 velocidades',
      precio: consultar,
      especificaciones: {
        motor: '1.243 cm³ (PDF 2019)',
        potencia: '92 HP a 6.000 rpm',
        traccion: 'Trasera',
        capacidad_tanque: '40 L',
        peso: PEND,
      },
      caracteristicas: [
        'Fuente histórica de 2019',
        'Carga 950 kg',
        '2 airbags, ABS y aire acondicionado',
      ],
      anioNota: anio,
      avisoCorto: 'PDF de 2019: 92 HP y carga de 950 kg.',
    }),
  }),
];
