import { anioDe, basePublic, ficha, fuente, hecho, PEND, precio, seccion } from './helpers';

const s2 = fuente(
  'jac-s2',
  'Folleto JAC S2',
  'https://jacargentina.com.ar/wp-content/uploads/2025/01/JACS2-FL-Folleto-digital-2025.pdf',
  'primaria',
  'El documento declara características de agosto de 2025; la ruta dice 2025/01',
  'Intelligent MT y Luxury CVT. Potencia en conflicto interno.'
);
const t8 = fuente(
  'jac-t8',
  'Folleto JAC T8 Intelligent',
  'https://jacargentina.com.ar/wp-content/uploads/2023/07/Folleto-digital-JACT8-Intelligent_opt.pdf',
  'historica',
  'Marzo de 2023',
  'Referencia histórica local. No certifica un MY2024.'
);
const x200 = fuente(
  'jac-x200',
  'Ficha técnica JAC X200',
  'https://jacargentina.com.ar/wp-content/uploads/2018/08/20251203_jacx200_fichatecnica.pdf',
  'primaria',
  'Archivo 20251203. La carpeta 2018/08 no es la fecha del contenido.',
  'Separa diésel Luxury y nafteras. No se mezclan.'
);
const x200web = fuente(
  'jac-x200-web',
  'Página oficial JAC X200',
  'https://jacargentina.com.ar/modelos/jacx200/',
  'primaria',
  'Página oficial vigente en la consulta',
  'Publica garantía de 5 años o 150.000 km.'
);
const lista = fuente(
  'jac-lista-mayo-2026',
  'Lista JAC reproducida por prensa',
  'https://autofans.com.ar/wp-content/uploads/2026/05/Lista-de-precios-JAC-P-MAYO.pdf',
  'secundaria',
  'Vigencia 1/5/2026',
  'Histórica respecto de noviembre 2026. IVA incluido excepto Tierra del Fuego. No incluye flete, seguro de transporte ni patentamiento. Aunque la tabla imprime $, el pie declara dólares.'
);

const jacPrecioNota =
  'Lista con vigencia 1/5/2026. No está vigente por el solo hecho de consultar el 8/11/2026.';

export const jacSheets = [
  ficha({
    id: 'jac-s2-2025',
    cobertura: 'integrada',
    correspondencia:
      'Intelligent MT y Luxury CVT. La tabla dice 111 CV/83 kW y la portada 105 CV: no se publica el rango 105–113. Las llantas del folleto son 205/55 R16, no 17 pulgadas. El precio es la lista de mayo 2026, histórica.',
    fuentes: [s2, lista],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Cilindrada', '1.499 cm³', 'jac-s2'),
        hecho('Torque', '146 Nm entre 3.500 y 4.500 rpm', 'jac-s2'),
        hecho('Combustible', 'Nafta', 'jac-s2'),
      ]),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Cajas', 'Manual en Intelligent y CVT en Luxury', 'jac-s2'),
        hecho('Tracción', 'Delantera', 'jac-s2'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.153 × 1.750 × 1.568 mm', 'jac-s2'),
        hecho('Distancia entre ejes', '2.490 mm', 'jac-s2'),
        hecho('Baúl', '450 L', 'jac-s2'),
        hecho('Tanque', '42 L', 'jac-s2'),
        hecho('Peso', '1.155 kg', 'jac-s2'),
        hecho('Neumáticos', '205/55 R16', 'jac-s2'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y eje torsional', 'jac-s2'),
        hecho('Frenos', 'Discos ventilados y discos', 'jac-s2'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '2', 'jac-s2'),
        hecho('Estabilidad', 'ESP, HBA y HAC', 'jac-s2'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Multimedia', 'Pantalla de 9 pulgadas, Android Auto y Apple CarPlay', 'jac-s2'),
        hecho('Conducción', 'Cámara, sensores, control de crucero y aire acondicionado', 'jac-s2'),
      ]),
    ],
    conflictos: [
      'Potencia: la tabla indica 111 CV / 83 kW a 6.000 rpm y la portada dice 105 CV. No se usa un rango.',
    ],
    pendientes: ['Garantía de esta edición: no está en el extracto del folleto.'],
    precios: [
      precio({
        version: 'S2 Intelligent MT',
        lista: 20900,
        fechaLista: '1/5/2026',
        vigencia: jacPrecioNota,
        exclusiones: 'IVA incluido excepto Tierra del Fuego. Sin flete, seguro de transporte ni patentamiento.',
        fuenteId: 'jac-lista-mayo-2026',
        estado: 'historico',
      }),
      precio({
        version: 'S2 Luxury CVT',
        lista: 22900,
        fechaLista: '1/5/2026',
        vigencia: jacPrecioNota,
        exclusiones: 'IVA incluido excepto Tierra del Fuego. Sin flete, seguro de transporte ni patentamiento.',
        fuenteId: 'jac-lista-mayo-2026',
        estado: 'historico',
      }),
    ],
    public: basePublic({
      descripcion:
        'SUV 1.5 con versión Intelligent manual y Luxury CVT. La potencia queda sin cifra única porque el folleto dice 111 CV en la tabla y 105 CV en la portada.',
      combustible: 'Nafta',
      transmision: 'Manual (Intelligent) o CVT (Luxury)',
      precio:
        'Lista histórica del 1/5/2026: Intelligent MT USD 20.900 y Luxury CVT USD 22.900. No es vigencia de noviembre 2026.',
      especificaciones: {
        motor: '1.499 cm³',
        potencia: 'Sin cifra única (tabla 111 CV / 83 kW; portada 105 CV)',
        traccion: 'Delantera',
        capacidad_tanque: '42 L',
        peso: '1.155 kg',
      },
      caracteristicas: [
        '2 airbags, ESP, HBA y HAC',
        'Pantalla de 9 pulgadas con Android Auto y Apple CarPlay',
        'Cámara, sensores, crucero y aire acondicionado',
        'Neumáticos 205/55 R16',
      ],
      anioNota: anioDe('folleto que declara características de agosto de 2025'),
      avisoCorto: 'Potencia en conflicto dentro del folleto. Precio de mayo 2026.',
    }),
  }),
  ficha({
    id: 'jac-t8-2024',
    cobertura: 'historica',
    correspondencia:
      'El folleto Intelligent es de marzo de 2023. No certifica la etiqueta 2024 como año-modelo. Potencia 136 CV, no un rango hasta 139. El precio de mayo 2026 es histórico y de otra fecha que el folleto.',
    fuentes: [t8, lista],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', '2.0 diésel common rail, turbo, intercooler y DPF', 'jac-t8', 'historico'),
        hecho('Potencia', '136 CV / 100 kW a 3.600 rpm', 'jac-t8', 'historico'),
        hecho('Torque', '320 Nm entre 1.600 y 2.600 rpm', 'jac-t8', 'historico'),
      ], 'Fuente histórica de marzo de 2023.'),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'Manual de 6 marchas', 'jac-t8', 'historico'),
        hecho('Tracción', '4x4', 'jac-t8', 'historico'),
      ]),
      seccion('dimensiones', 'Dimensiones y caja', [
        hecho('Medidas', '5.325 × 1.880 × 1.830 mm', 'jac-t8', 'historico'),
        hecho('Distancia entre ejes', '3.090 mm', 'jac-t8', 'historico'),
        hecho('Tanque', '76 L', 'jac-t8', 'historico'),
        hecho('Caja', '1.520 × 1.520 × 470 mm', 'jac-t8', 'historico'),
        hecho('Carga', '900 kg', 'jac-t8', 'historico'),
        hecho('Peso en vacío', '1.970 kg', 'jac-t8', 'historico'),
        hecho('Neumáticos', '265/60 R18', 'jac-t8', 'historico'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'Doble horquilla y ballestas', 'jac-t8', 'historico'),
        hecho('Frenos', 'Discos ventilados en ambos ejes', 'jac-t8', 'historico'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '2', 'jac-t8', 'historico'),
        hecho('Controles', 'ESC, ABS, HBA, BOS, EBD, HHC, TCS y VDC', 'jac-t8', 'historico'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Multimedia', 'Pantalla de 9 pulgadas, Android Auto, Apple CarPlay y cámara', 'jac-t8', 'historico'),
        hecho('Acceso', 'Arranque sin llave y aire acondicionado', 'jac-t8', 'historico'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Vehículo', '5 años o 150.000 km en ese documento de 2023', 'jac-t8', 'historico'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Correspondencia de este folleto de 2023 con una unidad MY2024.'],
    precios: [
      precio({
        version: 'T8 Intelligent 4x4 MT',
        lista: 34900,
        fechaLista: '1/5/2026',
        vigencia: jacPrecioNota,
        exclusiones: 'IVA incluido excepto Tierra del Fuego. Sin flete, seguro de transporte ni patentamiento.',
        fuenteId: 'jac-lista-mayo-2026',
        estado: 'historico',
        nota: 'La lista es posterior al folleto de marzo 2023. No unifica año-modelo.',
      }),
    ],
    public: basePublic({
      descripcion:
        'Pick-up 4x4 del folleto Intelligent de marzo de 2023: 2.0 diésel de 136 CV y manual de 6 marchas. Es fuente histórica, no una certificación del año que muestra el catálogo.',
      combustible: 'Diésel',
      transmision: 'Manual 6 velocidades',
      precio:
        'Lista histórica del 1/5/2026: Intelligent 4x4 MT USD 34.900. El folleto técnico es de marzo de 2023.',
      especificaciones: {
        motor: '2.0 diésel CR turbo (folleto marzo 2023)',
        potencia: '136 CV / 100 kW a 3.600 rpm',
        traccion: '4x4',
        capacidad_tanque: '76 L',
        peso: '1.970 kg en vacío',
      },
      caracteristicas: [
        'Fuente histórica: marzo de 2023',
        '2 airbags y controles ESC, ABS, HBA, BOS, EBD, HHC, TCS y VDC',
        'Pantalla de 9 pulgadas, Android Auto, Apple CarPlay y cámara',
        'Garantía de ese documento: 5 años o 150.000 km',
      ],
      anioNota: anioDe('folleto de marzo de 2023, que no certifica la etiqueta 2024'),
      avisoCorto: 'Folleto de marzo 2023. Precio de lista mayo 2026, histórico.',
    }),
  }),
  ficha({
    id: 'jac-x200-2025',
    cobertura: 'integrada',
    correspondencia:
      'El documento separa diésel Luxury y nafteras nuevas. No se mezclan ni se mantiene un 2.8 ni 134 HP ni normas Euro de otro país. Las cabinas tienen medidas distintas y no se resume una sola. El precio único de USD 31.900 se reemplaza por la lista histórica de mayo, por versión.',
    fuentes: [x200, x200web, lista],
    secciones: [
      seccion('motor', 'Motores, sin mezclar', [
        hecho('Diésel', '2.0, 136 CV / 100 kW, 285 Nm entre 2.200 y 2.600 rpm, manual de 6 marchas', 'jac-x200'),
        hecho('Nafta', '2.0, 150 CV / 110 kW, 196 Nm entre 3.000 y 4.500 rpm, manual de 5 marchas', 'jac-x200'),
      ]),
      seccion('dimensiones', 'Capacidades comunes citadas', [
        hecho('Tanque', '65 L', 'jac-x200'),
        hecho('Carga publicada', '1.500 kg', 'jac-x200'),
        hecho('Cabinas', 'Simple estándar, simple larga y doble tienen medidas distintas en la matriz del documento', 'jac-x200'),
      ]),
      seccion('chasis', 'Frenos y neumáticos', [
        hecho('Frenos', 'Discos delanteros y tambores traseros', 'jac-x200'),
        hecho('Neumáticos', '195/70 R15C delante y 155R13C atrás', 'jac-x200'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '2', 'jac-x200'),
        hecho('Frenos', 'ABS', 'jac-x200'),
        hecho('Estacionamiento', 'Sensores', 'jac-x200'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Habitáculo', 'Aire acondicionado, Bluetooth, control de crucero y conductor calefaccionado', 'jac-x200'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Vehículo', '5 años o 150.000 km en la web oficial', 'jac-x200-web'),
      ]),
    ],
    conflictos: [],
    pendientes: [
      'No se copia una sola medida de cabina: hace falta leer la matriz completa del PDF para cada configuración.',
    ],
    precios: [
      precio({
        version: 'X200 cabina simple nafta',
        lista: 24700,
        fechaLista: '1/5/2026',
        vigencia: jacPrecioNota,
        exclusiones: 'IVA incluido excepto Tierra del Fuego. Sin flete, seguro de transporte ni patentamiento.',
        fuenteId: 'jac-lista-mayo-2026',
        estado: 'historico',
      }),
      precio({
        version: 'X200 cabina doble nafta',
        lista: 25500,
        fechaLista: '1/5/2026',
        vigencia: jacPrecioNota,
        exclusiones: 'IVA incluido excepto Tierra del Fuego. Sin flete, seguro de transporte ni patentamiento.',
        fuenteId: 'jac-lista-mayo-2026',
        estado: 'historico',
      }),
      precio({
        version: 'X200 cabina simple diésel',
        lista: 31500,
        fechaLista: '1/5/2026',
        vigencia: jacPrecioNota,
        exclusiones: 'IVA incluido excepto Tierra del Fuego. Sin flete, seguro de transporte ni patentamiento.',
        fuenteId: 'jac-lista-mayo-2026',
        estado: 'historico',
      }),
    ],
    public: basePublic({
      descripcion:
        'Utilitario con dos mecánicas en la ficha argentina: diésel 2.0 de 136 CV con manual de 6 marchas, y nafta 2.0 de 150 CV con manual de 5. No son intercambiables.',
      combustible: 'Nafta / Diésel',
      transmision: 'MT6 diésel o MT5 nafta, según versión',
      precio:
        'Lista histórica del 1/5/2026: CS nafta USD 24.700, CD nafta USD 25.500 y CS diésel USD 31.500.',
      especificaciones: {
        motor: 'Diésel 2.0 o nafta 2.0, según versión',
        potencia: '136 CV diésel / 150 CV nafta',
        traccion: PEND,
        capacidad_tanque: '65 L',
        peso: PEND,
      },
      caracteristicas: [
        'Carga publicada 1.500 kg',
        '2 airbags, ABS y sensores',
        'Aire acondicionado, Bluetooth, crucero y asiento del conductor calefaccionado',
        'Garantía publicada en la web: 5 años o 150.000 km',
      ],
      anioNota: anioDe('ficha cuyo archivo se llama 20251203; la carpeta 2018 no fecha el contenido'),
      avisoCorto: 'Hay versión nafta y diésel. No queda un precio único.',
    }),
  }),
];
