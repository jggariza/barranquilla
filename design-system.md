# Design System — Barranquilla

## Principio rector

Barranquilla es popular, no fashion. La estética es directa, pesada, con carácter. No buscamos elegancia minimal — buscamos presencia y autenticidad.

## Tipografía

| Elemento | Font weight | Notas |
|----------|-------------|-------|
| Hero H1 | `font-bold` (700) | Impacto inmediato, se siente como un letrero pintado |
| Gallery H2 | `font-semibold` (600) | Legible sobre imagen, con peso |
| Interstitial H2 | `font-bold` (700) | Grandes, dominantes, imposibles de ignorar |
| Body text | `font-normal` (400) | Contraste con los títulos pesados |
| Labels/caps | `font-semibold` (600) | Pequeños pero firmes |
| "Leer más" link | `font-normal` (400) | Inline, underline sutil, no grita |

**Font**: Sora (variable, Google Fonts)

## Colores

| Uso | Valor |
|-----|-------|
| Fondo general | `#f5f2ed` (crema cálido) |
| Texto principal | `neutral-900` |
| Texto secundario | `neutral-500` |
| Texto sobre imagen | `white` con opacidades (70%, 50%, 40%, 30%) |
| Labels sobre imagen | `white/60` uppercase tracking wide |
| Nav | `mix-blend-difference` (siempre blanco invertido) |
| Panel Read More | `neutral-900/80` + `backdrop-blur-2xl` |
| Interstitial bg | `#f5f2ed` (sólido, tapa la sección anterior) |

## Layout & Espaciado

- **Secciones galería**: `min-h-screen`, imágenes `95vw × 90vh` (regular) o `100vw × 100vh` (background)
- **Interstitials**: `min-h-screen`, `max-w-5xl` centrado, `py-[20vh]`
- **Margin negativo**: `-5vh` entre secciones regulares (superposición)
- **Footer**: `h-[50vh]`, mínimo, solo texto de cierre

## Scroll & Animación

| Parámetro | Valor | Por qué |
|-----------|-------|---------|
| Lenis duration | `2.0` | Inercia alta — se siente con peso/masa |
| Lenis wheelMultiplier | `0.55` | Reduce velocidad de scroll 45% |
| Lenis easing | quintic `1-(1-t)^5` | Desaceleración larga y suave |
| Scrub (parallax) | `1.5` | Las capas se "arrastran" con gracia |
| Scrub (content) | `1.0–1.2` | Texto responde un poco más rápido |
| Parallax imagen | `yPercent: -10 → 10` | Movimiento sutil, profundidad |
| Parallax texto | `yPercent: 5 → -15` | Velocidad diferente al imagen |

## Z-Index & Layering

- Cada 3ra sección (`index % 3 === 1`) es "background": se queda pinned, la siguiente se desliza encima
- Las secciones regulares tienen z-index descendente (`total - index + 2`)
- Interstitials: `z-20` con fondo sólido para tapar lo de atrás
- Nav: `z-[60]`
- Read More panel: `z-[90]`
- Detail Modal: `z-[100]`

## Componentes UI

### Toggle Antes/Después
- Pills redondeados (`rounded-full`)
- Activo: `bg-white text-black`
- Inactivo: `border border-white/25 text-white/50`
- Transición: crossfade con scale sutil (GSAP, no CSS)

### Panel Read More
- Slide-in desde la derecha (GSAP `x: 100% → 0%`)
- Desktop: `460-520px` ancho fijo
- Mobile: full width overlay
- Backdrop: solo dim (`bg-black/30`), NO blur en el fondo
- Panel: `bg-neutral-900/80 backdrop-blur-2xl`
- Botones share: pills con border sutil

### Interstitials
- Headline: parallax `y: 120 → -60` con fade-in
- Body: parallax `y: 80 → -40`, entra después
- Fondo sólido `bg-[#f5f2ed]` obligatorio (si no, se transparenta la sección anterior)

## Decisiones de diseño

- **No usar** `font-extralight` ni `font-light` en títulos — se siente pretencioso
- **No usar** tracking extremo en headlines — es un recurso de moda
- **No usar** snap scroll — se siente forzado y poco natural
- **No usar** pinning por sección — el parallax real es mejor que el fake scroll
- **Sí usar** parallax con capas a diferentes velocidades — crea profundidad real
- **Sí usar** z-index layering para que secciones se "quemen" entre ellas
- Los títulos deben sentirse como si alguien los hubiera escrito con ganas, no con miedo
- Las imágenes deben ser grandes — el contenido visual es el protagonista
