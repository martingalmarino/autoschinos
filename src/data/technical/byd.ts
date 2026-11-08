import { anioDe, basePublic, ficha, fuente, hecho, PEND, precio, seccion, SIN_TANQUE } from './helpers';

const dolphin = fuente(
  'byd-dolphin',
  'PDF Dolphin Mini Argentina',
  'https://www.byd.com/material/byd-site/ar/flyers_argentina/new/AR-BYD-DOLPHIN-MINI-20250829.pdf',
  'primaria',
  'Archivo 20250829, enlazado en la página argentina',
  'GL y GS no se mezclan con fichas de lanzamiento de 55 kW o 38,88 kWh.'
);
const dolphinWeb = fuente(
  'byd-dolphin-web',
  'Página Dolphin Mini',
  'https://www.byd.com/ar/car/dolphin-mini',
  'primaria',
  'Página comercial vigente en la consulta',
  'Publica 10–80 % en 30 minutos sin identificar condiciones.'
);
const song = fuente(
  'byd-song',
  'PDF Song Pro Argentina',
  'https://www.byd.com/material/byd-site/ar/flyers_argentina/new/AR-BYD-SONG-PRO-20250903.pdf',
  'primaria',
  'Archivo 20250903',
  'No sumar potencias. El PDF advierte variación regional.'
);
const yuan = fuente(
  'byd-yuan',
  'PDF Yuan Pro GS',
  'https://www.byd.com/material/byd-site/ar/flyers_argentina/new/AR-BYD-YUAN-PRO-GS-20250828.pdf',
  'primaria',
  'Archivo 20250828, versión GS',
  'El rótulo “combustión interna” del PDF es un error y no se copia. No acredita el equipamiento GL.'
);
const precios = fuente(
  'byd-precios-2025',
  'Comunicado de precios BYD Argentina',
  'https://www.byd.com/ar/news-list/byd-en-argentina',
  'historica',
  '8/10/2025',
  'Precio histórico. No hay vigencia 2026 probada. Garantía: vehículo 6 años; batería y motor 8 años, sin kilometraje en el comunicado.'
);
const fin = fuente(
  'byd-fin-2026',
  'Comunicado de financiación',
  'https://www.byd.com/ar/news-list/byd-promueve-el-acceso-a-la-movilidad-de-nuevas-energias-con-financiacion-a-tasa-0-y-cuotas-fijas',
  'primaria',
  '18/9/2026',
  'Confirma financiación. No publica precios nuevos ni declara vigentes los de 2025.'
);

const anio = anioDe('PDF argentino 2025 con aviso de variación regional; no certifica la etiqueta MY2025 del catálogo');
const vig = 'Comunicado del 8/10/2025. El comunicado del 18/9/2026 no actualiza estos precios ni prueba que sigan vigentes.';

export const bydSheets = [
  ficha({
    id: 'byd-dolphin-mini-2025',
    cobertura: 'integrada',
    correspondencia:
      'El PDF actual publica 65 kW y 175 Nm en GL y GS, con baterías de 30,08 y 43,2 kWh y autonomías de 280 y 380 km NEDC. No se usa la ficha de lanzamiento de 55 kW o 38,88 kWh. La web dice 10–80 % en 30 minutos sin condiciones.',
    fuentes: [dolphin, dolphinWeb, precios, fin],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Potencia', '65 kW en GL y en GS', 'byd-dolphin'),
        hecho('Torque', '175 Nm en GL y en GS', 'byd-dolphin'),
        hecho('Plazas', '4', 'byd-dolphin'),
      ]),
      seccion('ev', 'Batería y carga', [
        hecho('GL', '30,08 kWh y 280 km NEDC', 'byd-dolphin'),
        hecho('GS', '43,2 kWh y 380 km NEDC', 'byd-dolphin'),
        hecho('AC', '11 kW', 'byd-dolphin'),
        hecho('DC', '65 kW en una versión y 85 kW en la otra, conector CCS2', 'byd-dolphin'),
        hecho('Web', '10–80 % en 30 minutos, sin condiciones identificadas', 'byd-dolphin-web'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '3.990 × 1.720 × 1.590 mm', 'byd-dolphin'),
        hecho('Distancia entre ejes', '2.500 mm', 'byd-dolphin'),
        hecho('Baúl', '308 L', 'byd-dolphin'),
        hecho('Neumáticos', '185/55 R16', 'byd-dolphin'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '6 y controles de estabilidad', 'byd-dolphin'),
        hecho('ADAS del PDF', 'Incluye ACC, AEB, LDW y LCC', 'byd-dolphin'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Pantallas', 'Giratoria de 10,1 pulgadas e instrumental de 7', 'byd-dolphin'),
        hecho('Conectividad', 'Apple CarPlay y Android Auto', 'byd-dolphin'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Comunicado de octubre 2025', 'Vehículo 6 años; batería y motor 8 años, sin kilometraje en ese texto', 'byd-precios-2025', 'historico'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Qué versión recibe DC de 65 kW y cuál de 85 kW no quedó separado en el extracto.'],
    precios: [
      precio({ version: 'Dolphin Mini GL', lista: 22990, fechaLista: '8/10/2025', vigencia: vig, fuenteId: 'byd-precios-2025', estado: 'historico' }),
      precio({ version: 'Dolphin Mini GS', lista: 23990, fechaLista: '8/10/2025', vigencia: vig, fuenteId: 'byd-precios-2025', estado: 'historico' }),
    ],
    public: basePublic({
      descripcion:
        'Hatchback eléctrico. El PDF argentino actual da 65 kW a GL y GS, con baterías y autonomías NEDC distintas. No se usa la ficha vieja de 38,88 kWh.',
      combustible: '100% Eléctrico',
      transmision: 'Delantera',
      precio:
        'Comunicado del 8/10/2025, sin vigencia 2026 probada: GL USD 22.990 y GS USD 23.990.',
      especificaciones: {
        motor: 'Eléctrico',
        potencia: '65 kW',
        traccion: 'Delantera',
        capacidad_tanque: SIN_TANQUE,
        peso: PEND,
      },
      caracteristicas: [
        'GL y GS: 65 kW y 175 Nm',
        'Baterías y autonomías NEDC distintas por versión',
        '6 airbags; el PDF incluye ACC, AEB, LDW y LCC',
        'Pantalla giratoria de 10,1 pulgadas',
      ],
      anioNota: anio,
      avisoCorto: 'PDF actual de 65 kW. No se usa la ficha de 38,88 kWh.',
    }),
  }),
  ficha({
    id: 'byd-song-pro-dmi-2025',
    cobertura: 'integrada',
    correspondencia:
      'PHEV. Térmico 1.5 de 78 kW/130 Nm y eléctrico de 145 kW/300 Nm. No se suman. GL y GS tienen baterías Blade, autonomías y ADAS distintos. Tanque 52 L. El precio de octubre 2025 es histórico.',
    fuentes: [song, precios, fin],
    secciones: [
      seccion('motor', 'Motores, sin sumar', [
        hecho('Nafta', '1.5, 78 kW y 130 Nm', 'byd-song'),
        hecho('Eléctrico', '145 kW y 300 Nm', 'byd-song'),
        hecho('Nota', 'El documento no publica una potencia combinada y no se calcula una', 'byd-song'),
      ]),
      seccion('transmision', 'Transmisión', [
        hecho('Tracción', 'Delantera, híbrido enchufable', 'byd-song'),
        hecho('Tanque', '52 L', 'byd-song'),
      ]),
      seccion('ev', 'Batería y autonomía', [
        hecho('GL', 'Blade 12,9 kWh, 71 km eléctricos NEDC y 1.001 km combinados', 'byd-song'),
        hecho('GS', 'Blade 18,3 kWh, 100 km eléctricos NEDC y 1.030 km combinados', 'byd-song'),
        hecho('Carga', 'AC 6,6 kW, conector Tipo 2', 'byd-song'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.738 × 1.860 × 1.710 mm', 'byd-song'),
        hecho('Distancia entre ejes', '2.712 mm', 'byd-song'),
        hecho('Neumáticos', '225/60 R18', 'byd-song'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y multibrazo', 'byd-song'),
        hecho('Frenos', 'Discos ventilados y discos', 'byd-song'),
      ]),
      seccion('seguridad', 'Seguridad por versión', [
        hecho('Común', '6 airbags y ESC', 'byd-song'),
        hecho('GL', 'Crucero convencional', 'byd-song'),
        hecho('GS', 'ACC, AEB, BSD, RCTA y el resto de ADAS de esa versión', 'byd-song'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Pantallas', '12,8 y instrumental de 8,8 pulgadas, Android Auto y Apple CarPlay', 'byd-song'),
        hecho('Clima', 'Bizona', 'byd-song'),
        hecho('Solo GS', 'Techo y carga inalámbrica', 'byd-song'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Comunicado de octubre 2025', 'Vehículo 6 años; batería y motor 8 años, sin kilometraje en ese texto', 'byd-precios-2025', 'historico'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Carga DC: no está en el extracto.'],
    precios: [
      precio({ version: 'Song Pro GL', lista: 34990, fechaLista: '8/10/2025', vigencia: vig, fuenteId: 'byd-precios-2025', estado: 'historico' }),
      precio({ version: 'Song Pro GS', lista: 36990, fechaLista: '8/10/2025', vigencia: vig, fuenteId: 'byd-precios-2025', estado: 'historico' }),
    ],
    public: basePublic({
      descripcion:
        'SUV híbrido enchufable. El PDF separa un naftero de 78 kW y un eléctrico de 145 kW, sin publicarlos como una sola potencia. GL y GS no comparten batería ni ADAS.',
      combustible: 'Híbrido enchufable (Nafta + Eléctrico)',
      transmision: 'Delantera',
      precio:
        'Comunicado del 8/10/2025, sin vigencia 2026 probada: GL USD 34.990 y GS USD 36.990.',
      especificaciones: {
        motor: '1.5 nafta 78 kW + eléctrico 145 kW',
        potencia: 'Sin cifra combinada: el PDF no la publica y no se calcula',
        traccion: 'Delantera',
        capacidad_tanque: '52 L',
        peso: PEND,
      },
      caracteristicas: [
        'GL: crucero convencional. GS: ACC, AEB, BSD y RCTA',
        '6 airbags y ESC',
        'Pantalla de 12,8 pulgadas y climatizador bizona',
        'Techo y carga inalámbrica solo en GS',
      ],
      anioNota: anio,
      avisoCorto: 'No se suman las potencias. GL y GS quedan separados.',
    }),
  }),
  ficha({
    id: 'byd-yuan-pro-2025',
    cobertura: 'integrada',
    correspondencia:
      'El PDF es la versión GS: 130 kW, 290 Nm, batería de 45,12 kWh y 380 km NEDC. No se copian 136 HP, 50 kWh ni 401 km, ni el rótulo erróneo de combustión. El equipamiento no se extiende a GL.',
    fuentes: [yuan, precios, fin],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Potencia', '130 kW', 'byd-yuan'),
        hecho('Torque', '290 Nm', 'byd-yuan'),
        hecho('Tracción', 'Delantera', 'byd-yuan'),
      ], 'Alcance: Yuan Pro GS.'),
      seccion('ev', 'Batería y carga', [
        hecho('Batería', '45,12 kWh', 'byd-yuan'),
        hecho('Autonomía', '380 km NEDC', 'byd-yuan'),
        hecho('Carga', 'AC 7 kW y DC 65 kW', 'byd-yuan'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.310 × 1.830 × 1.675 mm', 'byd-yuan'),
        hecho('Distancia entre ejes', '2.620 mm', 'byd-yuan'),
        hecho('Baúl', '265 / 1.210 L', 'byd-yuan'),
        hecho('Peso', '1.550 kg', 'byd-yuan'),
      ]),
      seccion('chasis', 'Suspensión', [
        hecho('Suspensión', 'McPherson y eje torsional', 'byd-yuan'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('GS', '6 airbags, ESC, ADAS y cámara panorámica', 'byd-yuan'),
      ]),
      seccion('confort', 'Confort', [
        hecho('GS', 'Pantalla de 12,8 pulgadas, Android Auto, Apple CarPlay y techo panorámico', 'byd-yuan'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Comunicado de octubre 2025', 'Vehículo 6 años; batería y motor 8 años, sin kilometraje en ese texto', 'byd-precios-2025', 'historico'),
      ]),
    ],
    conflictos: [
      'El PDF rotula por error “combustión interna”. El vehículo de esa ficha es eléctrico y el rótulo no se publica.',
    ],
    pendientes: ['Ficha GL: este PDF no acredita su equipamiento.'],
    precios: [
      precio({ version: 'Yuan Pro GL', lista: 29990, fechaLista: '8/10/2025', vigencia: vig, fuenteId: 'byd-precios-2025', estado: 'historico', nota: 'El precio GL no trae la ficha técnica GL.' }),
      precio({ version: 'Yuan Pro GS', lista: 30990, fechaLista: '8/10/2025', vigencia: vig, fuenteId: 'byd-precios-2025', estado: 'historico' }),
    ],
    public: basePublic({
      descripcion:
        'SUV eléctrico. La ficha argentina usada es la GS: 130 kW, 45,12 kWh y 380 km NEDC. No describe sola a la versión GL.',
      combustible: '100% Eléctrico',
      transmision: 'Delantera',
      precio:
        'Comunicado del 8/10/2025, sin vigencia 2026 probada: GL USD 29.990 y GS USD 30.990.',
      especificaciones: {
        motor: 'Eléctrico (ficha GS)',
        potencia: '130 kW',
        traccion: 'Delantera',
        capacidad_tanque: SIN_TANQUE,
        peso: '1.550 kg (GS)',
      },
      caracteristicas: [
        'Alcance técnico: GS, no GL',
        '6 airbags, ESC, ADAS y cámara panorámica en esa ficha',
        'Pantalla de 12,8 pulgadas y techo panorámico',
      ],
      anioNota: anio,
      avisoCorto: 'Ficha GS. Se retiraron 50 kWh y 401 km.',
    }),
  }),
];
