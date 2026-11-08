import { anioDe, basePublic, ficha, fuente, hecho, PEND, precio, seccion, SIN_TANQUE } from './helpers';

const h6 = fuente('gwm-h6', 'Ficha Haval H6 4WD', 'https://gwm.com.ar/FT-Haval-H6-4WD.pdf', 'primaria', 'Ficha actual en el sitio GWM', 'Otro conjunto mecánico respecto del H6 201 HP/DCT7 publicado. No lo actualiza en silencio.');
const h6web = fuente('gwm-h6-web', 'Página Haval H6', 'https://gwm.com.ar/modelos/h6', 'primaria', 'Observada el 8/11/2026', 'Precio USD 39.900 del H6 4WD. Sin fecha de inicio ni de fin.');
const h6hev = fuente('gwm-h6-hev', 'Ficha Haval H6 HEV', 'https://gwm.com.ar/FT-H6-HEV.pdf', 'primaria', 'Ficha H6 HEV Deluxe/Supreme', 'No es el H6 PRO HEV.');
const gt = fuente('gwm-h6gt', 'Ficha Haval H6 GT', 'https://gwm.com.ar/FT-Haval-H6-GT.pdf', 'primaria', 'Ficha actual', 'Dimensiones y suspensión del PDF no se incorporan.');
const gtweb = fuente('gwm-h6gt-web', 'Página H6 GT', 'https://gwm.com.ar/modelos/h6-gt', 'primaria', 'Observada el 8/11/2026', 'Lista USD 44.400 y bonificado USD 41.990. Sin vencimiento comprobado.');
const jolion = fuente('gwm-jolion', 'Ficha Jolion facelift', 'https://gwm.com.ar/FT-Jolion-FACELIFT.pdf', 'primaria', 'Deluxe/Supreme nafteros', 'El torque trae la unidad mal rotulada. Sin precio oficial actual de esta variante.');
const jhev = fuente('gwm-jolion-hev', 'Ficha Jolion PRO HEV', 'https://gwm.com.ar/FT-Jolion-Pro-HEV-2.pdf', 'primaria', 'Ficha Jolion PRO HEV', '1.5 atmosférico, no turbo.');
const jhevweb = fuente('gwm-jolion-hev-web', 'Página Jolion PRO HEV', 'https://gwm.com.ar/modelos/jolion-pro-hev', 'primaria', 'Observada el 8/11/2026', 'Precios de Supreme. Sin vencimiento comprobado.');
const ora = fuente('gwm-ora', 'Ficha ORA 03', 'https://gwm.com.ar/FT-ORA-03.pdf', 'primaria', 'PDF ORA 03', 'Marca ORA, grupo GWM. No es un modelo Haval.');
const oraweb = fuente('gwm-ora-web', 'Página ORA', 'https://gwm.com.ar/modelos/ora', 'primaria', 'Observada el 8/11/2026', 'Redondea 170 HP y publica otra ventana de carga DC.');
const poerL = fuente('gwm-poer-l', 'Ficha Poer Luxury', 'https://gwm.com.ar/FT-Poer-Luxury.pdf', 'primaria', 'Documento 4WD Super Luxury 8AT', '163 CV, no 188 HP.');
const poerLweb = fuente('gwm-poer-l-web', 'Página Poer Luxury', 'https://gwm.com.ar/modelos/poer-luxury', 'primaria', 'Observada el 8/11/2026', 'Super Luxury 8AT.');
const poerE = fuente('gwm-poer-e', 'Ficha Poer Elite', 'https://gwm.com.ar/FT-Poer-Elite.pdf', 'primaria', 'Ficha Elite', 'PBV no trasladado: parece inconsistente con tara y carga.');
const poerEweb = fuente('gwm-poer-e-web', 'Página Poer Elite', 'https://gwm.com.ar/modelos/poer-elite', 'primaria', 'Observada el 8/11/2026', 'Precios 2WD y 4WD por separado.');

const observado = 'Observado el 8/11/2026 en la web oficial. No hay vencimiento comprobado. Dólares según cotización oficial BNA. La consulta no prueba vigencia.';
const anioGwm = anioDe('ficha oficial GWM vigente en la consulta; no se la asigna a la etiqueta 2025');

export const gwmSheets = [
  ficha({
    id: 'haval-h6-2025',
    cobertura: 'integrada',
    correspondencia:
      'La ficha oficial actual es H6 4WD 2.0T de 235 CV, 320 Nm y 9DCT. No actualiza en silencio al H6 publicado con 201 HP y DCT7. El precio de USD 39.900 es el de esa página 4WD.',
    fuentes: [h6, h6web],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', '2.0 turbo', 'gwm-h6'),
        hecho('Potencia', '235 CV', 'gwm-h6'),
        hecho('Torque', '320 Nm', 'gwm-h6'),
      ]),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', '9DCT', 'gwm-h6'),
        hecho('Tracción', '4WD', 'gwm-h6'),
        hecho('Tanque', '62 L', 'gwm-h6'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.653 × 1.886 × 1.730 mm', 'gwm-h6'),
        hecho('Distancia entre ejes', '2.738 mm', 'gwm-h6'),
        hecho('Neumáticos', '225/55 R19', 'gwm-h6'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y multibrazo', 'gwm-h6'),
        hecho('Frenos', 'Discos ventilados y sólidos', 'gwm-h6'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', 'Frontales, laterales y de cortina', 'gwm-h6'),
        hecho('Estabilidad', 'ESP', 'gwm-h6'),
        hecho('ADAS', 'ACC, AEB, LKA y BSD', 'gwm-h6'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Pantalla', '14,6 pulgadas', 'gwm-h6'),
        hecho('HUD', 'Sí, en esta ficha', 'gwm-h6'),
      ]),
    ],
    conflictos: [],
    pendientes: [
      'No hay ficha argentina que confirme el conjunto 201 HP / DCT7 / tanque de 60 L / 6 airbags / pantalla de 12,3 pulgadas. Esos datos se retiran.',
      'Peso.',
    ],
    precios: [
      precio({
        version: 'H6 4WD',
        lista: 39900,
        fechaLista: 'no explicitada',
        vigencia: observado,
        fuenteId: 'gwm-h6-web',
        estado: 'observado-sin-vencimiento',
        nota: 'No es el precio de un H6 201 HP/DCT7.',
      }),
    ],
    public: basePublic({
      descripcion:
        'Haval H6 4WD con motor 2.0 turbo de 235 CV y caja 9DCT.',
      combustible: 'Nafta',
      transmision: '9DCT',
      precio:
        'USD 39.900 — H6 4WD, observado en gwm.com.ar el 8/11/2026, sin vencimiento comprobado.',
      precioOrden: { moneda: 'USD', monto: 39900 },
      especificaciones: {
        motor: '2.0 turbo (H6 4WD actual)',
        potencia: '235 CV',
        traccion: '4WD',
        capacidad_tanque: '62 L',
        peso: PEND,
      },
      caracteristicas: [
        'Airbags frontales, laterales y de cortina, ESP',
        'ACC, AEB, LKA y BSD',
        'Pantalla de 14,6 pulgadas y HUD',
      ],
      anioNota: anioGwm,
      avisoCorto: 'Ficha actual H6 4WD (235 CV, 9DCT), distinta del 201 HP/DCT7.',
      aviso:
        'Se muestran los datos de la ficha oficial actual H6 4WD. No actualizan en silencio la publicación anterior de 201 HP y DCT7, que queda retirada por falta de correspondencia.',
    }),
  }),
  ficha({
    id: 'haval-h6-hev-2025',
    cobertura: 'integrada',
    correspondencia:
      'Ficha H6 HEV Deluxe/Supreme. No es el H6 PRO HEV ni debe llevar su precio. Caja DHT, no E-CVT. Tanque 61 L. El documento publica combinados de 243 HP y 530 Nm además de las cifras por motor. ACC, BSD, LKA y cámara 360° son Supreme.',
    fuentes: [h6hev],
    secciones: [
      seccion('motor', 'Motores', [
        hecho('Térmico', '1.5 turbo, 147 HP y 230 Nm', 'gwm-h6-hev'),
        hecho('Eléctrico', '174 HP y 300 Nm', 'gwm-h6-hev'),
        hecho('Potencia combinada', '243 HP y 530 Nm', 'gwm-h6-hev'),
        hecho('Batería', '1,76 kWh', 'gwm-h6-hev'),
      ]),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'DHT', 'gwm-h6-hev'),
        hecho('Tracción', '2WD', 'gwm-h6-hev'),
        hecho('Tanque', '61 L', 'gwm-h6-hev'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.683 × 1.886 × 1.730 mm', 'gwm-h6-hev'),
        hecho('Distancia entre ejes', '2.738 mm', 'gwm-h6-hev'),
        hecho('Neumáticos', '225/60 R18 Deluxe y 225/55 R19 Supreme', 'gwm-h6-hev'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y multibrazo', 'gwm-h6-hev'),
        hecho('Frenos', 'Discos ventilados y sólidos', 'gwm-h6-hev'),
      ]),
      seccion('seguridad', 'Seguridad por versión', [
        hecho('Airbags', '6', 'gwm-h6-hev'),
        hecho('AEB', 'Deluxe y Supreme', 'gwm-h6-hev'),
        hecho('Solo Supreme', 'ACC, BSD, LKA y cámara 360°', 'gwm-h6-hev'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Multimedia', '12,3 pulgadas, Android Auto y Apple CarPlay', 'gwm-h6-hev'),
        hecho('Clima y techo', 'Climatizador bizona y techo panorámico', 'gwm-h6-hev'),
      ]),
    ],
    conflictos: [],
    pendientes: [
      'Precio: el H6 PRO HEV de listas de octubre no se aplica a este H6 HEV.',
      'Peso. Se retira el valor aproximado de 1.700 kg y el consumo menor a 6 L/100 km.',
    ],
    precios: [],
    public: basePublic({
      descripcion:
        'Haval H6 HEV, distinto del H6 PRO HEV: motor térmico 1.5 turbo de 147 HP, eléctrico de 174 HP y 243 HP combinados. Caja DHT y tanque de 61 litros.',
      combustible: 'Híbrido (HEV)',
      transmision: 'DHT',
      precio: 'Consultar precio. No se usa el valor publicado para el H6 PRO HEV.',
      especificaciones: {
        motor: '1.5T 147 HP + eléctrico 174 HP',
        potencia: '243 HP y 530 Nm combinados',
        traccion: '2WD',
        capacidad_tanque: '61 L',
        peso: PEND,
      },
      caracteristicas: [
        '6 airbags; AEB en Deluxe y Supreme',
        'ACC, BSD, LKA y cámara 360° solo en Supreme',
        'Pantalla de 12,3 pulgadas, bizona y techo panorámico',
      ],
      anioNota: anioGwm,
      avisoCorto: 'Es H6 HEV Deluxe/Supreme, no H6 PRO HEV.',
    }),
  }),
  ficha({
    id: 'haval-h6gt-2025',
    cobertura: 'integrada',
    correspondencia:
      '2.0T de 201 HP, 320 Nm, DCT7 y 4WD, tanque de 62 L. El PDF anuncia 7 airbags. Dimensiones y suspensión no se copian: el PDF las iguala al H6 y habla de eje semirrígido, datos que el relevamiento marcó como sospechosos.',
    fuentes: [gt, gtweb],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', '2.0 turbo', 'gwm-h6gt'),
        hecho('Potencia', '201 HP', 'gwm-h6gt'),
        hecho('Torque', '320 Nm', 'gwm-h6gt'),
      ]),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'DCT de 7 marchas', 'gwm-h6gt'),
        hecho('Tracción', '4WD', 'gwm-h6gt'),
        hecho('Tanque', '62 L', 'gwm-h6gt'),
        hecho('Neumáticos', '235/55 R19', 'gwm-h6gt'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '7', 'gwm-h6gt'),
      ]),
    ],
    conflictos: [
      'Dimensiones y suspensión del PDF no se publican: repiten al H6 y mencionan eje semirrígido, combinación marcada como sospechosa.',
    ],
    pendientes: ['Desglose de ADAS.', 'Peso, techo y control de descenso: no están confirmados en el extracto.'],
    precios: [
      precio({
        version: 'H6GT',
        lista: 44400,
        bonificado: 41990,
        fechaLista: 'no explicitada',
        vigencia: observado,
        fuenteId: 'gwm-h6gt-web',
        estado: 'observado-sin-vencimiento',
      }),
    ],
    public: basePublic({
      descripcion:
        'SUV coupé con motor 2.0 turbo de 201 HP, DCT de 7 marchas y tracción 4WD.',
      combustible: 'Nafta',
      transmision: 'DCT 7',
      precio:
        'Lista USD 44.400 / bonificado USD 41.990 — H6GT, web GWM observada el 8/11/2026, sin vencimiento comprobado.',
      precioOrden: { moneda: 'USD', monto: 44400 },
      especificaciones: {
        motor: '2.0 turbo',
        potencia: '201 HP',
        traccion: '4WD',
        capacidad_tanque: '62 L',
        peso: PEND,
      },
      caracteristicas: [
        '7 airbags',
      ],
      anioNota: anioGwm,
      avisoCorto: 'Sin medidas ni suspensión: el PDF las deja en duda.',
    }),
  }),
  ficha({
    id: 'haval-jolion-2025',
    cobertura: 'integrada',
    correspondencia:
      'Jolion naftero Deluxe/Supreme: 1.5 turbo, 141 HP y DCT7. El torque “210” tiene la unidad mal rotulada y no se publica. ADAS y equipamiento deben separarse por versión, pero el extracto no trae ese reparto: no se generalizan pantalla, cámara ni ISOFIX.',
    fuentes: [jolion],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', '1.5 turbo', 'gwm-jolion'),
        hecho('Potencia', '141 HP entre 5.600 y 6.000 rpm', 'gwm-jolion'),
      ]),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'DCT de 7 marchas', 'gwm-jolion'),
        hecho('Tracción', 'Delantera', 'gwm-jolion'),
        hecho('Tanque', '55 L', 'gwm-jolion'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.472 × 1.841 × 1.619 mm', 'gwm-jolion'),
        hecho('Distancia entre ejes', '2.700 mm', 'gwm-jolion'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y eje semirrígido', 'gwm-jolion'),
        hecho('Frenos', 'Discos en las cuatro ruedas', 'gwm-jolion'),
      ]),
    ],
    conflictos: [
      'El PDF indica torque 210 con la unidad mal rotulada. No se publica Nm ni otra unidad.',
    ],
    pendientes: [
      'Reparto de ADAS y equipamiento entre Deluxe y Supreme.',
      'Precio oficial actual de la variante naftera.',
      'Peso.',
    ],
    precios: [],
    public: basePublic({
      descripcion:
        'Jolion naftero en versiones Deluxe y Supreme: 1.5 turbo de 141 HP y DCT de 7 marchas. Es distinto del Jolion PRO HEV.',
      combustible: 'Nafta',
      transmision: 'DCT 7',
      precio: 'Consultar precio. No hay lista oficial actual de esta variante naftera.',
      especificaciones: {
        motor: '1.5 turbo',
        potencia: '141 HP entre 5.600 y 6.000 rpm',
        traccion: 'Delantera',
        capacidad_tanque: '55 L',
        peso: PEND,
      },
      caracteristicas: [
        'Versiones Deluxe y Supreme',
        'Discos en las cuatro ruedas',
      ],
      anioNota: anioGwm,
      avisoCorto: 'Naftero Deluxe/Supreme. No mezclar con el PRO HEV.',
    }),
  }),
  ficha({
    id: 'haval-jolion-pro-hev-2025',
    cobertura: 'integrada',
    correspondencia:
      '1.5 atmosférico, no turbo. Térmico 94 HP, eléctrico 154 HP y combinados publicados 188 HP/376 Nm. Caja DHT. El precio de la web es solo Supreme.',
    fuentes: [jhev, jhevweb],
    secciones: [
      seccion('motor', 'Motores', [
        hecho('Térmico', '1.5 atmosférico, 94 HP y 125 Nm', 'gwm-jolion-hev'),
        hecho('Eléctrico', '154 HP y 250 Nm', 'gwm-jolion-hev'),
        hecho('Potencia combinada', '188 HP y 376 Nm', 'gwm-jolion-hev'),
        hecho('Batería', '1,76 kWh', 'gwm-jolion-hev'),
      ]),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'DHT', 'gwm-jolion-hev'),
        hecho('Tracción', '2WD', 'gwm-jolion-hev'),
        hecho('Tanque', '55 L', 'gwm-jolion-hev'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.470 × 1.898 × 1.625 mm', 'gwm-jolion-hev'),
        hecho('Distancia entre ejes', '2.700 mm', 'gwm-jolion-hev'),
        hecho('Neumáticos', '225/55 R18', 'gwm-jolion-hev'),
      ]),
      seccion('chasis', 'Suspensión', [
        hecho('Suspensión', 'McPherson y multibrazo, según esta ficha', 'gwm-jolion-hev'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '6', 'gwm-jolion-hev'),
        hecho('Estabilidad', 'ESC', 'gwm-jolion-hev'),
        hecho('ADAS', 'AEB, ACC, LKA, BSD, RCTA y cámara 360°', 'gwm-jolion-hev'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Pantalla', '12,3 pulgadas', 'gwm-jolion-hev'),
        hecho('Clima y butacas', 'Climatizador bizona y butacas delanteras calefaccionadas', 'gwm-jolion-hev'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Peso. Techo panorámico: no está en el extracto de esta ficha.'],
    precios: [
      precio({
        version: 'Jolion PRO HEV Supreme',
        lista: 32990,
        bonificado: 30990,
        fechaLista: 'no explicitada',
        vigencia: observado,
        fuenteId: 'gwm-jolion-hev-web',
        estado: 'observado-sin-vencimiento',
        nota: 'Solo la versión Supreme nombrada en la web.',
      }),
    ],
    public: basePublic({
      descripcion:
        'Jolion PRO HEV con motor 1.5 atmosférico: 94 HP térmicos, 154 HP eléctricos y 188 HP combinados. Caja DHT.',
      combustible: 'Híbrido (HEV)',
      transmision: 'DHT',
      precio:
        'Lista USD 32.990 / bonificado USD 30.990 — solo Jolion PRO HEV Supreme, web GWM el 8/11/2026, sin vencimiento comprobado.',
      precioOrden: { moneda: 'USD', monto: 32990 },
      especificaciones: {
        motor: '1.5 atmosférico 94 HP + eléctrico 154 HP',
        potencia: '188 HP y 376 Nm combinados publicados',
        traccion: '2WD',
        capacidad_tanque: '55 L',
        peso: PEND,
      },
      caracteristicas: [
        '1.5 atmosférico y caja DHT',
        '6 airbags, ESC, AEB, ACC, LKA, BSD, RCTA y cámara 360°',
        'Pantalla de 12,3 pulgadas, bizona y butacas delanteras calefaccionadas',
      ],
      anioNota: anioGwm,
      avisoCorto: 'Atmosférico y DHT. El precio es solo Supreme.',
    }),
  }),
  ficha({
    id: 'ora-3-2025',
    cobertura: 'integrada',
    correspondencia:
      'ORA 03 es marca ORA, de GWM, no un Haval. PDF: 126 kW/169 HP; la web redondea 170 HP. Batería LFP de 48 kWh. Autonomía 370 km NEDC o 310 km WLTP, siempre con el ciclo. Se retiran 105 kW, 143 HP, 47,8 kWh, 63 kWh y 400 km.',
    fuentes: [ora, oraweb],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Potencia', '126 kW / 169 HP', 'gwm-ora'),
        hecho('Torque', '250 Nm', 'gwm-ora'),
        hecho('Tracción', 'Delantera', 'gwm-ora'),
      ]),
      seccion('ev', 'Batería y carga', [
        hecho('Batería', 'LFP, 48 kWh', 'gwm-ora'),
        hecho('Autonomía', '370 km NEDC o 310 km WLTP', 'gwm-ora'),
        hecho('Carga AC', '11 kW', 'gwm-ora'),
        hecho('Carga DC', '60 kW, conector CCS2', 'gwm-ora'),
        hecho('Ventana del PDF', 'DC 10–80 % en 40 minutos', 'gwm-ora'),
        hecho('Ventana de la web', '20–80 % en 36 minutos', 'gwm-ora-web', 'confirmado', 'No es la misma ventana de estado de carga que el PDF.'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.235 × 1.825 × 1.603 mm', 'gwm-ora'),
        hecho('Distancia entre ejes', '2.650 mm', 'gwm-ora'),
        hecho('Baúl', '282 / 858 L', 'gwm-ora'),
        hecho('Peso', '1.540 kg', 'gwm-ora'),
        hecho('Neumáticos', '215/50 R18', 'gwm-ora'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y eje torsional', 'gwm-ora'),
        hecho('Frenos', 'Discos en las cuatro ruedas', 'gwm-ora'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '7', 'gwm-ora'),
        hecho('Estabilidad y ADAS', 'ESP y ADAS', 'gwm-ora'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Pantallas', '10,25 pulgadas, Android Auto y Apple CarPlay inalámbricos', 'gwm-ora'),
        hecho('Cámara', '360°', 'gwm-ora'),
      ]),
    ],
    conflictos: [],
    pendientes: [],
    precios: [
      precio({
        version: 'ORA 03 Deluxe',
        lista: 31000,
        bonificado: 29900,
        fechaLista: 'no explicitada',
        vigencia: observado,
        fuenteId: 'gwm-ora-web',
        estado: 'observado-sin-vencimiento',
        nota: 'No se funde con los USD 29.000 de una lista de octubre alojada en otro medio.',
      }),
    ],
    public: basePublic({
      descripcion:
        'Hatchback eléctrico ORA, de Great Wall: 126 kW, batería LFP de 48 kWh y 370 km NEDC o 310 km WLTP.',
      combustible: '100% Eléctrico',
      transmision: 'Delantera, relación del motor eléctrico',
      precio:
        'Lista USD 31.000 / bonificado USD 29.900 — ORA 03 Deluxe, web GWM el 8/11/2026, sin vencimiento comprobado.',
      precioOrden: { moneda: 'USD', monto: 31000 },
      especificaciones: {
        motor: 'Eléctrico',
        potencia: '126 kW / 169 HP',
        traccion: 'Delantera',
        capacidad_tanque: SIN_TANQUE,
        peso: '1.540 kg',
      },
      caracteristicas: [
        'Marca ORA, de Great Wall',
        'Batería LFP de 48 kWh',
        '370 km NEDC o 310 km WLTP',
        'AC 11 kW, DC 60 kW, CCS2 y 7 airbags',
      ],
      anioNota: anioGwm,
      avisoCorto: 'Marca ORA, no Haval. Batería 48 kWh.',
      aviso:
        'La URL anterior bajo Haval redirige acá. ORA 03 no es un modelo Haval. Se retiraron 143 HP, 47,8 kWh, 63 kWh y 400 km.',
    }),
  }),
  ficha({
    id: 'greatwall-poer-luxury-2025',
    cobertura: 'integrada',
    correspondencia:
      'El documento es 4WD Super Luxury 8AT: 2.0 diésel de 163 CV y 400 Nm, no 188 HP. El precio web corresponde a esa versión.',
    fuentes: [poerL, poerLweb],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', '2.0 diésel', 'gwm-poer-l'),
        hecho('Potencia', '163 CV', 'gwm-poer-l'),
        hecho('Torque', '400 Nm entre 1.500 y 2.500 rpm', 'gwm-poer-l'),
      ]),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'ZF, automática de 8 marchas', 'gwm-poer-l'),
        hecho('Tracción', '4x4 con TOD, reductora y bloqueo trasero', 'gwm-poer-l'),
      ]),
      seccion('dimensiones', 'Dimensiones y caja', [
        hecho('Medidas', '5.410 × 1.934 × 1.886 mm', 'gwm-poer-l'),
        hecho('Distancia entre ejes', '3.230 mm', 'gwm-poer-l'),
        hecho('Tanque', '80 L', 'gwm-poer-l'),
        hecho('Carga', '975 kg', 'gwm-poer-l'),
        hecho('Neumáticos', '265/60 R18', 'gwm-poer-l'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'Doble horquilla y ballestas', 'gwm-poer-l'),
        hecho('Frenos', 'Discos ventilados y sólidos', 'gwm-poer-l'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', '6', 'gwm-poer-l'),
        hecho('Estabilidad', 'ESC', 'gwm-poer-l'),
        hecho('ADAS', 'ACC, AEB, LKA y cámara 360°', 'gwm-poer-l'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Pantalla', '9 pulgadas, Android Auto y Apple CarPlay', 'gwm-poer-l'),
        hecho('Butacas', 'Climatizador, asientos eléctricos y calefaccionados', 'gwm-poer-l'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Vehículo', '6 años o 150.000 km', 'gwm-poer-l'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Peso. Se retira el valor aproximado de 2.050 kg.'],
    precios: [
      precio({
        version: 'Poer Super Luxury 8AT',
        lista: 41990,
        bonificado: 39990,
        fechaLista: 'no explicitada',
        vigencia: observado,
        fuenteId: 'gwm-poer-l-web',
        estado: 'observado-sin-vencimiento',
      }),
    ],
    public: basePublic({
      descripcion:
        'Pick-up diésel 4WD Super Luxury con caja automática ZF de 8 marchas, 163 CV y 400 Nm.',
      combustible: 'Diésel',
      transmision: 'ZF AT8',
      precio:
        'Lista USD 41.990 / bonificado USD 39.990 — Poer Super Luxury 8AT, web GWM el 8/11/2026, sin vencimiento comprobado.',
      precioOrden: { moneda: 'USD', monto: 41990 },
      especificaciones: {
        motor: '2.0 diésel',
        potencia: '163 CV',
        traccion: '4x4 con reductora y bloqueo trasero',
        capacidad_tanque: '80 L',
        peso: PEND,
      },
      caracteristicas: [
        'Versión documentada: 4WD Super Luxury 8AT',
        '6 airbags, ESC, ACC, AEB, LKA y cámara 360°',
        'Pantalla de 9 pulgadas y asientos eléctricos calefaccionados',
        'Garantía 6 años o 150.000 km',
      ],
      anioNota: anioGwm,
      avisoCorto: '163 CV en la ficha local. Se retiraron 188 HP.',
    }),
  }),
  ficha({
    id: 'greatwall-poer-elite-2025',
    cobertura: 'integrada',
    correspondencia:
      '2.0 diésel de 161 HP a 3.600 rpm y 400 Nm, manual de 6 marchas, en 2WD o 4WD. No es automática ni llega a 188 HP. El PBV del PDF no se publica. Los precios web distinguen 2WD y 4WD.',
    fuentes: [poerE, poerEweb],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', '2.0 diésel', 'gwm-poer-e'),
        hecho('Potencia', '161 HP a 3.600 rpm', 'gwm-poer-e'),
        hecho('Torque', '400 Nm entre 1.500 y 2.500 rpm', 'gwm-poer-e'),
      ]),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Caja', 'Manual de 6 marchas', 'gwm-poer-e'),
        hecho('Tracción', '2WD o 4WD', 'gwm-poer-e'),
      ]),
      seccion('dimensiones', 'Dimensiones y caja', [
        hecho('Medidas', '5.425 × 1.883 × 1.882 mm', 'gwm-poer-e'),
        hecho('Distancia entre ejes', '3.230 mm', 'gwm-poer-e'),
        hecho('Tanque', '80 L', 'gwm-poer-e'),
        hecho('Carga', '1.050 kg', 'gwm-poer-e'),
        hecho('Neumáticos', '245/70 R17', 'gwm-poer-e'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'Doble horquilla y ballestas', 'gwm-poer-e'),
        hecho('Frenos', 'Discos ventilados y sólidos', 'gwm-poer-e'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Estabilidad', 'ESP', 'gwm-poer-e'),
        hecho('Airbags', 'Frontales y laterales', 'gwm-poer-e'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Pantalla', '9 pulgadas, Android Auto y Apple CarPlay', 'gwm-poer-e'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Vehículo', '6 años o 150.000 km', 'gwm-poer-e'),
      ]),
    ],
    conflictos: [
      'El PBV del PDF parece inconsistente con tara y carga. No se publica.',
    ],
    pendientes: ['Peso en vacío consistente.'],
    precios: [
      precio({
        version: 'Poer Elite 2WD',
        lista: 28730,
        bonificado: 28030,
        fechaLista: 'no explicitada',
        vigencia: observado,
        fuenteId: 'gwm-poer-e-web',
        estado: 'observado-sin-vencimiento',
        nota: 'La web llama “final” al valor bonificado.',
      }),
      precio({
        version: 'Poer Elite 4WD',
        lista: 32697,
        bonificado: 30697,
        fechaLista: 'no explicitada',
        vigencia: observado,
        fuenteId: 'gwm-poer-e-web',
        estado: 'observado-sin-vencimiento',
      }),
    ],
    public: basePublic({
      descripcion:
        'Pick-up diésel Elite de 161 HP con caja manual de 6 marchas, en tracción simple o 4x4.',
      combustible: 'Diésel',
      transmision: 'Manual 6 velocidades',
      precio:
        'Elite 2WD lista USD 28.730 / final USD 28.030; Elite 4WD lista USD 32.697 / final USD 30.697. Web GWM el 8/11/2026, sin vencimiento comprobado.',
      precioOrden: { moneda: 'USD', monto: 28730 },
      especificaciones: {
        motor: '2.0 diésel',
        potencia: '161 HP a 3.600 rpm',
        traccion: '2WD o 4WD',
        capacidad_tanque: '80 L',
        peso: PEND,
      },
      caracteristicas: [
        'Carga 1.050 kg',
        'ESP y airbags frontales y laterales',
        'Pantalla de 9 pulgadas con Android Auto y Apple CarPlay',
        'Garantía 6 años o 150.000 km',
      ],
      anioNota: anioGwm,
      avisoCorto: '161 HP y manual. Precios distintos para 2WD y 4WD.',
    }),
  }),
  ficha({
    id: 'greatwall-wingle-7-2025',
    cobertura: 'pendiente',
    correspondencia:
      'No apareció documentación argentina oficial de la denominación Wingle 7. Hay Wingle 5, Wingle 6 y Poer, y sus datos no se trasladan. Se retiran 143 HP, tanque de 70 L, peso, ESP y el resto de la ficha previa.',
    fuentes: [],
    secciones: [],
    conflictos: [],
    pendientes: [
      'Existencia, comercialización, versión y ficha técnica local de Wingle 7.',
      'Precio trazable.',
    ],
    precios: [],
    public: basePublic({
      descripcion:
        'Pick-up publicada en el catálogo sin una ficha argentina verificada para el nombre Wingle 7. No se completó con datos de Wingle 5, Wingle 6 ni Poer.',
      combustible: 'Sin confirmar',
      transmision: 'Sin confirmar',
      precio: 'Consultar precio. Sin lista local verificada para Wingle 7.',
      especificaciones: {
        motor: PEND,
        potencia: PEND,
        traccion: PEND,
        capacidad_tanque: PEND,
        peso: PEND,
      },
      caracteristicas: [],
      anioNota: anioDe('ningún documento local de Wingle 7; la etiqueta de año no acredita una ficha'),
      avisoCorto: 'Sin ficha argentina verificada. Especificaciones previas retiradas.',
      aviso:
        'No se encontró documentación oficial argentina de Wingle 7. Las cifras que mostraba la página se retiraron para no conservar datos sin fuente.',
    }),
  }),
];
