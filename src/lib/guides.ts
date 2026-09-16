export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  updatedAt: string;
  sections: GuideSection[];
}

export const guides: Guide[] = [
  {
    slug: 'mejores-suv-chinos-argentina',
    title: 'SUV chinos en Argentina: cómo comparar y qué mirar',
    description:
      'Guía práctica para evaluar SUV chinos en Argentina según tamaño, equipamiento, consumo y uso familiar o urbano.',
    seoTitle: 'SUV Chinos Argentina: Cómo Comparar Modelos y Equipamiento',
    updatedAt: '2026-09',
    sections: [
      {
        heading: 'Por qué los SUV chinos crecieron tanto',
        paragraphs: [
          'En los últimos años el segmento SUV concentró gran parte de la oferta de marcas chinas en Argentina. Combina altura de manejo, espacio interior y percepción de seguridad, con precios de lista que suelen competir frente a rivales tradicionales del mismo tamaño.',
          'Eso no significa que “cualquier SUV chino” sirva para el mismo uso. Un compacto urbano no se comporta igual que un SUV mediano de 7 plazas o una pick-up derivada. La clave es alinear tamaño, motor y equipamiento con tu día a día.',
        ],
      },
      {
        heading: 'Tamaños: compacto, mediano y grande',
        paragraphs: [
          'Antes de enamorarte del diseño, definí el segmento. Un SUV compacto alcanza para ciudad y viajes cortos; un mediano suma espacio de baúl y plaza trasera más usable; uno grande o de tres filas prioriza familia numerosa o carga frecuente.',
        ],
        bullets: [
          'Compacto: maniobra fácil, consumo más contenido, baúl chico o mediano.',
          'Mediano: mejor compromiso familiar; mirá distancia entre ejes y acceso a plazas traseras.',
          'Grande / 7 plazas: verificá habitabilidad real de la tercera fila y peso en vacío.',
        ],
      },
      {
        heading: 'Qué revisar en la ficha técnica',
        paragraphs: [
          'En autoschinos.ar cada modelo resume combustible, transmisión, categoría y equipamiento destacado. Completá la lectura con: potencia real de la versión que te interesa, tipo de tracción, asistencia a la conducción y garantía oficial publicada por la marca o el importador.',
          'Si dos modelos parecen similares, compará el paquete de seguridad (airbags, ESP, cámaras) y la conectividad (Android Auto / Apple CarPlay). Ahí suelen estar las diferencias que más se notan en el uso diario.',
        ],
      },
      {
        heading: 'Uso urbano vs ruta',
        paragraphs: [
          'Para ciudad priorizá visibilidad, cámara de estacionamiento y radio de giro. Para ruta o viajes largos, confort de butacas, aislamiento y ayudas como control de crucero pesan más. Un motor turbo chico puede ir sobrado en ciudad y sentirse justo con carga completa en ruta: pedí prueba de manejo con el uso real que vas a darle.',
        ],
      },
      {
        heading: 'Próximo paso',
        paragraphs: [
          'Explorá el catálogo filtrando por segmento SUV y abrí las fichas de dos o tres finalistas. Anotá precio de referencia, combustible y equipamiento, y contrastá con un concesionario oficial antes de cerrar la compra.',
        ],
      },
    ],
  },
  {
    slug: 'autos-chinos-electricos-hibridos',
    title: 'Autos chinos eléctricos e híbridos en Argentina',
    description:
      'Qué significa híbrido, enchufable o 100% eléctrico en la oferta china local y qué factores mirar antes de comprar.',
    seoTitle: 'Autos Chinos Eléctricos e Híbridos en Argentina: Guía Clara',
    updatedAt: '2026-09',
    sections: [
      {
        heading: 'Tres tecnologías distintas',
        paragraphs: [
          'La oferta electrificada china suele mezclar tres familias: híbridos autorrecargables (HEV), híbridos enchufables (PHEV) y eléctricos a batería (BEV). Confundirlas es el error más común al comparar precios y “autonomía”.',
        ],
        bullets: [
          'HEV: no se enchufa; ahorra combustible en ciudad con ayuda eléctrica corta.',
          'PHEV: se enchufa; podés hacer tramos diarios en modo eléctrico si cargás seguido.',
          'BEV: 100% eléctrico; la autonomía y el acceso a carga definen la experiencia.',
        ],
      },
      {
        heading: 'Qué mirar en un eléctrico',
        paragraphs: [
          'Más allá del marketing de kilómetros, preguntá por capacidad útil de batería, potencia de carga AC/DC, tiempo real de 20 a 80%, y disponibilidad de cargadores en tu rutina (casa, trabajo, ruta). Un auto excelente en papel puede ser incómodo si no tenés dónde enchufar.',
          'También importa el software: actualizaciones, garantía de batería y red de postventa. Marcas como BYD suelen liderar la conversación eléctrica; igual conviene verificar versión exacta y equipamiento local.',
        ],
      },
      {
        heading: 'Híbridos: cuándo tienen sentido',
        paragraphs: [
          'Si tu kilometraje es mixto o no querés depender de carga, un híbrido puede bajar consumo sin cambiar hábitos. En enchufables, el beneficio aparece cuando cargás en casa casi todos los días; si no, puede comportarse como un naftero más pesado.',
        ],
      },
      {
        heading: 'Costos totales',
        paragraphs: [
          'Sumá seguro, patente, eventual peaje de neumáticos (más peso) y el precio de la energía o el combustible. Compará costo por kilómetro estimado, no solo el precio de lista. En el catálogo podés filtrar por combustible para ver opciones nafta, híbridas o eléctricas publicadas.',
          'También podés usar nuestra calculadora de ahorro para estimar el gasto anual de energía/combustible de un electrificado del catálogo frente a un naftero o diésel comparable.',
        ],
      },
    ],
  },
  {
    slug: 'como-elegir-auto-chino',
    title: 'Cómo elegir un auto chino: checklist antes de comprar',
    description:
      'Pasos concretos para elegir un auto chino en Argentina sin guiarte solo por el precio de lista.',
    seoTitle: 'Cómo Elegir un Auto Chino en Argentina: Checklist de Compra',
    updatedAt: '2026-09',
    sections: [
      {
        heading: '1. Definí el uso real',
        paragraphs: [
          'Anotá cuántas personas viajan, si necesitás baúl grande, si hay garage chico, y cuántos kilómetros mensuales hacés. Ese perfil elimina de entrada modelos demasiado chicos, demasiado grandes o con el combustible equivocado.',
        ],
      },
      {
        heading: '2. Armá una shortlist de 3 modelos',
        paragraphs: [
          'Usá el buscador o el catálogo de autoschinos.ar para filtrar por marca, segmento o combustible. Quedate con tres opciones máximo: más de eso diluye la comparación. Para cada una registrá precio de referencia, año, transmisión y 5 ítems de equipamiento que te importen.',
        ],
      },
      {
        heading: '3. Validá postventa y repuestos',
        paragraphs: [
          'Preguntá por red de servicios oficiales en tu ciudad, tiempos de turno y disponibilidad de repuestos de colisión. Un buen precio de compra se diluye si el mantenimiento o un chocón lateral se demoran meses.',
        ],
      },
      {
        heading: '4. Probá el auto como lo vas a usar',
        paragraphs: [
          'En la prueba de manejo entrá y salí del garage tipo el tuyo, sentá a quien viaja atrás y mirá visibilidad nocturna. Pedí versión exacta: el “mismo modelo” puede cambiar motor o multimedia entre trim levels.',
        ],
      },
      {
        heading: '5. Contrastá números oficiales',
        paragraphs: [
          'Los precios de este sitio son referenciales. Pedí cotización escrita, condiciones de financiación y qué incluye (patente, flete, accesorios). Si algo no cierra, volvé a la ficha técnica y compará otra vez.',
        ],
      },
    ],
  },
  {
    slug: 'marcas-chinas-en-argentina',
    title: 'Marcas chinas en Argentina: panorama actual',
    description:
      'Recorrido por las principales marcas chinas con presencia informativa en el mercado argentino y cómo orientarte entre ellas.',
    seoTitle: 'Marcas Chinas en Argentina: Guía del Panorama Actual',
    updatedAt: '2026-09',
    sections: [
      {
        heading: 'Un mercado más diverso',
        paragraphs: [
          'Argentina concentra hoy una oferta china más amplia que hace una década: SUV familiares, comerciales livianos, pick-ups y, cada vez más, propuestas electrificadas. No todas las marcas compiten en el mismo nicho; algunas priorizan precio de entrada y otras tecnología o tamaño.',
        ],
      },
      {
        heading: 'Familias de propuesta',
        paragraphs: [
          'A modo orientativo —no ranking— podés pensar en grupos:',
        ],
        bullets: [
          'SUV y crossover de volumen: Chery, Geely, Haval, JAC, MG, entre otras.',
          'Electrificación y nuevas energías: BYD como referencia visible del segmento.',
          'Utilitarios y trabajo: Foton, DFSK y líneas comerciales de otras marcas.',
          'Pick-ups y robustez: Great Wall y propuestas relacionadas.',
        ],
      },
      {
        heading: 'Cómo usar este sitio',
        paragraphs: [
          'En la sección Marcas vas a encontrar el listado completo publicado en autoschinos.ar con acceso a cada modelo. Empezá por la marca que ya ves en la calle o por el segmento que necesitás, y recién después profundizá en versiones.',
          'Las descripciones de marca resumen posicionamiento general; las fichas de modelo concentran el detalle técnico. Si falta un dato, aparece como pendiente de confirmar: es preferible no inventar cifras.',
        ],
      },
      {
        heading: 'Criterio al comparar marcas',
        paragraphs: [
          'Más que “la mejor marca china”, buscá la mejor combinación de red de servicios, garantía, equipamiento de la versión local y costo total. Dos marcas pueden compartir proveedor de componentes y aun así diferir mucho en postventa local.',
        ],
      },
    ],
  },
  {
    slug: 'precios-y-mantenimiento-autos-chinos',
    title: 'Precios de referencia y mantenimiento de autos chinos',
    description:
      'Cómo leer precios de lista, por qué cambian tan rápido y qué costos de mantenimiento anticipar.',
    seoTitle: 'Precios y Mantenimiento de Autos Chinos en Argentina',
    updatedAt: '2026-09',
    sections: [
      {
        heading: 'Precios de referencia, no cotización',
        paragraphs: [
          'En un contexto de tipo de cambio móvil, los precios publicados en portales y listas oficiales pueden quedar viejos en semanas. Por eso en muchas fichas verás “Consultar precio”: preferimos no mostrar un número que ya no existe en el mercado.',
          'Cuando hay un valor, suele estar expresado en ARS o USD según la fuente. Tratá ese número como orden de magnitud y pedí siempre una cotización actualizada al vendedor oficial.',
        ],
      },
      {
        heading: 'Qué influye en el precio final',
        paragraphs: [
          'Además del precio de lista, entran impuestos, flete, patentamiento, accesorios y eventual financiación. Dos unidades “iguales” pueden diferir si una trae pack de seguridad o multimedia distinto. Leé la versión exacta en la ficha.',
        ],
      },
      {
        heading: 'Mantenimiento: planificá el costo de uso',
        paragraphs: [
          'Pedí el plan de service oficial (intervalos en km o meses) y el costo estimado de los primeros tres servicios. Preguntá por filtros, pastillas y neumáticos de medida original: ahí aparece el costo real de ownership.',
          'En eléctricos e híbridos, sumá revisión de sistema de alto voltaje según manual y garantía específica de batería. En nafteros turbo, respetá calidad de aceite y cadencia de service: evita dolores de cabeza a mediano plazo.',
        ],
      },
      {
        heading: 'Seguro y reventa',
        paragraphs: [
          'Cotizá el seguro antes de cerrar: algunos modelos tienen diferencia fuerte entre compañías. Sobre reventa, la liquidez depende de volumen de unidades en calle y percepción de postventa; un modelo popular suele ser más fácil de revender que uno muy de nicho.',
        ],
      },
      {
        heading: 'Cómo seguir',
        paragraphs: [
          'Usá el catálogo para comparar fichas, anotá los “Consultar precio” y pedí cotización formal. Si necesitás orientación general, escribinos desde Contacto: no intermediamos ventas, pero podemos ayudarte a ubicar la información publicada en el sitio.',
        ],
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getAllGuideSlugs(): string[] {
  return guides.map((g) => g.slug);
}
