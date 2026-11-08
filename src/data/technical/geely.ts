import { anioDe, basePublic, ficha, fuente, hecho, PEND, seccion } from './helpers';

const gs = fuente(
  'geely-gs',
  'Ficha histórica Emgrand GS',
  'https://www.geelyautos.com.ar/img/sections/modelos/ficha_geely_emgrand_gs.pdf',
  'historica',
  'Documentación argentina histórica, sin año de edición cerrado en el relevamiento',
  'No acredita MY2025 ni precio actual.'
);
const x7 = fuente(
  'geely-x7',
  'Ficha histórica Emgrand X7 Sport',
  'https://www.geelyautos.com.ar/img/sections/modelos/ficha_geely_emgrand_x7_sport.pdf',
  'historica',
  'Documentación argentina histórica',
  'No respalda un usado 2025 ni un precio 0 km actual.'
);
const x7prensa = fuente(
  'geely-x7-prensa',
  'Lanzamiento en Motor Magazine',
  'https://motormagazine.com.ar/lanzamiento-geely-emgrand-x7-sport-en-argentina/',
  'historica',
  '11/6/2017'
);

const consultar = 'Consultar precio. No hay precio 0 km actual verificable.';

export const geelySheets = [
  ficha({
    id: 'geely-emgrand-gs-2025',
    cobertura: 'historica',
    correspondencia:
      'Ficha histórica GS MT6 / GL MT6 / GSP AT6, todas 1.8 de 140 HP. El ESP y los airbags cambian por versión: GS y GL no traen ESP. Se retira el precio en pesos y la idea de seis airbags para todas.',
    fuentes: [gs],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', '1.8 nafta, 140 HP', 'geely-gs', 'historico'),
        hecho('Versiones', 'GS MT6, GL MT6 y GSP AT6', 'geely-gs', 'historico'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.440 × 1.833 × 1.560 mm', 'geely-gs', 'historico'),
        hecho('Distancia entre ejes', '2.700 mm', 'geely-gs', 'historico'),
        hecho('Neumáticos', 'GS 205/60 R16; GL 225/50 R17; GSP 225/45 R18', 'geely-gs', 'historico'),
      ]),
      seccion('seguridad', 'Seguridad por versión', [
        hecho('GS', '2 airbags y sin ESP', 'geely-gs', 'historico'),
        hecho('GL', '6 airbags y sin ESP', 'geely-gs', 'historico'),
        hecho('GSP', '6 airbags, ESP, TCS y HBA', 'geely-gs', 'historico'),
      ]),
      seccion('confort', 'Confort', [
        hecho('GL y GSP', 'Multimedia de 8 pulgadas y MirrorLink', 'geely-gs', 'historico'),
        hecho('GSP', 'Control de crucero y calefacción', 'geely-gs', 'historico'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Vehículo', '5 años o 150.000 km', 'geely-gs', 'historico'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Tanque, peso y precio actual de 0 km.'],
    precios: [],
    public: basePublic({
      descripcion:
        'Crossover 1.8 de 140 HP en versiones GS, GL y GSP. La GSP tiene ESP; las GS y GL no.',
      combustible: 'Nafta',
      transmision: 'MT6 (GS/GL) o AT6 (GSP)',
      precio: consultar,
      especificaciones: {
        motor: '1.8 nafta',
        potencia: '140 HP',
        traccion: PEND,
        capacidad_tanque: PEND,
        peso: PEND,
      },
      caracteristicas: [
        'GS: 2 airbags y sin ESP; GL: 6 airbags y sin ESP; GSP: 6 airbags y ESP',
        'Garantía: 5 años o 150.000 km',
      ],
      anioNota: anioDe('ficha histórica, sin respaldo de MY2025'),
      avisoCorto: 'Ficha histórica. El ESP no corresponde a todas las versiones.',
    }),
  }),
  ficha({
    id: 'geely-emgrand-x7-sport-2025',
    cobertura: 'historica',
    correspondencia:
      'Ficha histórica: GS 2.0 141 HP MT6 delantera; GL 2.4 162 HP AT6 delantera; GT 2.4 AT6 4WD. ESP de serie en el PDF. La cantidad de airbags queda en conflicto entre el PDF, el concesionario y la prensa. Se retiran el precio de usado 2025 y el tanque de 60 L.',
    fuentes: [x7, x7prensa],
    secciones: [
      seccion('motor', 'Motores por versión', [
        hecho('GS', '2.0, 141 HP, manual de 6 marchas, tracción delantera', 'geely-x7', 'historico'),
        hecho('GL', '2.4, 162 HP, automática de 6 marchas, tracción delantera', 'geely-x7', 'historico'),
        hecho('GT', '2.4, automática de 6 marchas, 4WD', 'geely-x7', 'historico'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.519 × 1.831 × 1.694 mm', 'geely-x7', 'historico'),
        hecho('Distancia entre ejes', '2.670 mm', 'geely-x7', 'historico'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y trasera independiente', 'geely-x7', 'historico'),
        hecho('Frenos', 'Discos ventilados', 'geely-x7', 'historico'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('ESP', 'De serie', 'geely-x7', 'historico'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Multimedia', '8 pulgadas, USB, AUX y Bluetooth', 'geely-x7', 'historico'),
        hecho('GL y GT', 'Climatizador bizona', 'geely-x7', 'historico'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Histórica', '5 años o 150.000 km en esa documentación', 'geely-x7', 'historico'),
      ]),
    ],
    conflictos: [
      'Airbags: el PDF enumera doble frontal y cortina en GL/GT; una página de concesionario dice seis y la prensa histórica dice cuatro. No se afirma una cantidad.',
    ],
    pendientes: ['Tanque, peso y cualquier precio actual, de 0 km o de usado.'],
    precios: [],
    public: basePublic({
      descripcion:
        'SUV familiar con dos motorizaciones: 2.0 de 141 HP o 2.4 de 162 HP, según versión.',
      combustible: 'Nafta',
      transmision: 'MT6, AT6 o AT6 4WD, según versión',
      precio: consultar,
      especificaciones: {
        motor: '2.0 o 2.4, según versión',
        potencia: '141 HP (2.0) / 162 HP (2.4)',
        traccion: 'Delantera en GS/GL; 4WD en GT',
        capacidad_tanque: PEND,
        peso: PEND,
      },
      caracteristicas: [
        'Fuente histórica, lanzamiento de prensa 11/6/2017',
        'ESP de serie',
        'Multimedia de 8 pulgadas; climatizador bizona en GL y GT',
        'Garantía: 5 años o 150.000 km',
      ],
      anioNota: anioDe('ficha histórica y prensa del 11/6/2017'),
      avisoCorto: 'Ficha histórica. Se retiró el precio de usado 2025.',
    }),
  }),
];
