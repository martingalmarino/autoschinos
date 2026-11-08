import { anioDe, basePublic, ficha, fuente, hecho, PEND, seccion } from './helpers';

const x70 = fuente('lifan-x70', 'Novedad del importador: X70', 'https://www.famly.com.ar/site/novedad/35', 'historica', '5/7/2018', 'No acredita airbags laterales ni MY2025.');
const my1 = fuente('lifan-myway-17', 'Novedad del importador: Myway', 'https://www.famly.com.ar/site/novedad/29', 'historica', '2017');
const my2 = fuente('lifan-myway-18', 'Novedad del importador: Myway AT', 'https://www.famly.com.ar/site/novedad/39', 'historica', '2018', 'Agrega AT5. La garantía cambió entre comunicaciones y no se unifica.');
const mamut = fuente('kyc-mamut', 'Novedad del importador: Mamut', 'https://www.famly.com.ar/site/novedad/54', 'historica', '5/11/2019', 'Marca KYC. No respalda el diésel de 190 HP ni la tracción 4x4.');

const consultar = 'Consultar precio. Sin precio actual trazable.';

export const lifanSheets = [
  ficha({
    id: 'lifan-x70-2025',
    cobertura: 'historica',
    correspondencia:
      'Comunicación del importador del 5/7/2018: 2.0 de 140 CV, tracción delantera, MT5 o CVT. Dos airbags. No acredita laterales ni un MY2025. Se retiran tanque de 55 L y peso.',
    fuentes: [x70],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', '2.0, 140 CV', 'lifan-x70', 'historico'),
        hecho('Tracción', 'Delantera', 'lifan-x70', 'historico'),
        hecho('Caja', 'Manual de 5 marchas o CVT', 'lifan-x70', 'historico'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Distancia entre ejes', '2.620 mm', 'lifan-x70', 'historico'),
        hecho('Neumáticos', '225/55 R18', 'lifan-x70', 'historico'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y trasera independiente de tres brazos', 'lifan-x70', 'historico'),
        hecho('Frenos', 'Discos en las cuatro ruedas', 'lifan-x70', 'historico'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '2', 'lifan-x70', 'historico'),
        hecho('Controles', 'ESP, ABS, EBD, TPMS e ISOFIX', 'lifan-x70', 'historico'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Habitáculo', 'Cámara, sensores, MirrorLink, Bluetooth, crucero y ecocuero', 'lifan-x70', 'historico'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('De esa comunicación', '3 años o 100.000 km', 'lifan-x70', 'historico'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Airbags laterales: la fuente no los acredita y no se niegan.', 'Tanque, peso y precio actual.'],
    precios: [],
    public: basePublic({
      descripcion:
        'SUV con motor 2.0 de 140 CV, caja manual o CVT y dos airbags.',
      combustible: 'Nafta',
      transmision: 'MT5 o CVT',
      precio: consultar,
      especificaciones: {
        motor: '2.0 nafta',
        potencia: '140 CV',
        traccion: 'Delantera',
        capacidad_tanque: PEND,
        peso: PEND,
      },
      caracteristicas: [
        'Fuente histórica del 5/7/2018',
        '2 airbags, ESP, ABS, EBD, TPMS e ISOFIX',
        'Garantía de esa comunicación: 3 años o 100.000 km',
      ],
      anioNota: anioDe('comunicación del 5/7/2018'),
      avisoCorto: 'Dato de 2018. No se confirman airbags laterales.',
    }),
  }),
  ficha({
    id: 'lifan-myway-2025',
    cobertura: 'historica',
    correspondencia:
      'Fuentes de 2017 y 2018: 1.794 cm³, 132 CV a 6.000 rpm, nafta, manual de 5 marchas y tracción trasera. En 2018 se agrega automática de 5 marchas. Siete plazas y dos airbags. El climatizador bizona no está confirmado. La garantía no se unifica.',
    fuentes: [my1, my2],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Cilindrada', '1.794 cm³', 'lifan-myway-17', 'historico'),
        hecho('Potencia', '132 CV a 6.000 rpm', 'lifan-myway-17', 'historico'),
        hecho('Cajas', 'Manual de 5 marchas; automática de 5 desde la comunicación de 2018', 'lifan-myway-18', 'historico'),
        hecho('Tracción', 'Trasera', 'lifan-myway-17', 'historico'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Largo y ancho', '4.400 mm de largo y 1.760 mm de ancho', 'lifan-myway-17', 'historico'),
        hecho('Distancia entre ejes', '2.720 mm', 'lifan-myway-17', 'historico'),
        hecho('Baúl', '210 L con tres filas o 703 L con la tercera rebatida', 'lifan-myway-17', 'historico'),
        hecho('Neumáticos', '215/55 R17', 'lifan-myway-17', 'historico'),
        hecho('Plazas', '7', 'lifan-myway-17', 'historico'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags y controles', '2 airbags, ESP, ABS, EBD e ISOFIX', 'lifan-myway-17', 'historico'),
      ]),
    ],
    conflictos: [],
    pendientes: [
      'Alto, tanque y peso.',
      'Climatizador bizona: no confirmado.',
      'Garantía: cambió entre comunicaciones y no se asigna una sola.',
      'Precio actual.',
    ],
    precios: [],
    public: basePublic({
      descripcion:
        'SUV de siete plazas: motor de 1.794 cm³ y 132 CV, con tracción trasera. También hay caja automática de 5 marchas.',
      combustible: 'Nafta',
      transmision: 'MT5 o AT5 (AT desde 2018)',
      precio: consultar,
      especificaciones: {
        motor: '1.794 cm³',
        potencia: '132 CV a 6.000 rpm',
        traccion: 'Trasera',
        capacidad_tanque: PEND,
        peso: PEND,
      },
      caracteristicas: [
        '7 plazas, 2 airbags, ESP, ABS, EBD e ISOFIX',
        'Baúl de 210 L con tres filas o 703 L con la tercera rebatida',
      ],
      anioNota: anioDe('comunicaciones de 2017 y 2018'),
      avisoCorto: 'Dato histórico. El aire bizona no está confirmado.',
    }),
  }),
  ficha({
    id: 'lifan-mamut-2025',
    cobertura: 'historica',
    correspondencia:
      'El Mamut documentado por el importador el 5/11/2019 es KYC, utilitario naftero 1.5 de 108 CV, manual de 5 marchas y tracción trasera. No es una pickup Lifan diésel 4x4 de 190 HP. La URL anterior redirige. Los datos son históricos y no un MY2025.',
    fuentes: [mamut],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Marca', 'KYC', 'kyc-mamut', 'historico'),
        hecho('Motor', '1.5 nafta, distribución por cadena', 'kyc-mamut', 'historico'),
        hecho('Potencia', '108 CV', 'kyc-mamut', 'historico'),
        hecho('Torque', '143 Nm', 'kyc-mamut', 'historico'),
        hecho('Caja', 'Manual de 5 marchas', 'kyc-mamut', 'historico'),
        hecho('Tracción', 'Trasera', 'kyc-mamut', 'historico'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y ballestas', 'kyc-mamut', 'historico'),
        hecho('Frenos', 'Disco y tambor', 'kyc-mamut', 'historico'),
        hecho('Neumáticos', '185R14LT', 'kyc-mamut', 'historico'),
        hecho('Frenos ABS', 'ABS', 'kyc-mamut', 'historico'),
      ]),
      seccion('carga', 'Cargas por carrocería', [
        hecho('Cabina simple dual', '1.800 kg', 'kyc-mamut', 'historico'),
        hecho('Doble cabina', '1.300 kg', 'kyc-mamut', 'historico'),
        hecho('Box', '1.700 kg y 9,5 m³', 'kyc-mamut', 'historico'),
        hecho('Box refrigerado', '1.700 kg', 'kyc-mamut', 'historico'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Habitáculo', 'Aire acondicionado, radio FM/AUX y vidrios eléctricos', 'kyc-mamut', 'historico'),
      ]),
    ],
    conflictos: [],
    pendientes: [
      'Tanque, peso, cantidad de airbags y ESP: la comunicación no los detalla y no se niegan.',
      'Precio actual. El de 2019 no se destaca como vigente.',
    ],
    precios: [],
    public: basePublic({
      descripcion:
        'Utilitario KYC con motor 1.5 nafta de 108 CV, caja manual de 5 marchas y tracción trasera.',
      combustible: 'Nafta',
      transmision: 'Manual 5 velocidades',
      categoria: 'Utilitario',
      precio: consultar,
      especificaciones: {
        motor: '1.5 nafta',
        potencia: '108 CV',
        traccion: 'Trasera',
        capacidad_tanque: PEND,
        peso: PEND,
      },
      caracteristicas: [
        'Marca KYC, fuente del 5/11/2019',
        'Cabina simple dual 1.800 kg; doble 1.300 kg; box 1.700 kg',
        'ABS, aire acondicionado, radio y vidrios eléctricos',
      ],
      anioNota: anioDe('comunicación del importador del 5/11/2019'),
      avisoCorto: 'Es un KYC naftero 1.5, no una pickup Lifan diésel 4x4.',
      aviso:
        'La página estaba bajo Lifan como pickup diésel 4x4 de unos 190 HP. El importador documentó el 5/11/2019 un Mamut KYC naftero. Se corrigió la marca, se retiraron el diésel, la tracción 4x4 y esa potencia, y se muestran solo los datos históricos de esa comunicación.',
    }),
  }),
];
