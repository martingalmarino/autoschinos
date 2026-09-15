import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs, { type BreadcrumbItem } from '@/components/Breadcrumbs';

interface SiteShellProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

export default function SiteShell({
  children,
  breadcrumbs,
  className = 'min-h-screen bg-white',
}: SiteShellProps) {
  return (
    <div className={className}>
      <Navbar />
      {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
