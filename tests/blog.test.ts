import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import sitemap from '../src/app/sitemap';
import { generateMetadata as postMetadata } from '../src/app/blog/[slug]/page';
import BlogArticle from '../src/components/BlogArticle';
import BlogList from '../src/components/BlogList';
import BlogTeaser from '../src/components/BlogTeaser';
import Footer from '../src/components/Footer';
import { navigation } from '../src/components/Navbar';
import { getPostBySlug, getPosts, parsePost } from '../src/lib/blog';
import { linkifyParagraph } from '../src/lib/blog-links';
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
  it('no conserva las guías retiradas en el código público', () => {
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
    assert.equal(
      urls.filter((url) => url.endsWith('/blog/baic-x55-ii-hybrid-argentina-lanzamiento-precio')).length,
      1
    );
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
    assert.equal(getPosts().some((post) => post.slug === 'nota'), false);
  });

  it('publica la nota de la X55 II Hybrid con enlaces internos y sin texto de revisión', async () => {
    const slug = 'baic-x55-ii-hybrid-argentina-lanzamiento-precio';
    const post = getPostBySlug(slug);
    assert.ok(post);
    assert.equal(post.title, 'BAIC X55 II Hybrid: lanzamiento formal en Argentina, precio y lugar en la gama');
    assert.equal(post.date, '2026-11-09');
    assert.equal(getPosts().filter((item) => item.slug === slug).length, 1);

    const list = renderToStaticMarkup(createElement(BlogList, { posts: getPosts() }));
    assert.match(list, new RegExp(`href="/blog/${slug}"`));
    assert.match(list, /BAIC X55 II Hybrid/);
    assert.match(list, /9 de noviembre de 2026/);
    assert.doesNotMatch(list, /Todavía no hay artículos publicados/);

    const html = renderToStaticMarkup(createElement(BlogArticle, { post }));
    assert.match(html, /<h1[^>]*>BAIC X55 II Hybrid: lanzamiento formal en Argentina, precio y lugar en la gama<\/h1>/);
    assert.match(html, /<time dateTime="2026-11-09">9 de noviembre de 2026<\/time>/);
    assert.match(html, /BAIC presentó formalmente la X55 II Hybrid/);
    for (const heading of [
      'Presentación formal en la red BAIC',
      'Qué dice BAIC sobre la mecánica',
      'Precio y lugar en la gama BAIC',
      'Equipamiento destacado',
      'Cómo encaja con el resto de la oferta BAIC',
    ]) {
      assert.match(html, new RegExp(heading));
    }
    assert.match(html, /US\$ 34\.500/);
    assert.match(html, /href="\/marcas\/baic"/);
    assert.match(html, /href="\/marcas\/baic\/x55-ii"/);
    assert.match(html, /Más información de la marca: /);
    assert.match(html, /Ficha de la X55 II naftera: /);
    assert.match(html, /BAIC Argentina — X55 Hybrid/);
    assert.match(html, /href="https:\/\/baic.com.ar\/baic-x55-hybrid\/"/);
    assert.match(html, /href="https:\/\/autoxarg.com.ar\/2026\/11\/04\//);
    assert.doesNotMatch(html, /<img/);
    assert.doesNotMatch(
      html,
      /extracto|relevamiento|sin confirmar|no se publica|ficha hist|código interno|pendiente de confirmar/i
    );

    const last = post.sections.at(-1)?.paragraphs.at(-1) || '';
    const links = linkifyParagraph(last).flatMap((part) => (part.kind === 'text' ? [] : [part.href]));
    assert.deepEqual(links, ['/marcas/baic', '/marcas/baic/x55-ii']);

    const meta = await postMetadata({ params: Promise.resolve({ slug }) });
    assert.equal(meta.title, post.title);
    assert.equal(meta.description, post.description);
    assert.equal(
      meta.alternates && 'canonical' in meta.alternates ? meta.alternates.canonical : '',
      `https://www.autoschinos.ar/blog/${slug}`
    );
  });
});

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
