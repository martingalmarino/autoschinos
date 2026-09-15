import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items.length) return null;

  return (
    <nav
      className="bg-white border-b border-gray-200 shadow-sm pt-[7rem]"
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1 py-6">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />
                )}
                {isLast ? (
                  <span className="flex items-center text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-md">
                    {index === 0 && <HomeIcon className="h-4 w-4 mr-2" />}
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-500 px-3 py-1 rounded-md"
                  >
                    {index === 0 && <HomeIcon className="h-4 w-4 mr-2" />}
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
