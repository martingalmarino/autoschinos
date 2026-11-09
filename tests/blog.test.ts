import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import sitemap from '../src/app/sitemap';
import BlogList from '../src/components/BlogList';
import BlogTeaser from '../src/components/BlogTeaser';
import Footer from '../src/components/Footer';
import { navigation } from '../src/components/Navbar';
import { getPosts, parsePost } from '../src/lib/blog';
import { isRemovedGuidePath } from '../src/lib/removed-guides';
import { legacyRedirects } from '../src/lib/technical/redirects';

const RETIRED = [
  'mejores-suv-chinos-argentina',
  'autos-chinos-electricos-hibridos',
  'como-elegir-auto-chino',
  'Guías para decidir mejor',
  'Por qué los SUV chinos crecieron tanto',
];

describe('blog', () => {
  it('no publica artículos ni conserva las guías en el código público', () => {
    assert.deepEqual(getPosts(), []);
    assert.equal(fs.existsSync(path.join(process.cwd(), 'src/lib/guides.ts')), false);
    assert.equal(fs.existsSync(path.join(process.cwd(), 'src/app/guias')), false);

    const files = walk(path.join(process.cwd(), 'src')).filter((file) =>
      /\.(ts|tsx|json|md)$/.test(file)
    );
    for (const file of files) {
      if (file.endsWith(`${path.sep}tests${path.sep}blog.test.ts`)) continue;
      const text = fs.readFileSync(file, 'utf8');
      for (const phrase of RETIRED) {
        assert.equal(text.includes(phrase), false, `${file} ${phrase}`);
      }
    }
  });

  it('deja el índice y el home en estado vacío, con enlace al blog', () => {
    const list = renderToStaticMarkup(createElement(BlogList, { posts: [] }));
    const teaser = renderToStaticMarkup(createElement(BlogTeaser, { posts: [] }));
    const footer = renderToStaticMarkup(createElement(Footer));

    assert.match(list, /Todavía no hay artículos publicados/);
    assert.doesNotMatch(list, /href=/);
    assert.match(teaser, /Todavía no hay artículos publicados/);
    assert.match(teaser, /href="\/blog"/);
    assert.doesNotMatch(teaser, /\/guias/);
    assert.match(footer, /href="\/blog"/);
    assert.doesNotMatch(footer, /\/guias/);
    assert.equal(navigation.find((item) => item.name === 'Blog')?.href, '/blog');
    assert.equal(navigation.some((item) => item.href.includes('/guias')), false);
  });

  it('redirige solo la sección y responde 410 en el detalle', () => {
    assert.deepEqual(
      legacyRedirects.find((item) => item.source === '/guias'),
      { source: '/guias', destination: '/blog', permanent: true }
    );
    assert.equal(
      legacyRedirects.some((item) => item.source.startsWith('/guias/')),
      false
    );
    assert.equal(isRemovedGuidePath('/guias'), false);
    assert.equal(isRemovedGuidePath('/guias/'), false);
    assert.equal(isRemovedGuidePath('/guias/mejores-suv-chinos-argentina'), true);
    assert.equal(isRemovedGuidePath('/blog'), false);
  });

  it('incluye /blog en el sitemap y excluye las guías', () => {
    const urls = sitemap().map((item) => item.url);
    assert.equal(urls.filter((url) => url.endsWith('/blog')).length, 1);
    assert.equal(urls.some((url) => url.includes('/guias')), false);
    assert.equal(urls.some((url) => url.includes('/blog/')), false);
  });

  it('acepta el formato de un artículo sin publicarlo', () => {
    const post = parsePost(
      {
        slug: 'nota',
        title: 'Nota',
        date: '2026-11-16',
        description: 'Resumen.',
        category: 'Mercado',
        sources: [{ title: 'Fuente', url: 'https://example.com/fuente' }],
        sections: [{ heading: 'Apartado', paragraphs: ['Párrafo.'] }],
      },
      'nota.json'
    );
    assert.equal(post.slug, 'nota');
    assert.throws(() => parsePost({ slug: 'nota' }, 'nota.json'), /falta title|falta date/);
    assert.equal(getPosts().length, 0);
  });
});

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
