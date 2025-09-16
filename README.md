# autoschinos.ar - Portal de Autos Chinos

Un portal moderno y responsive para la comercialización de vehículos chinos en Argentina.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y profesional inspirada en los mejores portales automotrices
- **Totalmente Responsive**: Optimizado para desktop, tablet y móvil
- **Componentes Modulares**: Arquitectura escalable con componentes reutilizables
- **TypeScript**: Tipado estático para mayor robustez del código
- **TailwindCSS**: Estilos modernos y consistentes

## 🛠️ Stack Tecnológico

- **React 18** con TypeScript
- **Vite** como build tool
- **TailwindCSS** para estilos
- **Headless UI** para componentes interactivos
- **Heroicons** para iconografía

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de la build
npm run preview
```

## 🏗️ Estructura del Proyecto

```
autoschinos_home/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Navegación principal
│   │   ├── Hero.tsx            # Sección hero con CTA
│   │   ├── SearchBlock.tsx     # Búsqueda por marca/modelo/año
│   │   ├── FeaturedModels.tsx  # Grid de 12 modelos destacados
│   │   ├── BrandPills.tsx      # Pills de marcas chinas
│   │   ├── FAQ.tsx             # Accordion de preguntas frecuentes
│   │   └── Footer.tsx          # Footer completo
│   ├── assets/                 # Imágenes y recursos
│   ├── App.tsx                 # Componente principal
│   ├── main.tsx               # Punto de entrada
│   └── index.css              # Estilos globales
├── index.html                 # HTML base
├── package.json              # Dependencias y scripts
├── tailwind.config.js        # Configuración de Tailwind
├── tsconfig.json             # Configuración de TypeScript
└── vite.config.ts            # Configuración de Vite
```

## 🎨 Paleta de Colores

- **Primario**: #E11D48 (Rojo)
- **Gris Oscuro**: #1E293B (Texto principal)
- **Gris Claro**: #F9FAFB (Fondos)
- **Blanco**: #FFFFFF (Fondos de tarjetas)

## 📱 Componentes Incluidos

### Navbar
- Navegación fija en la parte superior
- Menú hamburguesa para móvil
- Logo y enlaces de navegación

### Hero Section
- Imagen de fondo con overlay
- Título y subtítulo llamativos
- Botón CTA principal

### Search Block
- Formulario de búsqueda con dropdowns
- Filtros por marca, modelo y año
- Diseño en tarjeta con sombra

### Featured Models
- Grid responsive de 12 vehículos
- Información detallada de cada modelo
- Botones de acción

### Brand Pills
- Pills horizontales de marcas chinas
- Logos y colores distintivos
- Enlaces a páginas de marca

### FAQ
- Accordion interactivo
- 6 preguntas frecuentes
- Animaciones suaves

### Footer
- Información de contacto
- Enlaces rápidos
- Redes sociales
- Barra de copyright

## 🚀 Próximos Pasos

1. **Integración con Backend**: Conectar con API para datos reales
2. **Sistema de Filtros**: Implementar filtros avanzados
3. **Carrito de Compras**: Funcionalidad de favoritos
4. **Chat en Vivo**: Integración con WhatsApp
5. **SEO**: Optimización para motores de búsqueda

## 📄 Licencia

© 2025 autoschinos.ar - Todos los derechos reservados


