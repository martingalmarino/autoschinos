import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { linkifyParagraph } from '@/lib/blog-links';
import { formatPostDate, type BlogPost } from '@/lib/blog';

function Paragraph({ text }: { text: string }) {
  const parts = linkifyParagraph(text);
  return (
    <p className="mb-4">
      {parts.map((part, index) => {
        if (part.kind === 'text') return <React.Fragment key={index}>{part.value}</React.Fragment>;
        if (part.kind === 'internal') {
          return (
            <Link key={index} href={part.href} className="text-primary-600 underline break-all">
              {part.label}
            </Link>
          );
        }
        return (
          <a
            key={index}
            href={part.href}
            className="text-primary-600 underline break-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            {part.label}
          </a>
        );
      })}
    </p>
  );
}

export default function BlogArticle({ post }: { post: BlogPost }) {
  return (
    <article className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-10">
          <p className="text-sm text-primary-600 font-medium mb-3">
            {post.category}
            <span className="text-gray-400"> · </span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <figure className="mb-8">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              width={post.image.width}
              height={post.image.height}
              priority
              sizes="(min-width: 768px) 768px, 100vw"
              className="w-full h-auto rounded-lg"
            />
            <figcaption className="mt-2 text-xs text-gray-500">{post.image.credit}</figcaption>
          </figure>
          <p className="text-lg text-gray-600 mb-10">{post.description}</p>

          <div className="space-y-10 text-gray-700 leading-relaxed">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <Paragraph key={paragraph} text={paragraph} />
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
  );
}
