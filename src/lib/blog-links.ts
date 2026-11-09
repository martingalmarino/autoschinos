export type ParagraphPart =
  | { kind: 'text'; value: string }
  | { kind: 'internal'; href: string; label: string }
  | { kind: 'external'; href: string; label: string };

const URL_PATTERN = /https?:\/\/[^\s<>"']+/gi;
const TRAILING = /[.,;:!?)]+$/;

function classify(rawUrl: string): { href: string; external: boolean } | null {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return null;
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
  const host = parsed.hostname.replace(/^www\./i, '');
  if (host === 'autoschinos.ar') {
    const path = `${parsed.pathname || '/'}${parsed.search}`;
    if (!path.startsWith('/') || path.startsWith('//')) return null;
    return { href: path, external: false };
  }
  return { href: rawUrl, external: true };
}

/** Separa las URLs de un párrafo. El texto visible no cambia: la puntuación final queda afuera del enlace. */
export function linkifyParagraph(text: string): ParagraphPart[] {
  const parts: ParagraphPart[] = [];
  let cursor = 0;
  for (const match of text.matchAll(URL_PATTERN)) {
    const start = match.index ?? 0;
    if (start < cursor) continue;
    const raw = match[0];
    const trailing = raw.match(TRAILING)?.[0] ?? '';
    const url = trailing ? raw.slice(0, -trailing.length) : raw;
    const link = url ? classify(url) : null;
    if (!link) continue;
    if (start > cursor) parts.push({ kind: 'text', value: text.slice(cursor, start) });
    parts.push(
      link.external
        ? { kind: 'external', href: link.href, label: url }
        : { kind: 'internal', href: link.href, label: url }
    );
    if (trailing) parts.push({ kind: 'text', value: trailing });
    cursor = start + raw.length;
  }
  if (cursor < text.length) parts.push({ kind: 'text', value: text.slice(cursor) });
  return parts.length ? parts : [{ kind: 'text', value: text }];
}
