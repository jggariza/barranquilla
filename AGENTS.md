# Barranquilla — La belleza escondida

## Qué es

Archivo visual interactivo del paisaje urbano popular de Barranquilla. Imágenes capturadas desde Google Street View, curadas y presentadas con scroll-driven animations.

## Stack

- **Next.js 16** (App Router) + React 19
- **GSAP + ScrollTrigger** — parallax, reveal, layering entre secciones
- **Lenis** — smooth scroll con fricción controlada
- **Tailwind CSS v4**
- **Vercel** — deploy automático desde main

## Estructura

```
src/
├── app/              # Pages (App Router)
│   ├── page.tsx      # Home: Hero + Gallery randomizada + Interstitials + Modals
│   ├── about/        # Sobre el proyecto
│   └── contact/      # Contacto
├── components/
│   ├── hero.tsx              # Título animado con parallax
│   ├── gallery-section.tsx   # Sección por edificio (parallax, z-index layering, toggle antes/después)
│   ├── interstitial-section.tsx  # Secciones editoriales de pausa (cada 5 edificios)
│   ├── detail-modal.tsx      # Modal expandido (solo Asilo San Antonio por ahora)
│   ├── read-more-panel.tsx   # Panel lateral con descripción larga + share RRSS
│   └── navigation.tsx        # Nav fijo con mix-blend-difference
├── data/
│   ├── gallery.ts            # 45 edificios con shortDesc, longDesc, imágenes, metadatos
│   └── interstitials.ts      # 8 textos editoriales de pausa
└── lib/
    └── lenis-provider.tsx    # Smooth scroll + GSAP integration
```

## Datos

- **Source of truth**: Base de datos en Notion (`DB Barranquilla`)
- **Campos**: Name, Barrio, Text (dirección), Img 1, Img 2, Desc_Corta, Desc_Larga
- **Imágenes**: `public/source/` — nombradas `{##}_{Nombre}_{Pre|Post}.png`
- **Sincronización**: Manual — actualizar Notion y luego `gallery.ts`

## Comportamiento clave

- **Randomizer**: el orden de edificios se baraja con Fisher-Yates en cada visita
- **Antes/Después**: toggle dentro del mismo bloque, sin scroll, con crossfade animado
- **Interstitials**: secciones blancas con texto editorial cada 5 edificios
- **Z-index layering**: cada 3ra sección es "background" (pinned), la siguiente se desliza encima
- **Read More panel**: slide-in desde la derecha con backdrop-blur en el panel, no en el fondo
- **Detail Modal**: solo para edificios representativos (hasDetailModal: true)

## Convenciones

- Descripciones cortas: 1-2 frases directas, sin floreos. Hablan de lo que se ve y por qué importa.
- Descripciones largas: contexto histórico, paso del tiempo, valor cultural. Tono personal pero no académico.
- No AI-speak: nada de "monumento vivo", "sincretismo cultural", "testimonio del esplendor". Directo, popular, con carácter.
- Ver `design-system.md` para decisiones de UI.

## Deploy

Push a main → Vercel auto-deploys. Preset: Next.js (auto-detected).

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
