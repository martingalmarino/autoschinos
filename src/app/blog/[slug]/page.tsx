import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';
import JsonLd from '@/components/JsonLd';
import { formatPostDate, getPostBySlug, getPosts } from '@/lib/blog';
import { breadcrumbJsonLd } from '@/lib/json-ld';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Artículo no encontrado' };

  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: `${post.title} | ${SITE_NAME}`,
      description: post.description,
      url,
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;

  return (
    <SiteShell
      className="min-h-screen bg-gray-50"
      breadcrumbs={[
        { name: 'Inicio', href: '/' },
        { name: 'Blog', href: '/blog' },
        { name: post.title, href: path },
      ]}
    >
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Inicio', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          articleSection: post.category,
          mainEntityOfPage: absoluteUrl(path),
          author: { '@type': 'Organization', name: SITE_NAME },
          publisher: { '@type': 'Organization', name: SITE_NAME },
        }}
      />
      <article className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-10">
            <p className="text-sm text-primary-600 font-medium mb-3">
              {post.category}
              <span className="text-gray-400"> · </span>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <p className="text-lg text-gray-600 mb-10">{post.description}</p>

            <div className="space-y-10 text-gray-700 leading-relaxed">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            {post.sources.length > 0 && (
              <section className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Fuentes</h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  {post.sources.map((source) => (
                    <li key={`${source.title}-${source.url ?? ''}`}>
                      {source.url ? (
                        <a
                          href={source.url}
                          className="text-primary-600 underline break-all"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {source.title}
                        </a>
                      ) : (
                        source.title
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
              <Link href="/catalogo" className="btn-primary text-center">
                Ver catálogo
              </Link>
              <Link href="/blog" className="btn-secondary text-center">
                Volver al blog
              </Link>
            </div>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
