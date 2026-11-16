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
  "image": {
    "src": "/blog/solo-minusculas-y-guiones/portada.webp",
    "alt": "Descripción de la foto, en español",
    "credit": "Imagen: Marca",
    "width": 1600,
    "height": 900
  },
  "sources": [
    { "title": "Nombre de la fuente", "url": "https://ejemplo.com/documento" }
  ],
  "sections": [
    {
      "heading": "Apartado",
      "paragraphs": ["Párrafo corto, con un [enlace a la marca](/marcas/ejemplo)."]
    }
  ]
}
```

`date` es `YYYY-MM-DD`. `sources` puede ser `[]`. `url`, si está, empieza con `http://` o `https://`. Hace falta al menos una sección. No hace falta otro CMS: el build lee estos JSON y arma `/blog` y `/blog/{slug}`.

Cada sección tiene `heading` y, además, `paragraphs`, `blocks`, o los dos. `paragraphs` sigue siendo válido: las notas ya publicadas no cambian. Una nota nueva puede usar solo `blocks`. Si están los dos, primero se muestran los párrafos y después los bloques.

Un bloque es uno de estos:

- `paragraph`: `{ "type": "paragraph", "text": "..." }`
- `subheading`: `{ "type": "subheading", "text": "..." }`, se ve como título de nivel h3
- `list`: `{ "type": "list", "items": ["...", "..."] }`
- `table`: encabezados, filas, y si hace falta un `caption` y una `note` debajo

```json
{
  "heading": "Chery",
  "blocks": [
    {
      "type": "paragraph",
      "text": "Chery publica la lista en su [sitio oficial](https://chery.com.ar/)."
    },
    { "type": "subheading", "text": "SUV" },
    {
      "type": "table",
      "caption": "Precios sugeridos de Chery",
      "headers": ["Modelo", "Versión", "Precio (US$)", "Tipo de precio"],
      "rows": [
        ["Tiggo 4", "Pro 1.5T CVT Luxury FL", "28.700", "Público sugerido"],
        ["Tiggo 7", "Pro Hybrid 1.5T PHEV Premium", "37.500", "Público sugerido"]
      ],
      "note": "Lista N°15, 4 de noviembre de 2026. No incluye patentamiento ni flete. La ficha del Tiggo 4 Pro está en el [catálogo](/marcas/chery/tiggo-4-pro)."
    },
    {
      "type": "list",
      "items": [
        "Los importes incluyen impuestos.",
        "Rigen hasta que la marca publique otra lista."
      ]
    }
  ]
}
```

Cada fila tiene la misma cantidad de celdas que `headers`. La tabla se desplaza en horizontal en pantallas chicas. `caption` y `note` son opcionales. Los textos de párrafos, subtítulos, ítems, celdas, caption y nota aceptan enlaces.

`image` es obligatorio. Sin imagen el artículo no se publica.

- `src` es un archivo local bajo `/public/blog/{slug}/`, por ejemplo `/blog/{slug}/portada.webp`. El build rechaza la nota si ese archivo no está en `public`. Extensiones: `.webp`, `.jpg` o `.jpeg`.
- `alt` describe la foto, en español.
- `credit` es el crédito visible, corto, por ejemplo `Imagen: BAIC Argentina`.
- `width` y `height` son los píxeles reales del archivo, para reservar el espacio y no mover el layout.

## Enlaces

En el texto se escribe `[texto visible](url)`. El texto visible es un ancla descriptiva y natural. La URL no se muestra.

- `https://www.autoschinos.ar/ruta`, `https://autoschinos.ar/ruta` y una ruta `/ruta` enlazan adentro del sitio.
- Cualquier otra URL `http://` o `https://` enlaza afuera, en una pestaña nueva.
- El punto, la coma u otro signo queda fuera del enlace: `[la ficha](/marcas/chery).`

Una URL escrita suelta sigue funcionando, para no romper las notas ya publicadas. En una nota nueva no se usa: siempre va el ancla.

## Redacción

- Párrafos cortos.
- Los precios van en una tabla, con columnas `Modelo`, `Versión`, `Precio (US$)` y `Tipo de precio`. No van en un párrafo corrido.
- La nota de la tabla dice la fuente, la fecha y qué no incluye el importe.
