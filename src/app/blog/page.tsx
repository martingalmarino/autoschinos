import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import JsonLd from '@/components/JsonLd';
import BlogList from '@/components/BlogList';
import { getPosts } from '@/lib/blog';
import { breadcrumbJsonLd } from '@/lib/json-ld';
import { absoluteUrl } from '@/lib/site';

const title = 'Blog';
const description = 'Blog de autoschinos.ar. Todavía no hay artículos publicados.';

export function generateMetadata(): Metadata {
  const posts = getPosts();
  return {
    title,
    description: posts.length
      ? 'Artículos de autoschinos.ar sobre autos chinos en Argentina.'
      : description,
    alternates: { canonical: absoluteUrl('/blog') },
    openGraph: {
      title: 'Blog | autoschinos.ar',
      description: posts.length
        ? 'Artículos de autoschinos.ar sobre autos chinos en Argentina.'
        : description,
      url: absoluteUrl('/blog'),
    },
  };
}

export default function BlogIndexPage() {
  const posts = getPosts();

  return (
    <SiteShell
      className="min-h-screen bg-gray-50"
      breadcrumbs={[
        { name: 'Inicio', href: '/' },
        { name: 'Blog', href: '/blog' },
      ]}
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
      <section className="pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-12 max-w-3xl ${posts.length ? '' : 'mx-auto text-center'}`}>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Blog</h1>
            {posts.length === 0 ? <BlogList posts={posts} /> : null}
          </div>
          {posts.length > 0 ? <BlogList posts={posts} /> : null}
        </div>
      </section>
    </SiteShell>
  );
}
