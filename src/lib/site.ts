export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.autoschinos.ar';

export const SITE_NAME = 'autoschinos.ar';

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contacto@autoschinos.ar';

/** WhatsApp en formato internacional sin + ni espacios. Vacío = sin CTA WhatsApp. */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, '') || '';

export function absoluteUrl(path: string = '/'): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized === '/' ? '/' : normalized}`;
}

export function pageTitle(title: string): string {
  return `${title} | ${SITE_NAME}`;
}
