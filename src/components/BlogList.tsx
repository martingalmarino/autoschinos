import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPostDate, type BlogPost } from '@/lib/blog';

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-lg text-gray-600">Todavía no hay artículos publicados.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow"
        >
          <div
            className="relative mb-4 overflow-hidden rounded-lg bg-white"
            style={{ aspectRatio: `${post.image.width} / ${post.image.height}` }}
          >
            <Image
              src={post.image.src}
              alt={post.image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
          <p className="text-xs font-medium text-primary-600 mb-2 uppercase tracking-wide">
            {post.category}
            <span className="text-gray-400"> · </span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </p>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
          <p className="text-gray-600 text-sm mb-4">{post.description}</p>
          <span className="text-primary-600 font-semibold text-sm">Leer artículo →</span>
        </Link>
      ))}
    </div>
  );
}
