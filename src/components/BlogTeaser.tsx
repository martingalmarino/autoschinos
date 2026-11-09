import React from 'react';
import Link from 'next/link';
import { formatPostDate, type BlogPost } from '@/lib/blog';

export default function BlogTeaser({ posts }: { posts: BlogPost[] }) {
  const preview = posts.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Blog</h2>
          {preview.length === 0 ? (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Todavía no hay artículos publicados.
            </p>
          ) : null}
        </div>

        {preview.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {preview.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-xl border border-gray-200 bg-gray-50 p-6 hover:border-primary-300 hover:shadow-md transition-all"
              >
                <p className="text-xs font-medium text-primary-600 mb-2 uppercase tracking-wide">
                  {post.category}
                </p>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{post.description}</p>
                <time dateTime={post.date} className="block text-xs text-gray-500 mb-3">
                  {formatPostDate(post.date)}
                </time>
                <span className="text-primary-600 text-sm font-semibold">Leer →</span>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link href="/blog" className="btn-primary inline-block">
            Ir al blog
          </Link>
        </div>
      </div>
    </section>
  );
}
