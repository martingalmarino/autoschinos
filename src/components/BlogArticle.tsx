import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { linkifyParagraph } from '@/lib/blog-links';
import { formatPostDate, type BlogBlock, type BlogPost } from '@/lib/blog';

function linkClass(label: string): string {
  const base = 'text-primary-600 underline';
  return /^https?:\/\//i.test(label) ? `${base} break-all` : base;
}

function RichText({ text }: { text: string }) {
  const parts = linkifyParagraph(text);
  return (
    <>
      {parts.map((part, index) => {
        if (part.kind === 'text') return <React.Fragment key={index}>{part.value}</React.Fragment>;
        if (part.kind === 'internal') {
          return (
            <Link key={index} href={part.href} className={linkClass(part.label)}>
              {part.label}
            </Link>
          );
        }
        return (
          <a
            key={index}
            href={part.href}
            className={linkClass(part.label)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {part.label}
          </a>
        );
      })}
    </>
  );
}

function Paragraph({ text }: { text: string }) {
  return (
    <p className="mb-4">
      <RichText text={text} />
    </p>
  );
}

function BlockView({ block }: { block: BlogBlock }) {
  if (block.type === 'paragraph') return <Paragraph text={block.text} />;
  if (block.type === 'subheading') {
    return (
      <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
        <RichText text={block.text} />
      </h3>
    );
  }
  if (block.type === 'list') {
    return (
      <ul className="mb-4 list-disc space-y-2 pl-5">
        {block.items.map((item, index) => (
          <li key={index}>
            <RichText text={item} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <figure className="mb-6">
      {block.caption ? (
        <figcaption className="mb-2 text-sm font-semibold text-gray-900">
          <RichText text={block.caption} />
        </figcaption>
      ) : null}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-900">
            <tr>
              {block.headers.map((header, headerIndex) => (
                <th key={headerIndex} scope="col" className="whitespace-nowrap border-b border-gray-200 px-3 py-2 font-semibold">
                  <RichText text={header} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="odd:bg-white even:bg-gray-50">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="whitespace-nowrap border-b border-gray-100 px-3 py-2 align-top">
                    <RichText text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {block.note ? (
        <p className="mt-2 text-xs text-gray-500">
          <RichText text={block.note} />
        </p>
      ) : null}
    </figure>
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
                {section.blocks.map((block, index) => (
                  <BlockView key={index} block={block} />
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
