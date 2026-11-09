import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteShell from '@/components/SiteShell';
import BlogArticle from '@/components/BlogArticle';
import JsonLd from '@/components/JsonLd';
import { getPostBySlug, getPosts } from '@/lib/blog';
import { blogPostingJsonLd, breadcrumbJsonLd } from '@/lib/json-ld';
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
  const image = absoluteUrl(post.image.src);
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
      images: [{ url: image, width: post.image.width, height: post.image.height, alt: post.image.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [image],
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
      <JsonLd data={blogPostingJsonLd(post)} />
      <BlogArticle post={post} />
    </SiteShell>
  );
}
