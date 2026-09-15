import Link from 'next/link';
import SiteShell from '@/components/SiteShell';

export default function NotFound() {
  return (
    <SiteShell className="min-h-screen bg-gray-50">
      <div className="pt-32 pb-20 text-center px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Página no encontrada
        </h1>
        <p className="text-gray-600 mb-8">
          La página que buscás no existe o fue movida.
        </p>
        <Link href="/" className="btn-primary inline-block">
          Volver al inicio
        </Link>
      </div>
    </SiteShell>
  );
}
