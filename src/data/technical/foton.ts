import { anioDe, basePublic, ficha, fuente, hecho, PEND, seccion } from './helpers';

const tmCs = fuente('foton-tm-cs', 'Ficha TM1 cabina simple', 'https://foton.com.ar/wp-content/uploads/2024/12/FT-Foton-TM1-CS-1.pdf', 'primaria', 'PDF de ruta diciembre 2024, leído en tabla escaneada', 'No mezclar con TM1 HD ni Box.');
const tmCd = fuente('foton-tm-cd', 'Ficha TM1 cabina doble', 'https://foton.com.ar/wp-content/uploads/2024/12/FT-Foton-TM1-CD-1.pdf', 'primaria', 'PDF de ruta diciembre 2024, leído en tabla escaneada', 'No mezclar con TM1 HD ni Box.');
const tmIdx = fuente('foton-tm-idx', 'Índice TM', 'https://foton.com.ar/tm-2/', 'primaria', 'Página oficial');
const wCs = fuente('foton-w-cs', 'Ficha Wonder cabina simple', 'https://foton.com.ar/wp-content/uploads/2026/10/FT-Foton-Wonder-CS.pdf', 'primaria', 'PDF actual, código interno julio 2025', '1.597 cm³ y 120 HP, no 1.2/85 HP.');
const wCd = fuente('foton-w-cd', 'Ficha Wonder cabina doble', 'https://foton.com.ar/wp-content/uploads/2026/10/FT-Foton-Wonder-CD.pdf', 'primaria', 'PDF actual, código interno julio 2025');
const g7 = fuente('foton-g7', 'Ficha Tunland G7 línea completa', 'https://foton.com.ar/wp-content/uploads/2026/10/FTN-005-Ficha-Tecnica-Tunland-G7-LINEA-COMPLETA-v1.pdf', 'primaria', 'Línea completa, ruta octubre 2026', 'Motor AUCAN, no Cummins. No atribuir toda la gama 2026 a la etiqueta 2025.');
const gratour = fuente('foton-gratour', 'Nota de lanzamiento Gratour T3', 'https://www.autoweb.com.ar/2018/09/17/foton-lanza-el-gratour-t3/', 'historica', '17/9/2018', 'Cobertura secundaria histórica. No es ficha oficial vigente ni trae precio actual.');

const anioTm = anioDe('ficha TM1 de diciembre 2024; no incluye TM1 HD ni Box');
const anioWonder = anioDe('PDF de ruta octubre 2026 con código interno de julio 2025');
const consultar = 'Consultar precio. Sin lista vigente verificada en este relevamiento.';

function motorWonder(id: string) {
  return [
    hecho('Motor', 'Dong’an DAM16NS, 1.597 cm³', id),
    hecho('Potencia', '120 HP / 90 kW a 6.000 rpm', id),
    hecho('Torque', '158 Nm a 4.800 rpm', id),
    hecho('Caja', 'Manual de 5 marchas', id),
    hecho('Tanque', '50 L', id),
    hecho('Neumáticos', '175/70 R14', id),
  ];
}

export const fotonSheets = [
  ficha({
    id: 'foton-aumark-tm1-cs-2025',
    cobertura: 'integrada',
    correspondencia:
      'Cabina simple: Dong’an DAM16KR, 1.597 cm³, 120 HP/90 kW. No es 110 HP ni tanque de 45 L. El airbag figura como opcional, no como doble airbag de serie. Tara 1.255 kg.',
    fuentes: [tmCs, tmIdx],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', 'Dong’an DAM16KR, 1.597 cm³', 'foton-tm-cs'),
        hecho('Potencia', '120 HP / 90 kW a 6.000 rpm', 'foton-tm-cs'),
        hecho('Torque', '158 Nm a 4.800 rpm', 'foton-tm-cs'),
        hecho('Caja', 'Manual de 5 marchas', 'foton-tm-cs'),
        hecho('Tanque', '50 L', 'foton-tm-cs'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.880 × 1.680 × 1.920 mm', 'foton-tm-cs'),
        hecho('Distancia entre ejes', '2.600 mm', 'foton-tm-cs'),
        hecho('Caja', '3.050 × 1.560 × 360 mm', 'foton-tm-cs'),
        hecho('Tara', '1.255 kg', 'foton-tm-cs'),
        hecho('Neumáticos', '175/70 R14', 'foton-tm-cs'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y ballestas', 'foton-tm-cs'),
        hecho('Frenos', 'Discos y tambores', 'foton-tm-cs'),
        hecho('Frenos ABS', 'ABS y EBD', 'foton-tm-cs'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbag', 'Opcional', 'foton-tm-cs'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Habitáculo', 'Pantalla de 7 pulgadas, USB, cámara y aire acondicionado', 'foton-tm-cs'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Carga útil no separada de la tara en el extracto.', 'No mezclar con TM1 HD ni Box.'],
    precios: [],
    public: basePublic({
      descripcion:
        'Camión liviano de cabina simple: 1.597 cm³ y 120 HP. El airbag es opcional.',
      combustible: 'Nafta',
      transmision: 'Manual 5 velocidades',
      precio: consultar,
      especificaciones: {
        motor: '1.597 cm³ DAM16KR',
        potencia: '120 HP / 90 kW a 6.000 rpm',
        traccion: PEND,
        capacidad_tanque: '50 L',
        peso: 'Tara 1.255 kg',
      },
      caracteristicas: [
        'ABS y EBD',
        'Airbag opcional',
        'Pantalla de 7 pulgadas, USB, cámara y aire acondicionado',
        'Caja de 3,05 m',
      ],
      anioNota: anioTm,
      avisoCorto: '120 HP. Airbag opcional, no doble de serie.',
    }),
  }),
  ficha({
    id: 'foton-aumark-tm1-cd-2025',
    cobertura: 'integrada',
    correspondencia:
      'Cabina doble del mismo motor DAM16KR, 120 HP y tanque de 50 L. Tara 1.305 kg y 2+3 pasajeros. Airbag opcional. No es el TM1 HD.',
    fuentes: [tmCd, tmIdx],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', 'Dong’an DAM16KR, 1.597 cm³', 'foton-tm-cd'),
        hecho('Potencia', '120 HP / 90 kW a 6.000 rpm', 'foton-tm-cd'),
        hecho('Torque', '158 Nm a 4.800 rpm', 'foton-tm-cd'),
        hecho('Caja', 'Manual de 5 marchas', 'foton-tm-cd'),
        hecho('Tanque', '50 L', 'foton-tm-cd'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.925 × 1.680 × 1.920 mm', 'foton-tm-cd'),
        hecho('Distancia entre ejes', '2.600 mm', 'foton-tm-cd'),
        hecho('Caja', '2.300 × 1.560 × 360 mm', 'foton-tm-cd'),
        hecho('Tara', '1.305 kg', 'foton-tm-cd'),
        hecho('Plazas', '2+3', 'foton-tm-cd'),
        hecho('Neumáticos', '175/70 R14', 'foton-tm-cd'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y ballestas', 'foton-tm-cd'),
        hecho('Frenos', 'Discos y tambores; ABS y EBD', 'foton-tm-cd'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbag', 'Opcional', 'foton-tm-cd'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Habitáculo', 'Pantalla de 7 pulgadas, USB, cámara y aire acondicionado', 'foton-tm-cd'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Carga útil separada.', 'No mezclar con TM1 HD ni Box.'],
    precios: [],
    public: basePublic({
      descripcion:
        'Camión liviano de cabina doble: 1.597 cm³ y 120 HP, tara de 1.305 kg y caja de 2,30 m. El airbag es opcional.',
      combustible: 'Nafta',
      transmision: 'Manual 5 velocidades',
      precio: consultar,
      especificaciones: {
        motor: '1.597 cm³ DAM16KR',
        potencia: '120 HP / 90 kW a 6.000 rpm',
        traccion: PEND,
        capacidad_tanque: '50 L',
        peso: 'Tara 1.305 kg',
      },
      caracteristicas: [
        '2+3 pasajeros',
        'ABS, EBD y airbag opcional',
        'Pantalla de 7 pulgadas, USB, cámara y aire acondicionado',
      ],
      anioNota: anioTm,
      avisoCorto: '120 HP y airbag opcional. No es el TM1 HD.',
    }),
  }),
  ficha({
    id: 'foton-gratour-t3-cs-2025',
    cobertura: 'historica',
    correspondencia:
      'Solo hay cobertura histórica argentina de 2018, no una ficha oficial vigente. Simple: 1.2 de 86 CV, 10,2 kgm, carga 1.339 kg y caja de 2,80 m. Se retiran tanque de 40 L, peso y 85 HP.',
    fuentes: [gratour],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', '1.2', 'foton-gratour', 'historico'),
        hecho('Potencia', '86 CV', 'foton-gratour', 'historico'),
        hecho('Torque', '10,2 kgm', 'foton-gratour', 'historico'),
        hecho('Caja', 'Manual de 5 marchas', 'foton-gratour', 'historico'),
        hecho('Tracción', 'Trasera', 'foton-gratour', 'historico'),
      ]),
      seccion('carga', 'Carga', [
        hecho('Carga', '1.339 kg', 'foton-gratour', 'historico'),
        hecho('Caja', '2,80 m', 'foton-gratour', 'historico'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', 'Doble airbag', 'foton-gratour', 'historico'),
        hecho('Frenos', 'ABS', 'foton-gratour', 'historico'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Habitáculo', 'Radio USB y aire acondicionado', 'foton-gratour', 'historico'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Lanzamiento', '3 años o 100.000 km, como garantía de lanzamiento', 'foton-gratour', 'historico'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Ficha oficial argentina actual y precio vigente.'],
    precios: [],
    public: basePublic({
      descripcion:
        'Utilitario de cabina simple: motor 1.2 de 86 CV y 1.339 kg de carga.',
      combustible: 'Nafta',
      transmision: 'Manual 5 velocidades',
      precio: consultar,
      especificaciones: {
        motor: '1.2',
        potencia: '86 CV',
        traccion: 'Trasera',
        capacidad_tanque: PEND,
        peso: PEND,
      },
      caracteristicas: [
        'Doble airbag, ABS, radio USB y aire acondicionado',
        'Garantía de lanzamiento: 3 años o 100.000 km',
      ],
      anioNota: anioDe('nota del 17/9/2018, no una ficha vigente'),
      avisoCorto: 'Dato histórico de 2018. Sin ficha oficial actual.',
    }),
  }),
  ficha({
    id: 'foton-gratour-t3-cd-2025',
    cobertura: 'historica',
    correspondencia:
      'Misma nota de 2018. Doble cabina: carga 1.320 kg, caja de 2,10 m y 5 plazas. Sin ficha actual ni precio vigente.',
    fuentes: [gratour],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', '1.2', 'foton-gratour', 'historico'),
        hecho('Potencia', '86 CV', 'foton-gratour', 'historico'),
        hecho('Torque', '10,2 kgm', 'foton-gratour', 'historico'),
        hecho('Caja', 'Manual de 5 marchas', 'foton-gratour', 'historico'),
        hecho('Tracción', 'Trasera', 'foton-gratour', 'historico'),
      ]),
      seccion('carga', 'Carga', [
        hecho('Carga', '1.320 kg', 'foton-gratour', 'historico'),
        hecho('Caja', '2,10 m', 'foton-gratour', 'historico'),
        hecho('Plazas', '5', 'foton-gratour', 'historico'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Airbags', 'Doble airbag', 'foton-gratour', 'historico'),
        hecho('Frenos', 'ABS', 'foton-gratour', 'historico'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Habitáculo', 'Radio USB y aire acondicionado', 'foton-gratour', 'historico'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Lanzamiento', '3 años o 100.000 km, como garantía de lanzamiento', 'foton-gratour', 'historico'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Ficha oficial argentina actual y precio vigente.'],
    precios: [],
    public: basePublic({
      descripcion:
        'Gratour T3 de doble cabina: 86 CV, cinco plazas y 1.320 kg de carga.',
      combustible: 'Nafta',
      transmision: 'Manual 5 velocidades',
      precio: consultar,
      especificaciones: {
        motor: '1.2',
        potencia: '86 CV',
        traccion: 'Trasera',
        capacidad_tanque: PEND,
        peso: PEND,
      },
      caracteristicas: [
        '5 plazas y caja de 2,10 m',
        'Doble airbag y ABS',
      ],
      anioNota: anioDe('nota del 17/9/2018, no una ficha vigente'),
      avisoCorto: 'Dato histórico de 2018. Sin ficha oficial actual.',
    }),
  }),
  ficha({
    id: 'foton-tunland-g7-2025',
    cobertura: 'integrada',
    correspondencia:
      'La línea actual separa Lite MT6 4x2/4x4 y Ultimate ZF AT8 4x2/4x4. Motor AUCAN 4F20TC 2.0 diésel, no Cummins. 161 HP y tanque de 76 L. No se atribuye toda la gama 2026 a la etiqueta 2025. Seis airbags en todas; ADAS y cámara 360° solo Ultimate.',
    fuentes: [g7],
    secciones: [
      seccion('motor', 'Motor', [
        hecho('Motor', '2.0 diésel AUCAN 4F20TC', 'foton-g7'),
        hecho('Potencia', '161 HP a 4.000 rpm', 'foton-g7'),
        hecho('Torque', '390 Nm entre 1.800 y 2.600 rpm', 'foton-g7'),
      ]),
      seccion('transmision', 'Transmisión y tracción', [
        hecho('Lite', 'Manual de 6 marchas, 4x2 o 4x4', 'foton-g7'),
        hecho('Ultimate', 'ZF automática de 8 marchas, 4x2 o 4x4', 'foton-g7'),
        hecho('Tanque', '76 L', 'foton-g7'),
      ]),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '5.340 × 1.940 × 1.870 mm', 'foton-g7'),
        hecho('Distancia entre ejes', '3.110 mm', 'foton-g7'),
        hecho('Neumáticos', 'Lite 265/65 R17; Ultimate 265/60 R18', 'foton-g7'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'Doble horquilla y ballestas', 'foton-g7'),
        hecho('Frenos', 'Discos en las cuatro ruedas', 'foton-g7'),
      ]),
      seccion('seguridad', 'Seguridad por versión', [
        hecho('Todas', '6 airbags y ESC', 'foton-g7'),
        hecho('Solo Ultimate', 'AEB, FCW, LDW, alerta de punto ciego y cámara 360°', 'foton-g7'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Pantalla', 'Lite 8 pulgadas; Ultimate 10,25 pulgadas', 'foton-g7'),
      ]),
      seccion('garantia', 'Garantía', [
        hecho('Vehículo', '5 años o 150.000 km', 'foton-g7'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Peso y carga útil: no están en el extracto. Se retira 1.000 kg y el peso de 2.050 kg.'],
    precios: [],
    public: basePublic({
      descripcion:
        'Pick-up diésel con motor AUCAN de 161 HP. La versión Lite es manual y la Ultimate, automática ZF, en 4x2 o 4x4.',
      combustible: 'Diésel',
      transmision: 'MT6 Lite o ZF AT8 Ultimate',
      precio: consultar,
      especificaciones: {
        motor: '2.0 diésel AUCAN 4F20TC',
        potencia: '161 HP a 4.000 rpm',
        traccion: '4x2 o 4x4, según versión',
        capacidad_tanque: '76 L',
        peso: PEND,
      },
      caracteristicas: [
        '6 airbags y ESC en Lite y Ultimate',
        'AEB, FCW, LDW, punto ciego y cámara 360° solo en Ultimate',
        'Garantía 5 años o 150.000 km',
      ],
      anioNota: anioDe('línea completa en PDF de octubre 2026; no se asigna entera a la etiqueta 2025'),
      avisoCorto: 'Motor AUCAN, no Cummins. Lite y Ultimate no se mezclan.',
    }),
  }),
  ficha({
    id: 'foton-v9-2025',
    cobertura: 'retiro',
    correspondencia:
      'La página lo presentaba como van diésel de pasajeros. La oferta oficial actual muestra un Tunland V9 pickup, con variantes 2.0 diésel mild hybrid y naftera distintas entre sí. No se vuelca ninguna de esas fichas a esta URL y se retiran las especificaciones de van.',
    fuentes: [],
    secciones: [],
    conflictos: [],
    pendientes: [
      'Definir si esta URL debe quedar como van o pasar a identificar un Tunland V9, y cuál de sus mecánicas.',
      'Hasta esa decisión no hay especificaciones ni precio.',
    ],
    precios: [],
    public: basePublic({
      descripcion:
        'La identidad de esta ficha no está resuelta. No se publican especificaciones hasta saber qué vehículo corresponde.',
      combustible: 'Sin confirmar',
      transmision: 'Sin confirmar',
      categoria: 'Identidad sin resolver',
      precio: 'Sin precio: la identidad de la ficha no está resuelta.',
      especificaciones: {
        motor: PEND,
        potencia: PEND,
        traccion: PEND,
        capacidad_tanque: PEND,
        peso: PEND,
      },
      caracteristicas: [],
      anioNota: anioDe('identidad sin resolver; no hay año-modelo aplicable'),
      avisoCorto: 'Identidad sin resolver. No es una van confirmada ni un Tunland V9 cargado en silencio.',
      aviso:
        'Foton publica hoy un Tunland V9 pickup, con más de una mecánica. Esta página decía van diésel de hasta 15 pasajeros. Esas especificaciones y cualquier precio se retiraron. No se completó con datos del pickup.',
    }),
  }),
  ficha({
    id: 'foton-view-cs2-2025',
    cobertura: 'pendiente',
    correspondencia:
      'No cerró una ficha argentina oficial. Los resultados mezclaban otras regiones y no se trasladaron. Se retiran 129 HP, tanque de 70 L y el resto de cifras previas.',
    fuentes: [],
    secciones: [],
    conflictos: [],
    pendientes: ['Ficha argentina, versión, estado comercial y precio.'],
    precios: [],
    public: basePublic({
      descripcion:
        'Van publicada en el catálogo sin ficha argentina verificable. No se usaron datos de otros países.',
      combustible: 'Sin confirmar',
      transmision: 'Sin confirmar',
      precio: 'Consultar precio. Sin lista local verificada.',
      especificaciones: {
        motor: PEND,
        potencia: PEND,
        traccion: PEND,
        capacidad_tanque: PEND,
        peso: PEND,
      },
      caracteristicas: [],
      anioNota: anioDe('sin documento local; la etiqueta de año no acredita la ficha'),
      avisoCorto: 'Sin ficha argentina. Especificaciones previas retiradas.',
      aviso:
        'No se confirmó una ficha local del View CS2. Las cifras anteriores se retiraron para no mezclar otras regiones.',
    }),
  }),
  ficha({
    id: 'foton-wonder-2025',
    cobertura: 'integrada',
    correspondencia:
      'Cabina simple: 1.597 cm³ Dong’an DAM16NS, 120 HP/90 kW, no 1.2 ni 85 HP. Tanque 50 L, dos airbags y ESC. Tara 1.265 kg.',
    fuentes: [wCs],
    secciones: [
      seccion('motor', 'Motor', motorWonder('foton-w-cs')),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.870 × 1.710 × 1.980 mm', 'foton-w-cs'),
        hecho('Distancia entre ejes', '3.080 mm', 'foton-w-cs'),
        hecho('Caja', '2.850 × 1.570 × 360 mm', 'foton-w-cs'),
        hecho('Tara', '1.265 kg', 'foton-w-cs'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y ballestas', 'foton-w-cs'),
        hecho('Frenos', 'Discos y tambores', 'foton-w-cs'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Controles', 'ABS, EBD y ESC', 'foton-w-cs'),
        hecho('Airbags', '2', 'foton-w-cs'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Habitáculo', 'Pantalla MP5/USB, instrumental de 7 pulgadas, cámara, aire acondicionado y dirección eléctrica', 'foton-w-cs'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Precio vigente.'],
    precios: [],
    public: basePublic({
      descripcion:
        'Mini truck de cabina simple: 1.597 cm³ y 120 HP, con dos airbags y ESC.',
      combustible: 'Nafta',
      transmision: 'Manual 5 velocidades',
      precio: consultar,
      especificaciones: {
        motor: '1.597 cm³ DAM16NS',
        potencia: '120 HP / 90 kW a 6.000 rpm',
        traccion: PEND,
        capacidad_tanque: '50 L',
        peso: 'Tara 1.265 kg',
      },
      caracteristicas: [
        '2 airbags, ABS, EBD y ESC',
        'Caja de 2,85 m',
        'Pantalla MP5, instrumental de 7 pulgadas, cámara y aire acondicionado',
      ],
      anioNota: anioWonder,
      avisoCorto: '1.6 de 120 HP. Se retiró el 1.2 de 85 HP.',
    }),
  }),
  ficha({
    id: 'foton-wonder-cd-2025',
    cobertura: 'integrada',
    correspondencia:
      'Doble cabina del mismo 1.597 cm³ y 120 HP. Caja más corta, tara 1.335 kg y alto 1.990 mm. No es el motor 1.2.',
    fuentes: [wCd],
    secciones: [
      seccion('motor', 'Motor', motorWonder('foton-w-cd')),
      seccion('dimensiones', 'Dimensiones', [
        hecho('Medidas', '4.870 × 1.710 × 1.990 mm', 'foton-w-cd'),
        hecho('Distancia entre ejes', '3.080 mm', 'foton-w-cd'),
        hecho('Caja', '2.140 × 1.570 × 360 mm', 'foton-w-cd'),
        hecho('Tara', '1.335 kg', 'foton-w-cd'),
      ]),
      seccion('chasis', 'Suspensión y frenos', [
        hecho('Suspensión', 'McPherson y ballestas', 'foton-w-cd'),
        hecho('Frenos', 'Discos y tambores', 'foton-w-cd'),
      ]),
      seccion('seguridad', 'Seguridad', [
        hecho('Controles', 'ABS, EBD y ESC', 'foton-w-cd'),
        hecho('Airbags', '2', 'foton-w-cd'),
      ]),
      seccion('confort', 'Confort', [
        hecho('Habitáculo', 'Pantalla MP5/USB, instrumental de 7 pulgadas, cámara, aire acondicionado y dirección eléctrica', 'foton-w-cd'),
      ]),
    ],
    conflictos: [],
    pendientes: ['Precio vigente y carga útil.'],
    precios: [],
    public: basePublic({
      descripcion:
        'Wonder doble cabina: mismo 1.597 cm³ de 120 HP, caja de 2,14 m y tara de 1.335 kg.',
      combustible: 'Nafta',
      transmision: 'Manual 5 velocidades',
      precio: consultar,
      especificaciones: {
        motor: '1.597 cm³ DAM16NS',
        potencia: '120 HP / 90 kW a 6.000 rpm',
        traccion: PEND,
        capacidad_tanque: '50 L',
        peso: 'Tara 1.335 kg',
      },
      caracteristicas: [
        '2 airbags, ABS, EBD y ESC',
        'Caja de 2,14 m',
        'Pantalla MP5, instrumental de 7 pulgadas, cámara y aire acondicionado',
      ],
      anioNota: anioWonder,
      avisoCorto: '1.6 de 120 HP. Se retiró el 1.2 de 85 HP.',
    }),
  }),
];
