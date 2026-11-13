# branding-TAZ

Guía de identidad de la comida rápida costeña en San José, California.
**"TAZ" es un nombre provisional**, solo para diferenciar el proyecto.

Abre `index.html` en el navegador (con internet, para que carguen las fuentes).

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La guía, con un menú de pestañas: cada sección (alma, valores, personalidad, voz, públicos, identidad, aplicaciones, redes, pendientes) se abre por separado. Se puede enlazar directo, por ejemplo `index.html#valores`. |
| `css/tokens.css` | Tokens de marca y semánticos (`--bg-surface`, `--text-primary`, `--accent`, `--space-*`, `--step-*`, radios, sombras, movimiento y adornos). Úsalo en cualquier página del proyecto. |
| `css/styles.css` | Estilos de la guía, mobile-first, con tipografía y espacios fluidos (`clamp()`). |
| `js/main.js` | Interacciones con delegación de eventos (`data-action`), estado en `data-state` / `aria-*` y código defensivo. |

## Identidad v0.9 · "Carnaval de noche"

El **alma** viene de la web de pedidos (caricatura de fast food: contorno negro y sombra dura en todo, tarjetas chuecas, comida y movimiento). Los **colores** vienen de la Costa:

- **Rojo `#F03A2E`, amarillo `#FFC21A` y verde `#13A54F`:** las banderas de Barranquilla y Cartagena, los colores del Carnaval. Mandan.
- **Fucsia `#FF3E9A` (marimonda) y azul `#2D5BFF` (congo):** acentos, como los disfraces del desfile.
- **Noche `#1A1035`** de fondo, **crema `#FFF4E0`** para leer y **tinta `#0B0618`** para contornos y sombras.
- **Letras:** Lilita One (títulos y cinta) + Nunito (lectura).
- **Adornos y movimiento:** banderines de carnaval que se mecen, cinta de mamadera de gallo, confeti y banderines sueltos flotando en la portada y confeti en el cielo. Sin logo: todavía no está hecho. Respeta "reducir movimiento".

## Usar los tokens

```html
<link rel="stylesheet" href="css/tokens.css">
```

```css
.boton-pedir {
  background: var(--accent);
  color: var(--on-accent);
  font-family: var(--font-display);
  box-shadow: var(--shadow-block-sm);
}
```

## Estado

- [x] Alma, valores, personalidad, voz, públicos y redes
- [ ] Validar identidad visual v0.9
- [ ] Nombre definitivo
- [ ] Historia de origen
- [ ] Plato costeño insignia
- [ ] Logo y personaje ilustrado
- [ ] Aplicar la marca a la web, empaques y DoorDash
