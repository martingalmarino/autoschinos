'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'autoschinos_cookie_notice_accepted';

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 inset-x-0 z-[60] p-4"
    >
      <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-xl shadow-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <p className="text-sm text-slate-200 flex-1">
          Usamos cookies propias y de terceros (incluido Google AdSense) para
          el funcionamiento del sitio y mostrar publicidad. Podés leer más en
          nuestra{' '}
          <Link href="/politica-privacidad" className="underline text-white">
            Política de Privacidad
          </Link>{' '}
          y{' '}
          <Link href="/politica-cookies" className="underline text-white">
            Política de Cookies
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="bg-primary-500 hover:bg-primary-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm whitespace-nowrap"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
