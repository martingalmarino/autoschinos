import Link from 'next/link';
import { CONTACT_EMAIL } from '@/lib/site';

const navigationLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Catálogo', href: '/catalogo' },
  { name: 'Marcas', href: '/marcas' },
  { name: 'Guías', href: '/guias' },
  { name: 'Contacto', href: '/contacto' },
];

const companyLinks = [
  { name: 'Acerca de', href: '/acerca-de' },
  { name: 'Contacto', href: '/contacto' },
  { name: 'Guías', href: '/guias' },
  { name: 'Preguntas frecuentes', href: '/#faq' },
];

const legalLinks = [
  { name: 'Términos y Condiciones', href: '/terminos-condiciones' },
  { name: 'Política de Privacidad', href: '/politica-privacidad' },
  { name: 'Cookies', href: '/politica-cookies' },
  { name: 'Aviso Legal', href: '/aviso-legal' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-white footer-neutral-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">
              Navegación
            </h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">
              Nuestra Empresa
            </h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">
              Legal & Privacidad
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 via-primary-400 to-red-500 bg-clip-text text-transparent mb-4">
              autoschinos.ar
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm mb-6">
              Tu portal de información sobre autos chinos en Argentina. Explorá
              fichas técnicas y especificaciones de las principales marcas.
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-gray-300 font-medium text-sm">Email</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-gray-400 text-sm hover:text-white underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div>
                <p className="text-gray-300 font-medium text-sm">Ubicación</p>
                <p className="text-gray-400 text-sm">Argentina</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {year} autoschinos.ar. Todos los derechos reservados.
            </p>
            <div className="text-gray-400 text-sm">
              Desarrollado por{' '}
              <a
                href="mailto:m.galmarino@gmail.com"
                className="text-white hover:text-gray-300 font-medium underline"
              >
                Martín Galmarino
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
