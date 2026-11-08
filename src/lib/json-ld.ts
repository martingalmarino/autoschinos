import { getSheet } from '@/data/technical';
import { absoluteUrl, SITE_NAME, SITE_URL, CONTACT_EMAIL } from '@/lib/site';
import type { CarModel } from '@/lib/models';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    logo: absoluteUrl('/icon-192.svg'),
    description:
      'Portal de información sobre autos chinos en Argentina: marcas, modelos y fichas técnicas.',
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/catalogo?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Año-modelo estructurado. La etiqueta `model.año` no alcanza. */
export function accreditedVehicleModelDate(model: CarModel): string | undefined {
  const year = getSheet(model.id)?.anioModelo?.trim();
  return year || undefined;
}

export function vehicleJsonLd(model: CarModel, path: string) {
  const confirmed = (value: string) => !/sin confirmar/i.test(value);
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: `${model.brand} ${model.nombre}`,
    brand: {
      '@type': 'Brand',
      name: model.brand,
    },
    model: model.nombre,
    description: model.descripcion,
    image: absoluteUrl(model.imagen),
    url: absoluteUrl(path),
    bodyType: model.categoria,
  };

  const modelYear = accreditedVehicleModelDate(model);
  if (modelYear) data.vehicleModelDate = modelYear;
  if (confirmed(model.combustible)) data.fuelType = model.combustible;
  if (confirmed(model.transmision)) data.vehicleTransmission = model.transmision;

  return data;
}

export function faqJsonLd(
  items: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
