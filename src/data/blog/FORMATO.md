# Artículos del blog

Un archivo por artículo, en esta carpeta:

`src/data/blog/posts/{slug}.json`

El nombre del archivo tiene que ser el mismo que `slug`. Sin archivos JSON, el blog queda vacío y no se publica ninguna nota.

```json
{
  "slug": "solo-minusculas-y-guiones",
  "title": "Título del artículo",
  "date": "2026-11-16",
  "description": "Resumen corto para la tarjeta, el meta description y Open Graph.",
  "category": "Categoría libre",
  "sources": [
    { "title": "Nombre de la fuente", "url": "https://ejemplo.com/documento" }
  ],
  "sections": [
    {
      "heading": "Apartado",
      "paragraphs": ["Párrafo."]
    }
  ]
}
```

`date` es `YYYY-MM-DD`. `sources` puede ser `[]`. `url`, si está, empieza con `http://` o `https://`. Hace falta al menos una sección con un párrafo. No hace falta otro CMS: el build lee estos JSON y arma `/blog` y `/blog/{slug}`.

Un párrafo sigue siendo un texto. Si incluye una URL, la página del artículo la vuelve enlace sin cambiar las palabras:

- `https://www.autoschinos.ar/ruta` y `https://autoschinos.ar/ruta` enlazan a `/ruta`.
- Cualquier otra URL `http://` o `https://` enlaza afuera, en una pestaña nueva.
- El punto, la coma u otro signo pegado al final de la URL queda fuera del enlace.
