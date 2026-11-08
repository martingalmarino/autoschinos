import type { CarModel } from '@/lib/catalog';
import type { Fact, ModelSheet, PriceQuote, Source, TechSection } from '@/lib/technical/types';

/** Frases de trabajo interno. No deben llegar a la página, al catálogo ni al schema. */
const AUDIT =
  /ficha hist|fuente hist|fuentes hist|identidad sin|sin confirmar|por especificar|se retir|no confirma|no se (publica|calcula|cierra|elige|atribuye|combina|muestra|usa|mezcl|afirma|puede leer)|no publica|sin cifra|se contradice|conflicto|pendiente|relevamiento|consulta del|año-modelo|año en catálogo|año que muestra|etiqueta del catálogo|en silencio|sin ficha|sin lista|documento aplicado|vigencia de noviembre|no es una vigencia|no certifica|certificación del año|no acredita|alcance:|ver conflicto|conviven|leído en|extracto|escanead|no reemplaza|no hay una sola|no hay ficha|dato de 20|según el importador documentó|se corrigió|sin condiciones|sin desglose|sin cantidad de airbags|no es doble|redondea|que mostraba|esta página|no se reemplaz|se reemplaz|no se complet|código interno|la ruta dice|no se usaron|no está resuelta|no alcanza para identificar|no hay respaldo|sin mezclar|no se reproduc|no es una ficha|no trae el resto|publicado antes|devolvió 403|no del importador|alcance técnico|no son datos del|anuncia \d+ airbags|fuente de concesionario|figuraba antes|que figuraba|unidad utilizable|no tiene una unidad|unidad del artículo|matriz del documento|torque del pdf|potencia de la tabla|no es el naftero|no es la versión|no es diésel|no es diesel|descripción interna|pdf se contradice|no cierra una sola|potencia queda sin/i;

const OMIT_VALUE =
  /^(sin confirmar|por especificar|no aplica(?: \(eléctrico\))?|—|-|n\/a)$/i;

const MONTHS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

export function isAuditCopy(value: string): boolean {
  return AUDIT.test(value);
}

/** Saca el rótulo de archivo interno y deja la cifra o el nombre que sí se puede leer. */
export function softenHistorical(value: string): string {
  return value
    .replace(/\ben una ficha histórica argentina,\s*/gi, '')
    .replace(/\bde ficha histórica:\s*/gi, ': ')
    .replace(/\bficha histórica\b/gi, '')
    .replace(/\bfuente histórica\b/gi, '')
    .replace(/\bdatos históricos\b/gi, 'datos')
    .replace(/\bversión histórica\b/gi, 'versión')
    .replace(/\bgarantía histórica\b/gi, 'garantía')
    .replace(/\blista histórica\b/gi, 'lista')
    .replace(/\bmotor histórico\b/gi, 'motor')
    .replace(/\bficha actual\b/gi, '')
    .replace(/\bde la ficha\b/gi, '')
    .replace(/,?\s*sin mezclar\b[^.]*/gi, '')
    .replace(/\bdocumentación argentina histórica\b/gi, '')
    .replace(/\bhistóric[oa]s?\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([,.;:])/g, '$1')
    .trim();
}

export function isPublicValue(value?: string | null): value is string {
  if (!value) return false;
  const text = value.trim();
  if (!text || OMIT_VALUE.test(text)) return false;
  if (isAuditCopy(text)) return false;
  return true;
}

function sentences(value: string): string[] {
  return value
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function isBrokenFragment(sentence: string): boolean {
  const text = sentence.trim();
  if (/^es,/i.test(text)) return true;
  if (/^[,.;:]/.test(text)) return true;
  if (
    /^(de|del)\s+(\d|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\b/i.test(
      text
    ) &&
    text.split(/\s+/).length <= 8
  ) {
    return true;
  }
  return false;
}

/** Una oración se publica entera o no se publica. No se recortan palabras adentro. */
function isRejectedSentence(sentence: string, minLength: number): boolean {
  const text = sentence.trim();
  if (text.length < minLength || isBrokenFragment(text)) return true;
  if (/^no my20/i.test(text) || /^alcance limitado/i.test(text)) return true;
  if (isAuditCopy(text)) return true;
  return false;
}

function keepSentence(sentence: string): boolean {
  return !isRejectedSentence(sentence, 8);
}

/** Conserva solo oraciones que un lector puede usar, sin el relato de la revisión. */
export function publicCopy(value?: string | null): string | undefined {
  if (!value) return undefined;
  const kept = sentences(value).filter(keepSentence);
  const text = kept.join(' ').replace(/\s{2,}/g, ' ').trim();
  return text || undefined;
}

export function displayFactValue(value: string): string | undefined {
  const cleaned = value
    .replace(/,?\s*según (la ficha|el pdf|ese pdf|esta ficha|el anuncio del documento|ese documento|el documento)\b/gi, '')
    .replace(/,?\s*como cifras combinadas del documento\b/gi, '')
    .replace(/,?\s*unidad del artículo\b/gi, '')
    .replace(/,?\s*garantía común publicada\b/gi, '')
    .replace(/,?\s*sin otro desglose\b[^.]*/gi, '')
    .replace(/,?\s*sin cantidad de marchas publicada\b/gi, '')
    .replace(/,?\s*sin kilometraje en ese texto\b/gi, '')
    .replace(/\s+en ese documento de \d{4}\b/gi, '')
    .replace(/\s+en esa documentación\b/gi, '')
    .replace(/\s+en ese texto\b/gi, '')
    .replace(/,?\s+en (la|esta) ficha\b/gi, '')
    .replace(/\s+enumerados en el PDF\b/gi, '')
    .replace(/;\s*la web redondea.*$/gi, '')
    .replace(/\s+en el PDF\b/gi, '')
    .replace(/\.\s*No indica el año-modelo\.?/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
  const kept = sentences(cleaned)
    .map((sentence) => sentence.replace(/^[,.\s]+/, '').trim())
    .filter(
      (sentence) =>
        !isRejectedSentence(sentence, 1) && !/^no (es|se|hay|indica|incluye)\b/i.test(sentence)
    );
  const text = kept.join(' ').replace(/\s{2,}/g, ' ').trim();
  return text || undefined;
}

export function sourceLabel(source: Source): string {
  const softened = softenHistorical(source.titulo).replace(/^[,.\s]+/, '').trim();
  if (softened.length >= 3 && !isAuditCopy(softened)) return softened;
  try {
    return new URL(source.url).hostname.replace(/^www\./, '');
  } catch {
    return 'Documento';
  }
}

export function displayFactLabel(etiqueta: string): string {
  if (/históric|lanzamiento|de esa comunicación|comunicado/i.test(etiqueta)) return 'Plazo';
  if (/^adas del pdf$/i.test(etiqueta)) return 'ADAS';
  if (/^ventana del pdf$/i.test(etiqueta)) return 'Carga DC';
  if (/^ventana de la web$/i.test(etiqueta)) return 'Carga DC, sitio oficial';
  if (/^web$/i.test(etiqueta)) return 'Carga';
  return etiqueta;
}

export function publicYear(sheet?: ModelSheet): string | undefined {
  const year = sheet?.anioModelo?.trim();
  return year || undefined;
}

function withoutAuditAsides(value: string): string {
  return value
    .replace(/\s*\(([^)]*)\)/g, (match, inner: string) => (isAuditCopy(inner) ? '' : match))
    .replace(/\s+/g, ' ')
    .trim();
}

function publicField(value?: string | null): string | undefined {
  if (!value) return undefined;
  const text = softenHistorical(withoutAuditAsides(value))
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/\(\s*\)/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
  return isPublicValue(text) ? text : undefined;
}

export function publicCategory(model: { categoria: string }): string | undefined {
  return publicField(model.categoria);
}

export function publicFuel(model: { combustible: string }): string | undefined {
  return publicField(model.combustible);
}

export function publicTransmission(model: { transmision: string }): string | undefined {
  return publicField(model.transmision);
}

export function publicHighlights(model: { caracteristicas: string[] }): string[] {
  return model.caracteristicas
    .map((item) => publicCopy(displayFactValue(item) ?? item))
    .filter((item): item is string => Boolean(item));
}

export interface PublicPrice {
  version: string;
  amount: string;
  bonificado?: string;
  note: string;
  condiciones?: string;
}

function money(moneda: PriceQuote['moneda'], value: number): string {
  return `${moneda} ${new Intl.NumberFormat('es-AR').format(value)}`;
}

function listDate(fecha: string): string | undefined {
  const match = fecha.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return undefined;
  const month = MONTHS[Number(match[2]) - 1];
  if (!month) return undefined;
  return `${Number(match[1])} de ${month} de ${match[3]}`;
}

export function publicPrices(sheet: ModelSheet | undefined): PublicPrice[] {
  if (!sheet) return [];
  return sheet.precios.flatMap((quote) => {
    if (quote.lista == null) return [];
    if (quote.estado !== 'lista-fechada' && quote.estado !== 'observado-sin-vencimiento') {
      return [];
    }
    const date = listDate(quote.fechaLista);
    const note =
      quote.estado === 'lista-fechada' && date
        ? `Lista del ${date}`
        : 'Precio publicado en el sitio oficial';
    const condiciones = quote.exclusiones && !isAuditCopy(quote.exclusiones) ? quote.exclusiones : undefined;
    return [
      {
        version: quote.version,
        amount: money(quote.moneda, quote.lista),
        bonificado:
          quote.bonificado != null ? money(quote.moneda, quote.bonificado) : undefined,
        note,
        condiciones,
      },
    ];
  });
}

export function publicFacts(hechos: Fact[]): Array<Fact & { valorPublico: string; etiquetaPublica: string }> {
  return hechos.flatMap((fact) => {
    const valorPublico = displayFactValue(fact.valor);
    if (!valorPublico) return [];
    if (fact.nota && isAuditCopy(fact.nota) && isAuditCopy(fact.valor)) return [];
    return [{ ...fact, valorPublico, etiquetaPublica: displayFactLabel(fact.etiqueta) }];
  });
}

export function publicSections(sheet: ModelSheet): TechSection[] {
  return sheet.secciones.flatMap((section) => {
    const hechos = publicFacts(section.hechos).map((fact) => ({
      etiqueta: fact.etiquetaPublica,
      valor: fact.valorPublico,
      fuenteId: fact.fuenteId,
      estado: fact.estado,
    }));
    if (!hechos.length) return [];
    const intro = publicCopy(section.intro);
    const titulo =
      softenHistorical(section.titulo.replace(/,?\s*sin (mezclar|sumar)/gi, ''))
        .replace(/\(\s+/g, '(')
        .replace(/\s+\)/g, ')')
        .replace(/^[,.:;\s]+/, '')
        .replace(/\s{2,}/g, ' ')
        .trim() || section.titulo;
    return [{ ...section, titulo, intro, hechos }];
  });
}

export function quietEdition(source: Source): string | undefined {
  const raw = (source.edicion || '').trim();
  if (!raw || isAuditCopy(raw) || /no es la fecha del contenido/i.test(raw)) return undefined;
  if (/\bruta\b|código interno|leído en|escanead|conflicto interno|históric|relevamiento/i.test(raw)) {
    const date = raw.match(
      /(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+\d{4}/i
    );
    return date ? date[0].charAt(0).toUpperCase() + date[0].slice(1) : undefined;
  }
  if (raw.length > 90) return undefined;
  return raw;
}

export interface PublicProfile {
  descripcion?: string;
  categoria?: string;
  combustible?: string;
  transmision?: string;
  anio?: string;
  highlights: string[];
  precios: PublicPrice[];
}

export function publicProfile(model: CarModel, sheet?: ModelSheet): PublicProfile {
  return {
    descripcion:
      sheet?.cobertura === 'retiro' || sheet?.cobertura === 'pendiente'
        ? undefined
        : publicCopy(model.descripcion),
    categoria: publicCategory(model),
    combustible: publicFuel(model),
    transmision: publicTransmission(model),
    anio: publicYear(sheet),
    highlights: publicHighlights(model),
    precios: publicPrices(sheet),
  };
}

/** Texto que las superficies públicas pueden mostrar, para las pruebas de las 66 fichas. */
export function publicSurfaceText(model: CarModel, sheet?: ModelSheet): string {
  const profile = publicProfile(model, sheet);
  const sections = sheet ? publicSections(sheet) : [];
  return [
    profile.descripcion,
    profile.categoria,
    profile.combustible,
    profile.transmision,
    profile.anio,
    ...profile.highlights,
    ...profile.precios.flatMap((price) => [
      price.version,
      price.amount,
      price.bonificado,
      price.note,
      price.condiciones,
    ]),
    ...sections.flatMap((section) => [
      section.titulo,
      section.intro,
      ...section.hechos.flatMap((fact) => [fact.etiqueta, fact.valor, fact.nota]),
    ]),
  ]
    .filter(Boolean)
    .join('\n');
}
