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
import { assertPublishedImage, getPostBySlug, getPosts, parsePost, publishedImagePath } from '../src/lib/blog';
import { brandPath, modelPath } from '../src/lib/catalog';
import { getAllModels } from '../src/lib/models';
import { linkifyParagraph } from '../src/lib/blog-links';
import { blogPostingJsonLd } from '../src/lib/json-ld';
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
    assert.equal(
      urls.filter((url) => url.endsWith('/blog/kaiyi-x3-pro-argentina-precio-oficial')).length,
      1
    );
    assert.equal(
      urls.filter((url) => url.endsWith('/blog/byd-ti7-argentina-precio-oficial')).length,
      1
    );
    assert.equal(
      urls.filter((url) => url.endsWith('/blog/precios-autos-chinos-argentina-noviembre-2026')).length,
      1
    );
    assert.equal(
      urls.filter((url) => url.endsWith('/blog/renault-geely-distribuidor-oficial-argentina')).length,
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
        image: {
          src: '/blog/nota/portada.webp',
          alt: 'Auto de frente',
          credit: 'Imagen: Marca',
          width: 1600,
          height: 900,
        },
        sources: [{ title: 'Fuente', url: 'https://example.com/fuente' }],
        sections: [{ heading: 'Apartado', paragraphs: ['Párrafo.'] }],
      },
      'nota.json'
    );
    assert.equal(post.slug, 'nota');
    assert.equal(post.image.src, '/blog/nota/portada.webp');
    assert.throws(() => parsePost({ slug: 'nota' }, 'nota.json'), /falta title|falta date/);
    assert.equal(getPosts().some((item) => item.slug === 'nota'), false);
  });

  it('rechaza una nota sin imagen o con un archivo que no está en public', () => {
    const posts = getPosts();
    assert.ok(posts.length >= 1);
    for (const post of posts) {
      assert.equal(post.image.src.startsWith(`/blog/${post.slug}/`), true);
      assert.equal(fs.existsSync(publishedImagePath(post.image.src)), true);
      assert.ok(post.image.alt.trim());
      assert.ok(post.image.credit.trim());
    }

    const published = posts.find((post) =>
      post.sections.some((section) => section.paragraphs.length > 0)
    );
    assert.ok(published);
    assert.throws(
      () => parsePost({ ...published, image: undefined }, `${published.slug}.json`),
      /falta image/
    );
    assert.throws(
      () =>
        parsePost(
          { ...published, image: { ...published.image, src: '/fotos/portada.webp' } },
          `${published.slug}.json`
        ),
      /image\.src/
    );
    assert.throws(
      () =>
        assertPublishedImage(
          {
            image: {
              ...published.image,
              src: `/blog/${published.slug}/no-existe.webp`,
            },
          },
          `${published.slug}.json`
        ),
      /no existe public/
    );
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
    assert.match(list, /BAIC X55 II Hybrid de perfil, en color gris claro/);
    assert.match(list, /portada\.webp/);
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
    assert.match(html, /<img[^>]+alt="BAIC X55 II Hybrid de perfil, en color gris claro"/);
    assert.match(html, /width="1700"/);
    assert.match(html, /height="750"/);
    assert.match(html, /Imagen: BAIC Argentina/);
    assert.doesNotMatch(html, /X55II_Hybrid_Miniatura_Menu/);
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
    const imageUrl = `https://www.autoschinos.ar/blog/${slug}/portada.webp`;
    const ogImage = meta.openGraph?.images;
    const ogFirst = Array.isArray(ogImage) ? ogImage[0] : ogImage;
    assert.equal(ogFirst && typeof ogFirst === 'object' && 'url' in ogFirst ? ogFirst.url : '', imageUrl);
    const twitterImage = meta.twitter && 'images' in meta.twitter ? meta.twitter.images : undefined;
    const twitterFirst = Array.isArray(twitterImage) ? twitterImage[0] : twitterImage;
    assert.equal(typeof twitterFirst === 'string' ? twitterFirst : '', imageUrl);
    assert.equal(blogPostingJsonLd(post).image, imageUrl);
  });

  it('publica la nota del Kaiyi X3 Pro con la foto oficial y el enlace externo prolijo', async () => {
    const slug = 'kaiyi-x3-pro-argentina-precio-oficial';
    const post = getPostBySlug(slug);
    assert.ok(post);
    assert.equal(post.category, 'Precios');
    assert.equal(post.date, '2026-11-11');
    assert.equal(post.image.width, 1920);
    assert.equal(post.image.height, 1280);
    assert.equal(post.image.credit, 'Imagen: Kaiyi Argentina');

    const list = renderToStaticMarkup(createElement(BlogList, { posts: getPosts() }));
    assert.match(list, new RegExp(`href="/blog/${slug}"`));
    assert.match(list, /Kaiyi X3 Pro blanco, de tres cuartos delanteros, sobre una calle urbana/);

    const html = renderToStaticMarkup(createElement(BlogArticle, { post }));
    assert.match(html, /<h1[^>]*>Kaiyi X3 Pro en Argentina: precio oficial, mecánica y lugar en la gama<\/h1>/);
    assert.match(html, /<time dateTime="2026-11-11">11 de noviembre de 2026<\/time>/);
    assert.match(html, /US\$ 26\.000/);
    assert.match(html, /<img[^>]+alt="Kaiyi X3 Pro blanco, de tres cuartos delanteros, sobre una calle urbana"/);
    assert.match(html, /width="1920"/);
    assert.match(html, /height="1280"/);
    assert.match(html, /Imagen: Kaiyi Argentina/);
    assert.match(
      html,
      /Más información en el sitio oficial de la marca: <a href="https:\/\/www\.kaiyiauto\.com\.ar\/x3pro\.html"[^>]*>https:\/\/www\.kaiyiauto\.com\.ar\/x3pro\.html<\/a>\./
    );
    assert.doesNotMatch(html, /x3_7\.jpg/);
    assert.doesNotMatch(
      html,
      /extracto|relevamiento|sin confirmar|no se publica|ficha hist|código interno|pendiente de confirmar/i
    );

    const meta = await postMetadata({ params: Promise.resolve({ slug }) });
    const imageUrl = `https://www.autoschinos.ar/blog/${slug}/portada.webp`;
    const ogImage = meta.openGraph?.images;
    const ogFirst = Array.isArray(ogImage) ? ogImage[0] : ogImage;
    assert.equal(ogFirst && typeof ogFirst === 'object' && 'url' in ogFirst ? ogFirst.url : '', imageUrl);
  });

  it('publica la nota del BYD Ti7 con la foto oficial y enlaces internos reales', async () => {
    const slug = 'byd-ti7-argentina-precio-oficial';
    const post = getPostBySlug(slug);
    assert.ok(post);
    assert.equal(post.category, 'Precios');
    assert.equal(post.date, '2026-11-13');
    assert.equal(post.image.width, 1920);
    assert.equal(post.image.height, 1075);
    assert.equal(post.image.credit, 'Imagen: BYD Argentina');

    const song = getAllModels().find((model) => model.id === 'byd-song-pro-dmi-2025');
    assert.ok(song);
    assert.equal(brandPath('BYD'), '/marcas/byd');
    assert.equal(modelPath(song), '/marcas/byd/song-pro-dm-i');

    const html = renderToStaticMarkup(createElement(BlogArticle, { post }));
    assert.match(html, /<h1[^>]*>BYD Ti7 en Argentina: versiones, precios de lanzamiento y mecánica oficial<\/h1>/);
    assert.match(html, /<time dateTime="2026-11-13">13 de noviembre de 2026<\/time>/);
    assert.match(html, /US\$ 59\.990/);
    assert.match(html, /<img[^>]+alt="BYD Ti7 verde, de tres cuartos delanteros, circulando por una calle urbana"/);
    assert.match(html, /width="1920"/);
    assert.match(html, /height="1075"/);
    assert.match(html, /Imagen: BYD Argentina/);
    assert.match(html, /href="\/marcas\/byd"/);
    assert.match(html, /href="\/marcas\/byd\/song-pro-dm-i"/);
    assert.match(
      html,
      /Sitio oficial del Ti7: <a href="https:\/\/www\.byd\.com\/ar\/byd-ti7"[^>]*target="_blank"[^>]*>https:\/\/www\.byd\.com\/ar\/byd-ti7<\/a>\./
    );
    assert.doesNotMatch(html, /imagen4\.jpeg/);
    assert.doesNotMatch(
      html,
      /extracto|relevamiento|sin confirmar|no se publica|ficha hist|código interno|pendiente de confirmar/i
    );

    const last = post.sections.at(-1)?.paragraphs.at(-1) || '';
    const links = linkifyParagraph(last).flatMap((part) =>
      part.kind === 'text' ? [] : [{ kind: part.kind, href: part.href }]
    );
    assert.deepEqual(links, [
      { kind: 'internal', href: '/marcas/byd' },
      { kind: 'internal', href: '/marcas/byd/song-pro-dm-i' },
      { kind: 'external', href: 'https://www.byd.com/ar/byd-ti7' },
    ]);

    const list = renderToStaticMarkup(createElement(BlogList, { posts: getPosts() }));
    assert.match(list, new RegExp(`href="/blog/${slug}"`));
    assert.match(list, /BYD Ti7 verde, de tres cuartos delanteros, circulando por una calle urbana/);
  });

  it('publica el relevamiento de noviembre con foto oficial y enlaces internos', () => {
    const slug = 'precios-autos-chinos-argentina-noviembre-2026';
    const post = getPostBySlug(slug);
    assert.ok(post);
    assert.equal(post.date, '2026-11-16');
    assert.equal(post.category, 'Precios');
    assert.equal(post.image.width, 1600);
    assert.equal(post.image.height, 1067);
    assert.equal(post.image.credit, 'Imagen: GWM Argentina');

    const routes = new Map(
      getAllModels().map((model) => [modelPath(model), model.id])
    );
    for (const brand of ['BYD', 'Changan', 'Chery', 'Haval', 'ORA', 'Great Wall', 'JAC', 'MG']) {
      routes.set(brandPath(brand), brand);
    }
    for (const path of [
      '/marcas/byd',
      '/marcas/changan',
      '/marcas/chery',
      '/marcas/chery/tiggo-4-pro',
      '/marcas/haval',
      '/marcas/haval/h6',
      '/marcas/haval/jolion-pro-hev',
      '/marcas/ora',
      '/marcas/great-wall/poer-elite',
      '/marcas/jac',
      '/marcas/jac/s2',
      '/marcas/mg',
      '/marcas/mg/new-mg-3',
    ]) {
      assert.equal(routes.has(path), true, path);
    }

    const blogPaths = new Set(getPosts().map((item) => `/blog/${item.slug}`));
    blogPaths.add('/blog');
    const texts: string[] = [];
    let tables = 0;
    for (const section of post.sections) {
      assert.deepEqual(section.paragraphs, [], section.heading);
      assert.ok(section.blocks.length > 0, section.heading);
      for (const block of section.blocks) {
        if (block.type === 'paragraph' || block.type === 'subheading') {
          texts.push(block.text);
        } else if (block.type === 'list') {
          texts.push(...block.items);
        } else {
          tables += 1;
          if (block.caption) texts.push(block.caption);
          texts.push(...block.headers);
          for (const row of block.rows) {
            assert.equal(row.length, block.headers.length, block.caption || section.heading);
            texts.push(...row);
          }
          if (block.note) texts.push(block.note);
        }
      }
    }
    assert.equal(tables, 11);

    const byd = post.sections.find((section) => section.heading === 'BYD');
    const bydTable = byd?.blocks.find((block) => block.type === 'table');
    assert.ok(bydTable && bydTable.type === 'table');
    assert.deepEqual(bydTable.rows, [['Ti7', 'Gama', '59.990 a 62.990', 'Lanzamiento']]);

    const internal: string[] = [];
    for (const text of texts) {
      for (const part of linkifyParagraph(text)) {
        if (part.kind === 'text') {
          assert.doesNotMatch(part.value, /https?:\/\//);
          continue;
        }
        assert.equal(part.kind, 'internal', part.href);
        assert.equal(/^https?:\/\//.test(part.label), false, part.label);
        assert.equal(routes.has(part.href) || blogPaths.has(part.href), true, part.href);
        internal.push(part.href);
      }
    }
    assert.deepEqual(internal, [
      '/blog',
      '/blog/byd-ti7-argentina-precio-oficial',
      '/marcas/byd',
      '/marcas/changan',
      '/marcas/chery',
      '/marcas/chery/tiggo-4-pro',
      '/marcas/haval',
      '/marcas/ora',
      '/marcas/haval/h6',
      '/marcas/haval/jolion-pro-hev',
      '/marcas/great-wall/poer-elite',
      '/marcas/jac',
      '/marcas/jac/s2',
      '/blog/kaiyi-x3-pro-argentina-precio-oficial',
      '/marcas/mg',
      '/marcas/mg/new-mg-3',
      '/blog/baic-x55-ii-hybrid-argentina-lanzamiento-precio',
    ]);

    const html = renderToStaticMarkup(createElement(BlogArticle, { post }));
    const body = html.split('>Fuentes<')[0] || '';
    assert.doesNotMatch(body, />https?:\/\//);
    assert.equal((html.match(/overflow-x-auto/g) || []).length, tables);
    assert.match(html, /<img[^>]+alt="Haval H6 beige, de tres cuartos delanteros, sobre un paseo junto a un puente"/);
    assert.match(html, /width="1600"/);
    assert.match(html, /height="1067"/);
    assert.match(html, /Imagen: GWM Argentina/);
    assert.match(html, /href="\/marcas\/haval\/h6"/);
    assert.match(html, /href="\/marcas\/haval\/jolion-pro-hev"/);
    assert.match(html, /href="\/blog"[^>]*>blog de Autoschinos<\/a>/);
    assert.match(html, /<td[^>]*>Gama<\/td>/);
    assert.match(html, /<li[^>]*>Hay precios de lista, sugeridos, de lanzamiento/);
    assert.doesNotMatch(html, /h6-gal1/);
    assert.doesNotMatch(
      html,
      /extracto|relevamiento interno|sin confirmar|no se publica|ficha hist|código interno|pendiente de confirmar/i
    );

    const list = renderToStaticMarkup(createElement(BlogList, { posts: [post] }));
    assert.match(list, new RegExp(`href="/blog/${slug}"`));
    assert.match(list, /Haval H6 beige, de tres cuartos delanteros, sobre un paseo junto a un puente/);
  });

  it('publica el acuerdo de Renault y Geely con portada, anclas y sin noindex', async () => {
    const slug = 'renault-geely-distribuidor-oficial-argentina';
    const post = getPostBySlug(slug);
    assert.ok(post);
    assert.equal(post.category, 'Novedades');
    assert.equal(post.date, '2026-11-18');
    assert.equal(post.image.width, 1469);
    assert.equal(post.image.height, 545);
    assert.equal(post.image.credit, 'Imagen: Renault Argentina');
    assert.equal(
      post.image.alt,
      'Logos de Renault Group y Geely sobre un fondo degradé, imagen del comunicado del acuerdo en Argentina'
    );
    assert.equal(brandPath('Geely'), '/marcas/geely');

    const texts: string[] = [];
    for (const section of post.sections) {
      assert.deepEqual(section.paragraphs, []);
      for (const block of section.blocks) {
        if (block.type === 'paragraph' || block.type === 'subheading') texts.push(block.text);
        else if (block.type === 'list') texts.push(...block.items);
      }
    }
    const links: Array<{ kind: string; href: string; label: string }> = [];
    for (const text of texts) {
      for (const part of linkifyParagraph(text)) {
        if (part.kind === 'text') {
          assert.doesNotMatch(part.value, /https?:\/\//);
          continue;
        }
        assert.equal(/^https?:\/\//.test(part.label), false, part.label);
        links.push({ kind: part.kind, href: part.href, label: part.label });
      }
    }
    assert.deepEqual(
      links.map((link) => `${link.kind}:${link.href}`),
      [
        'external:https://prensa.renault.com.ar/comunicado/renault-group-y-geely-auto-anuncian-un-acuerdo-para-la-distribucion-de-vehiculos-geely-en-argentina',
        'external:https://www.autoweb.com.ar/2026/11/17/autos-sustentables-del-sur-asegura-que-el-anuncio-de-renault-no-cambia-su-operacion-con-geely/',
        'external:https://autoblog.com.ar/pese-al-anuncio-de-renault-autos-sustentables-del-sur-dice-que-seguira-vendiendo-autos-de-geely-en-argentina/',
        'internal:/marcas/geely',
        'external:https://geelyargentina.com.ar/',
        'external:https://geelyargentina.com.ar/modelos/ex5',
        'external:https://geelyargentina.com.ar/modelos/icon/',
      ]
    );

    const html = renderToStaticMarkup(createElement(BlogArticle, { post }));
    const body = html.split('>Fuentes<')[0] || '';
    assert.doesNotMatch(body, />https?:\/\//);
    assert.doesNotMatch(html, /noindex/i);
    assert.match(html, /<img[^>]+alt="Logos de Renault Group y Geely sobre un fondo degradé, imagen del comunicado del acuerdo en Argentina"/);
    assert.match(html, /width="1469"/);
    assert.match(html, /height="545"/);
    assert.match(html, /Imagen: Renault Argentina/);
    assert.match(html, /href="\/marcas\/geely"[^>]*>Geely<\/a>/);
    assert.match(html, /target="_blank"[^>]*>distribuidor oficial de los vehículos de nuevas energías de Geely<\/a>/);
    assert.match(html, /<li[^>]*>EX5 Pro: 214 HP/);
    assert.match(html, /Novedades/);

    const meta = await postMetadata({ params: Promise.resolve({ slug }) });
    assert.equal(meta.title, post.title);
    assert.equal(meta.description, post.description);
    assert.equal(meta.robots, undefined);
    assert.equal(
      meta.alternates && 'canonical' in meta.alternates ? meta.alternates.canonical : '',
      `https://www.autoschinos.ar/blog/${slug}`
    );

    const list = renderToStaticMarkup(createElement(BlogList, { posts: getPosts() }));
    assert.match(list, new RegExp(`href="/blog/${slug}"`));
    assert.match(list, /Novedades/);
  });

  it('acepta anclas, tablas y listas, y deja las notas anteriores en párrafos', () => {
    const blockPosts = new Set([
      'precios-autos-chinos-argentina-noviembre-2026',
      'renault-geely-distribuidor-oficial-argentina',
    ]);
    for (const published of getPosts()) {
      if (blockPosts.has(published.slug)) {
        for (const section of published.sections) {
          assert.deepEqual(section.paragraphs, []);
          assert.ok(section.blocks.length > 0, section.heading);
        }
        continue;
      }
      for (const section of published.sections) {
        assert.ok(section.paragraphs.length > 0, published.slug);
        assert.deepEqual(section.blocks, [], published.slug);
      }
    }

    const anchor = linkifyParagraph(
      'La [ficha de BYD](https://www.autoschinos.ar/marcas/byd) y el [sitio oficial](https://www.byd.com/ar/byd-ti7).'
    );
    assert.deepEqual(
      anchor.flatMap((part) => (part.kind === 'text' ? [part.value] : [`${part.kind}:${part.href}:${part.label}`])),
      [
        'La ',
        'internal:/marcas/byd:ficha de BYD',
        ' y el ',
        'external:https://www.byd.com/ar/byd-ti7:sitio oficial',
        '.',
      ]
    );
    assert.deepEqual(
      linkifyParagraph('Ver [BYD](/marcas/byd).').flatMap((part) =>
        part.kind === 'text' ? [part.value] : [part.href]
      ),
      ['Ver ', '/marcas/byd', '.']
    );
    assert.deepEqual(
      linkifyParagraph('Sigue https://www.autoschinos.ar/marcas/haval/h6.').flatMap((part) =>
        part.kind === 'text' ? [] : [part.href]
      ),
      ['/marcas/haval/h6']
    );

    const post = parsePost(
      {
        slug: 'formato',
        title: 'Formato',
        date: '2026-11-16',
        description: 'Resumen.',
        category: 'Precios',
        image: {
          src: '/blog/formato/portada.webp',
          alt: 'Auto de frente',
          credit: 'Imagen: Marca',
          width: 1600,
          height: 900,
        },
        sources: [],
        sections: [
          {
            heading: 'Chery',
            blocks: [
              {
                type: 'paragraph',
                text: 'El detalle está en la [ficha de Chery](/marcas/chery).',
              },
              { type: 'subheading', text: 'SUV' },
              {
                type: 'table',
                caption: 'Precios sugeridos de Chery',
                headers: ['Modelo', 'Versión', 'Precio (US$)', 'Tipo de precio'],
                rows: [['Tiggo 4', 'Pro 1.5T CVT Luxury FL', '28.700', 'Público sugerido']],
                note: 'Lista oficial. Ver el [catálogo](/marcas/chery/tiggo-4-pro).',
              },
              { type: 'list', items: ['Incluye impuestos.', 'Sin flete.'] },
            ],
          },
        ],
      },
      'formato.json'
    );
    assert.deepEqual(post.sections[0]?.paragraphs, []);
    assert.equal(post.sections[0]?.blocks.length, 4);
    assert.equal(getPosts().some((item) => item.slug === 'formato'), false);

    const html = renderToStaticMarkup(createElement(BlogArticle, { post }));
    assert.match(html, /<h3[^>]*>SUV<\/h3>/);
    assert.match(html, /href="\/marcas\/chery"[^>]*>ficha de Chery<\/a>\./);
    assert.doesNotMatch(html, />\/marcas\/chery</);
    assert.match(html, /overflow-x-auto/);
    assert.match(html, /<th[^>]*>Modelo<\/th>/);
    assert.match(html, /<th[^>]*>Versión<\/th>/);
    assert.match(html, /<th[^>]*>Precio \(US\$\)<\/th>/);
    assert.match(html, /<th[^>]*>Tipo de precio<\/th>/);
    assert.match(html, /<td[^>]*>28\.700<\/td>/);
    assert.match(html, /Precios sugeridos de Chery/);
    assert.match(html, /href="\/marcas\/chery\/tiggo-4-pro"[^>]*>catálogo<\/a>\./);
    assert.match(html, /<ul[^>]*>/);
    assert.match(html, /<li[^>]*>Incluye impuestos\.<\/li>/);
    assert.match(html, /<li[^>]*>Sin flete\.<\/li>/);

    assert.throws(
      () =>
        parsePost(
          {
            slug: 'vacio',
            title: 'Vacío',
            date: '2026-11-16',
            description: 'Resumen.',
            category: 'Precios',
            image: {
              src: '/blog/vacio/portada.webp',
              alt: 'Auto',
              credit: 'Imagen: Marca',
              width: 1600,
              height: 900,
            },
            sources: [],
            sections: [{ heading: 'Nada' }],
          },
          'vacio.json'
        ),
      /sin paragraphs ni blocks/
    );
    assert.throws(
      () =>
        parsePost(
          {
            slug: 'tabla',
            title: 'Tabla',
            date: '2026-11-16',
            description: 'Resumen.',
            category: 'Precios',
            image: {
              src: '/blog/tabla/portada.webp',
              alt: 'Auto',
              credit: 'Imagen: Marca',
              width: 1600,
              height: 900,
            },
            sources: [],
            sections: [
              {
                heading: 'Precios',
                blocks: [
                  {
                    type: 'table',
                    headers: ['Modelo', 'Precio (US$)'],
                    rows: [['Solo un valor']],
                  },
                ],
              },
            ],
          },
          'tabla.json'
        ),
      /no coincide con headers/
    );
  });
});

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}
