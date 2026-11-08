import { anioDe, basePublic, ficha, fuente, hecho, PEND, precio, seccion, SIN_TANQUE } from './helpers';

const mg3 = fuente(
  'mg3-ice',
  'Ficha MG3 ICE de concesionario',
  'https://www.mgdrive.com.ar/wp-content/uploads/2026/06/Ficha-tecnica-MG3-ICE.pdf',
  'secundaria',
  'PDF de ruta junio 2026, versión Luxury naftera',
  'No es dominio del importador. Hay errores en el diagrama de ancho y alto: se usa la tabla. No confirma un MY2025 ni un híbrido.'
);
const zs = fuente(
  'mg-zs-prensa',
  'Cobertura Expo Auto Chino',
  'https://automundo.com.ar/expo-auto-chino-2026-autos-lanzamientos-novedades/',
  'prensa',
  '2/10/2026',
  'Distingue Comfort ICE y Luxury ICE. No autoriza a completar el naftero con el PDF del ZS Hybrid+.'
);
const cyber = fuente(
  'mg-cyber',
  'Ficha Cyberster de concesionario',
  'https://www.mgdrive.com.ar/wp-content/uploads/2026/01/mg-cyberster.pdf',
  'secundaria',
  'PDF de ruta enero 2026, GT AWD',
  'mgargentina.ar devolvió 403. No se extrajeron potencia ni tiempos de carga.'
);

const condiciones = 'Sin condiciones comerciales completas. No es un presupuesto cerrado.';

export const mgSheets = [
  ficha({
    id: 'mg-3-2025',
    cobertura: 'integrada',
    correspondencia:
      'La ficha local encontrada es Luxury naftera de 2026, no una confirmación MY2025 ni un híbrido. 114 HP y CVT. El diagrama de medidas se descarta frente a la tabla.',
    fuentes: [mg3, zs],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Cilindrada', '1.498 cm³', 'mg3-ice'),
        hecho('Potencia', '114 HP', 'mg3-ice'),
        hecho('Torque', '142 Nm', 'mg3-ice'),
      ]),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'CVT', 'mg3-ice'),
        hecho('Tracción', 'Delantera', 'mg3-ice'),
        hecho('Tanque', '45 L', 'mg3-ice'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.120 × 1.799 × 1.501 mm', 'mg3-ice'),
        hecho('Distancia entre ejes', '2.570 mm', 'mg3-ice'),
        hecho('Baúl', '241 L', 'mg3-ice'),
        hecho('Peso', '1.237 kg', 'mg3-ice'),
        hecho('Neumáticos', '195/65 R16', 'mg3-ice'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags y ESP', '6 airbags y ESP', 'mg3-ice'),
        hecho('ADAS', 'ACC, LDWS, FCW y LKA', 'mg3-ice'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Pantallas', 'Multimedia 10,25 pulgadas e instrumental de 7', 'mg3-ice'),
        hecho('Otros', 'Cámara 360° y techo solar', 'mg3-ice'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Vehículo', '6 años o 120.000 km', 'mg3-ice'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Otras cajas distintas de la CVT de esta ficha Luxury.'],
    precios: [
      precio({
        version: 'MG3 ICE',
        lista: 21900,
        fechaLista: '2/10/2026',
        vigencia: 'Precio de prensa de esa fecha. ' + condiciones,
        fuenteId: 'mg-zs-prensa',
        estado: 'prensa-sin-condiciones',
      }),
    ],
    public: basePublic({
      descripcion:
        'Hatchback naftero Luxury: 1.498 cm³, 114 HP y CVT.',
      combustible: 'Nafta',
      transmision: 'CVT',
      precio:
        'Prensa del 2/10/2026: MG3 ICE USD 21.900. Sin condiciones completas; no es un presupuesto cerrado.',
      especificaciones: {
        motor: '1.498 cm³ (Luxury ICE 2026)',
        potencia: '114 HP',
        traccion: 'Delantera',
        capacidad_tanque: '45 L',
        peso: '1.237 kg',
      },
      caracteristicas: [
        '6 airbags, ESP, ACC, LDWS, FCW y LKA',
        'Pantalla de 10,25 pulgadas, cámara 360° y techo solar',
        'Garantía: 6 años o 120.000 km',
      ],
      anioNota: anioDe('ficha Luxury ICE de junio 2026, que no confirma un MY2025'),
      avisoCorto: 'Naftero Luxury 2026. No usar datos híbridos.',
    }),
  }),
  ficha({
    id: 'mg-zs-2025',
    cobertura: 'integrada',
    correspondencia:
      'No hay PDF argentino cerrado de las versiones nafteras. La prensa del 2/10/2026 separa Comfort ICE 1.5/114 CV y Luxury ICE 1.5T/168 CV/275 Nm. No se usa el PDF del ZS Hybrid+ ni se mantienen 118 HP, tanque de 48 L ni un solo motor.',
    fuentes: [zs],
    secciones: [
      seccion('motor', 'Motores', [
        hecho('Comfort ICE', '1.5, 114 CV', 'mg-zs-prensa'),
        hecho('Luxury ICE', '1.5 turbo, 168 CV y 275 Nm', 'mg-zs-prensa'),
      ]),
    ],
    conflictos: [],
    pendientes: [
      'Ficha argentina completa del ZS naftero: medidas, tanque, peso, airbags, pantalla y ADAS.',
      'Condiciones comerciales del precio de prensa.',
    ],
    precios: [
      precio({
        version: 'ZS Comfort ICE',
        lista: 23900,
        fechaLista: '2/10/2026',
        vigencia: condiciones,
        fuenteId: 'mg-zs-prensa',
        estado: 'prensa-sin-condiciones',
      }),
      precio({
        version: 'ZS Luxury ICE',
        lista: 25900,
        fechaLista: '2/10/2026',
        vigencia: condiciones,
        fuenteId: 'mg-zs-prensa',
        estado: 'prensa-sin-condiciones',
      }),
    ],
    public: basePublic({
      descripcion:
        'SUV naftero en dos versiones: Comfort 1.5 de 114 CV y Luxury 1.5 turbo de 168 CV.',
      combustible: 'Nafta',
      transmision: 'Sin confirmar',
      precio:
        'Prensa del 2/10/2026: Comfort ICE USD 23.900 y Luxury ICE USD 25.900. Sin condiciones completas.',
      especificaciones: {
        motor: 'Comfort 1.5 o Luxury 1.5T, según versión',
        potencia: '114 CV Comfort / 168 CV Luxury',
        traccion: PEND,
        capacidad_tanque: PEND,
        peso: PEND,
      },
      caracteristicas: ['Comfort 1.5 de 114 CV y Luxury 1.5 turbo de 168 CV'],
      aviso: 'Comfort ICE y Luxury ICE no se mezclan con el ZS Hybrid+.',
      anioNota: anioDe('prensa del 2/10/2026, sin ficha oficial que confirme un MY2025'),
      avisoCorto: 'Dos nafteros distintos. El PDF híbrido no se aplicó.',
    }),
  }),
  ficha({
    id: 'mg-4-2025',
    cobertura: 'pendiente',
    correspondencia:
      'No se confirmó ficha argentina de la variante publicada (tracción trasera, 170–204 HP, batería de 51–64 kWh). La cobertura local de octubre habla de un MG4 Urban como anticipo 2027, que no es ese producto. No se rellena con ficha europea. Esas cifras se retiran.',
    fuentes: [],
    secciones: [],
    conflictos: [],
    pendientes: [
      'Identificar la variante argentina y su ficha.',
      'El MG4 Urban anticipado para 2027 no se usa como sustituto.',
      'Precio.',
    ],
    precios: [],
    public: basePublic({
      descripcion:
        'Eléctrico publicado en el catálogo sin ficha argentina confirmada para la variante que mostraba la página. No se completó con datos europeos ni con el MG4 Urban.',
      combustible: 'Sin confirmar',
      transmision: 'Sin confirmar',
      precio: 'Consultar precio. Sin ficha local confirmada.',
      especificaciones: {
        motor: PEND,
        potencia: PEND,
        traccion: PEND,
        capacidad_tanque: SIN_TANQUE,
        peso: PEND,
      },
      caracteristicas: [],
      anioNota: anioDe('variante local sin ficha; no es el MG4 Urban anticipado para 2027'),
      avisoCorto: 'Sin ficha argentina. Se retiraron autonomía, batería y potencia.',
      aviso:
        'Se retiraron 170–204 HP, batería de 51–64 kWh, 450 km y tracción trasera porque no hay ficha argentina que los confirme. El MG4 Urban mencionado para 2027 es otro producto.',
    }),
  }),
  ficha({
    id: 'mg-cyberster-2025',
    cobertura: 'integrada',
    correspondencia:
      'PDF local GT AWD de concesionario: 375 kW, 725 Nm, batería de 77 kWh, 446 km WLTP y 0–100 en 3,7 s. Se retiran 536 HP, 500 km y 3,2 s. No hay tiempos de carga extraídos.',
    fuentes: [cyber],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Potencia', '375 kW', 'mg-cyber'),
        hecho('Torque', '725 Nm', 'mg-cyber'),
        hecho('Prestación', '0–100 km/h en 3,7 s', 'mg-cyber'),
      ]),
      seccion('ev', 'Batería', [
        hecho('Capacidad', '77 kWh', 'mg-cyber'),
        hecho('Autonomía', '446 km WLTP', 'mg-cyber'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.535 × 1.913 × 1.329 mm', 'mg-cyber'),
        hecho('Distancia entre ejes', '2.690 mm', 'mg-cyber'),
        hecho('Baúl', '249 L', 'mg-cyber'),
        hecho('Peso', '1.885 kg', 'mg-cyber'),
        hecho('Neumáticos', '245/40 R20 delante y 275/35 R20 detrás', 'mg-cyber'),
      ]),
      seccion('chasis', 'Frenos', [
        hecho('Frenos', 'Brembo delanteros y discos en las cuatro ruedas', 'mg-cyber'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags y ayudas', '6 airbags, ESP y ADAS', 'mg-cyber'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Audio y visión', 'BOSE de 8 parlantes, cámara 360° y pantallas múltiples', 'mg-cyber'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Vehículo', '6 años o 120.000 km', 'mg-cyber'),
        hecho('Batería', '7 años o 150.000 km', 'mg-cyber'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Potencia de carga y tiempos. El sitio del importador no pudo usarse (403).'],
    precios: [],
    public: basePublic({
      descripcion:
        'Roadster eléctrico GT de tracción integral: 375 kW, batería de 77 kWh, 446 km WLTP y 0 a 100 km/h en 3,7 segundos.',
      combustible: '100% Eléctrico',
      transmision: 'AWD',
      precio: 'Consultar precio.',
      especificaciones: {
        motor: 'Eléctrico, GT AWD',
        potencia: '375 kW',
        traccion: 'AWD',
        capacidad_tanque: SIN_TANQUE,
        peso: '1.885 kg',
      },
      caracteristicas: [
        '446 km WLTP y 0–100 en 3,7 s',
        '6 airbags, ESP, ADAS, Brembo y audio BOSE',
        'Garantía 6 años/120.000 km y batería 7 años/150.000 km',
      ],
      anioNota: anioDe('PDF GT AWD de enero 2026'),
      avisoCorto: '375 kW, 446 km WLTP y 3,7 s. Se retiraron 536 HP y 3,2 s.',
    }),
  }),
];
