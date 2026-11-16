export type ParagraphPart =
  | { kind: 'text'; value: string }
  | { kind: 'internal'; href: string; label: string }
  | { kind: 'external'; href: string; label: string };

const URL_PATTERN = /https?:\/\/[^\s<>"']+/gi;
const MARKDOWN_LINK = /\[([^\[\]]+)\]\(([^)\s]+)\)/g;
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

function classifyHref(raw: string): { href: string; external: boolean } | null {
  if (raw.startsWith('/') && !raw.startsWith('//') && !raw.includes('..')) {
    return { href: raw, external: false };
  }
  return classify(raw);
}

function pushParts(target: ParagraphPart[], extra: ParagraphPart[]) {
  for (const part of extra) {
    const previous = target.at(-1);
    if (part.kind === 'text' && previous?.kind === 'text') {
      previous.value += part.value;
      continue;
    }
    target.push({ ...part });
  }
}

function linkifyRaw(text: string): ParagraphPart[] {
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

/**
 * Separa enlaces de un texto.
 * [texto](url) muestra el texto. Una URL suelta sigue mostrándose tal cual,
 * con la puntuación final fuera del enlace.
 */
export function linkifyParagraph(text: string): ParagraphPart[] {
  const parts: ParagraphPart[] = [];
  let cursor = 0;
  for (const match of text.matchAll(MARKDOWN_LINK)) {
    const start = match.index ?? 0;
    if (start < cursor) continue;
    const label = match[1]?.trim() ?? '';
    const rawHref = match[2] ?? '';
    const link = label ? classifyHref(rawHref) : null;
    if (!link) continue;
    pushParts(parts, linkifyRaw(text.slice(cursor, start)));
    parts.push(
      link.external
        ? { kind: 'external', href: link.href, label }
        : { kind: 'internal', href: link.href, label }
    );
    cursor = start + match[0].length;
  }
  pushParts(parts, linkifyRaw(text.slice(cursor)));
  return parts.length ? parts : [{ kind: 'text', value: text }];
}
