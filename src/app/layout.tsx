import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { absoluteUrl, pageTitle, SITE_NAME, SITE_URL } from '@/lib/site';
import { organizationJsonLd, websiteJsonLd } from '@/lib/json-ld';
import JsonLd from '@/components/JsonLd';
import CookieNotice from '@/components/CookieNotice';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: pageTitle(
      'Autos Chinos Argentina 2026: Marcas, Precios y Modelos'
    ),
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Autos chinos en Argentina 2026: marcas, precios de referencia, modelos y fichas técnicas actualizadas.',
  verification: {
    google: 'lbDenuhkDKb6-ShFhLocZ1qHqo-gP94tEZuM5Clgh-4',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: SITE_NAME,
    url: SITE_URL,
    images: [{ url: absoluteUrl('/images/hero-bg.jpg'), width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  other: {
    'theme-color': '#DC2626',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6771833588582297"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <CookieNotice />
      </body>
    </html>
  );
}
