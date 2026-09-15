# autoschinos.ar

Portal informativo de autos chinos en Argentina.

## Stack

- **Next.js 15** (App Router) con SSG
- React 19 + TypeScript + TailwindCSS
- Hosting: Vercel

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Variables de entorno

Copiá `.env.example` a `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — por defecto `https://www.autoschinos.ar`
- `NEXT_PUBLIC_CONTACT_EMAIL` — email público
- `NEXT_PUBLIC_WHATSAPP` — número internacional sin `+` (opcional; si falta, el formulario usa mailto)

## SEO

- HTML estático por ruta (`generateStaticParams`)
- `/robots.txt` y `/sitemap.xml` generados por Next
- JSON-LD: Organization, WebSite, BreadcrumbList, Vehicle, FAQPage

## Search Console (post-deploy)

1. Confirmar que apex redirige a `www`
2. Enviar sitemap: `https://www.autoschinos.ar/sitemap.xml`
3. Inspeccionar 5–10 URLs de marca/modelo y solicitar indexación
4. Revisar Cobertura / Páginas en las semanas siguientes

## AdSense (checklist antes de pedir revisión)

1. Verificar en producción:
   - `https://www.autoschinos.ar/ads.txt`
   - `/acerca-de`, `/guias`, `/politica-privacidad`, `/politica-cookies`, `/contacto`
2. Misma cuenta Google en Search Console y AdSense; sitemap enviado
3. Confirmar que `contacto@autoschinos.ar` recibe correo
4. Solicitar revisión desde AdSense (el snippet `ca-pub-6771833588582297` ya está en el layout)
5. Evitar unidades de anuncio densas o clickbait hasta la aprobación
