import fs from 'node:fs';
import path from 'node:path';

/**
 * Artículos del blog. Cada nota es un JSON en src/data/blog/posts/{slug}.json.
 * Sin archivos, el blog queda vacío. No hay notas de ejemplo.
 *
 * Campos: slug, title, date (YYYY-MM-DD), description, category,
 * image { src, alt, credit, width, height },
 * sources[{ title, url? }],
 * sections[{ heading, paragraphs[]?, blocks[]? }].
 * Un bloque es paragraph, subheading, list o table.
 * paragraphs sigue siendo válido. Una sección nueva puede usar solo blocks.
 * image.src es local, bajo /public/blog/{slug}/, y el archivo tiene que existir.
 * El nombre del archivo tiene que coincidir con el slug.
 */
const POSTS_DIR = path.join(process.cwd(), 'src/data/blog/posts');

export interface BlogSource {
  title: string;
  url?: string;
}

export interface BlogParagraphBlock {
  type: 'paragraph';
  text: string;
}

export interface BlogSubheadingBlock {
  type: 'subheading';
  text: string;
}

export interface BlogListBlock {
  type: 'list';
  items: string[];
}

export interface BlogTableBlock {
  type: 'table';
  caption?: string;
  headers: string[];
  rows: string[][];
  note?: string;
}

export type BlogBlock = BlogParagraphBlock | BlogSubheadingBlock | BlogListBlock | BlogTableBlock;

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  blocks: BlogBlock[];
}

export interface BlogImage {
  src: string;
  alt: string;
  credit: string;
  width: number;
  height: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  image: BlogImage;
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

function requiredPositiveInt(value: unknown, field: string, file: string): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value <= 0) {
    throw new Error(`${file}: falta ${field}`);
  }
  return value;
}

function parseImage(raw: unknown, file: string, slug: string): BlogImage {
  if (!isRecord(raw)) throw new Error(`${file}: falta image`);
  const src = requiredString(raw.src, 'image.src', file);
  const folder = `/blog/${slug}/`;
  if (
    !src.startsWith(folder) ||
    src.includes('..') ||
    !/^\/blog\/[a-z0-9]+(?:-[a-z0-9]+)*\/[a-z0-9]+(?:-[a-z0-9]+)*\.(webp|jpe?g)$/.test(src)
  ) {
    throw new Error(`${file}: image.src tiene que estar en ${folder}`);
  }
  return {
    src,
    alt: requiredString(raw.alt, 'image.alt', file),
    credit: requiredString(raw.credit, 'image.credit', file),
    width: requiredPositiveInt(raw.width, 'image.width', file),
    height: requiredPositiveInt(raw.height, 'image.height', file),
  };
}

export function publishedImagePath(src: string): string {
  const relative = src.replace(/^\/+/, '');
  if (!relative || relative.split('/').includes('..')) {
    throw new Error(`image.src inválida: ${src}`);
  }
  return path.join(process.cwd(), 'public', relative);
}

export function assertPublishedImage(post: Pick<BlogPost, 'image'>, file: string): void {
  const filePath = publishedImagePath(post.image.src);
  if (!fs.existsSync(filePath)) {
    throw new Error(`${file}: no existe public${post.image.src}`);
  }
}

function parseStringList(value: unknown, file: string, field: string): string[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${file}: ${field} vacío`);
  }
  return value.map((item, index) => requiredString(item, `${field}[${index}]`, file));
}

function parseBlock(raw: unknown, file: string, where: string): BlogBlock {
  if (!isRecord(raw)) throw new Error(`${file}: ${where} inválido`);
  const type = requiredString(raw.type, `${where}.type`, file);
  if (type === 'paragraph' || type === 'subheading') {
    return { type, text: requiredString(raw.text, `${where}.text`, file) };
  }
  if (type === 'list') {
    return { type, items: parseStringList(raw.items, file, `${where}.items`) };
  }
  if (type === 'table') {
    const headers = parseStringList(raw.headers, file, `${where}.headers`);
    if (!Array.isArray(raw.rows) || raw.rows.length === 0) {
      throw new Error(`${file}: ${where}.rows vacío`);
    }
    const rows = raw.rows.map((row, rowIndex) => {
      if (!Array.isArray(row) || row.length !== headers.length) {
        throw new Error(`${file}: ${where}.rows[${rowIndex}] no coincide con headers`);
      }
      return row.map((cell, cellIndex) =>
        requiredString(cell, `${where}.rows[${rowIndex}][${cellIndex}]`, file)
      );
    });
    return {
      type,
      headers,
      rows,
      caption: raw.caption == null ? undefined : requiredString(raw.caption, `${where}.caption`, file),
      note: raw.note == null ? undefined : requiredString(raw.note, `${where}.note`, file),
    };
  }
  throw new Error(`${file}: ${where}.type inválido`);
}

function parseSection(raw: unknown, file: string, index: number): BlogSection {
  if (!isRecord(raw)) throw new Error(`${file}: sections[${index}] inválida`);
  const heading = requiredString(raw.heading, `sections[${index}].heading`, file);
  const hasParagraphs = raw.paragraphs != null;
  const hasBlocks = raw.blocks != null;
  if (!hasParagraphs && !hasBlocks) {
    throw new Error(`${file}: sections[${index}] sin paragraphs ni blocks`);
  }
  const paragraphs = hasParagraphs
    ? parseStringList(raw.paragraphs, file, `sections[${index}].paragraphs`)
    : [];
  const blocks = parseBlocks(hasBlocks ? raw.blocks : [], file, index);
  if (paragraphs.length === 0 && blocks.length === 0) {
    throw new Error(`${file}: sections[${index}] sin paragraphs ni blocks`);
  }
  return { heading, paragraphs, blocks };
}

function parseBlocks(raw: unknown, file: string, index: number): BlogBlock[] {
  if (!Array.isArray(raw)) throw new Error(`${file}: sections[${index}].blocks inválido`);
  return raw.map((block, blockIndex) => parseBlock(block, file, `sections[${index}].blocks[${blockIndex}]`));
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
  const sections = raw.sections.map((section, index) => parseSection(section, file, index));

  return {
    slug,
    title: requiredString(raw.title, 'title', file),
    date,
    description: requiredString(raw.description, 'description', file),
    category: requiredString(raw.category, 'category', file),
    image: parseImage(raw.image, file, slug),
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
    assertPublishedImage(post, name);
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
