import fs from 'node:fs';
import path from 'node:path';

/**
 * Artículos del blog. Cada nota es un JSON en src/data/blog/posts/{slug}.json.
 * Sin archivos, el blog queda vacío. No hay notas de ejemplo.
 *
 * Campos: slug, title, date (YYYY-MM-DD), description, category,
 * sources[{ title, url? }], sections[{ heading, paragraphs[] }].
 * El nombre del archivo tiene que coincidir con el slug.
 */
const POSTS_DIR = path.join(process.cwd(), 'src/data/blog/posts');

export interface BlogSource {
  title: string;
  url?: string;
}

export interface BlogSection {
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  sources: BlogSource[];
  sections: BlogSection[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requiredString(value: unknown, field: string, file: string): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`${file}: falta ${field}`);
  }
  return value.trim();
}

export function parsePost(raw: unknown, file: string): BlogPost {
  if (!isRecord(raw)) throw new Error(`${file}: el artículo tiene que ser un objeto`);

  const slug = requiredString(raw.slug, 'slug', file);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`${file}: slug inválido`);
  }

  const date = requiredString(raw.date, 'date', file);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
    throw new Error(`${file}: date tiene que ser YYYY-MM-DD`);
  }
  const [year, month, day] = date.split('-').map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day));
  if (utc.toISOString().slice(0, 10) !== date) {
    throw new Error(`${file}: date no es un día válido`);
  }

  if (!Array.isArray(raw.sources)) throw new Error(`${file}: falta sources`);
  const sources = raw.sources.map((source, index) => {
    if (!isRecord(source)) throw new Error(`${file}: sources[${index}] inválida`);
    const title = requiredString(source.title, `sources[${index}].title`, file);
    const url = source.url == null ? undefined : requiredString(source.url, `sources[${index}].url`, file);
    if (url && !/^https?:\/\//i.test(url)) throw new Error(`${file}: sources[${index}].url inválida`);
    return { title, url };
  });

  if (!Array.isArray(raw.sections) || raw.sections.length === 0) {
    throw new Error(`${file}: falta sections`);
  }
  const sections = raw.sections.map((section, index) => {
    if (!isRecord(section)) throw new Error(`${file}: sections[${index}] inválida`);
    const heading = requiredString(section.heading, `sections[${index}].heading`, file);
    if (!Array.isArray(section.paragraphs) || section.paragraphs.length === 0) {
      throw new Error(`${file}: sections[${index}].paragraphs vacío`);
    }
    const paragraphs = section.paragraphs.map((paragraph, paragraphIndex) =>
      requiredString(paragraph, `sections[${index}].paragraphs[${paragraphIndex}]`, file)
    );
    return { heading, paragraphs };
  });

  return {
    slug,
    title: requiredString(raw.title, 'title', file),
    date,
    description: requiredString(raw.description, 'description', file),
    category: requiredString(raw.category, 'category', file),
    sources,
    sections,
  };
}

export function getPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith('.json'))
    .sort();

  const posts = files.map((name) => {
    const raw = JSON.parse(fs.readFileSync(path.join(POSTS_DIR, name), 'utf8')) as unknown;
    const post = parsePost(raw, name);
    if (name !== `${post.slug}.json`) {
      throw new Error(`${name}: el archivo tiene que llamarse ${post.slug}.json`);
    }
    return post;
  });

  const seen = new Set<string>();
  for (const post of posts) {
    if (seen.has(post.slug)) throw new Error(`slug repetido: ${post.slug}`);
    seen.add(post.slug);
  }

  return posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug, 'es'));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPosts().find((post) => post.slug === slug);
}

export function formatPostDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  return new Intl.DateTimeFormat('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
