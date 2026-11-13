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

## Identidad v6.0 · "Noche de Carnaval"

La marca es **un letrero de neón encendido en una noche de Carnaval, debajo de la carpa del carrito de comida**. Lo que brilla es lo importante; lo demás se queda quieto y oscuro para que brille más. Seis reglas:

1. **La noche:** todo va sobre noche morada `#0D0919`.
2. **Seis neones:** mango `#FFC93C`, tomate `#FF4A5A` y cian `#2EC8FF` para títulos y botones; naranja `#FF8A2B`, morado `#B455FF` y lima `#7CFF6B` para figuras y detalles. Uno por título.
3. **Letra picotera de neón:** Lilita One en mayúsculas con relleno de color, contorno crema, sombra uva y brillo de neón (clase `.letrero`, color con `--n`). Subtítulos en Nunito negrita con neón suave; texto corrido en Nunito crema.
4. **Figuras de Carnaval:** sombrero vueltiao, Marimonda y torito en neón (`img/*-neon.svg`), en carrusel en la portada. Son la cara de la marca mientras llega el logo.
5. **La carpa:** arriba y abajo, azulejos costeños de neón con faldón de ondas en neón mango (`--toldo`, `--falda-*`). Se conserva tal cual.
6. **Un solo protagonista:** en cada pantalla brilla una sola cosa. Notas sin cajas (`.nota`, separadas por una línea), botón principal en mango, todo alineado a la izquierda.

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
- [ ] Validar identidad visual v6.0
- [ ] Nombre definitivo
- [ ] Historia de origen
- [ ] Plato costeño insignia
- [ ] Logo y personaje ilustrado
- [ ] Aplicar la marca a la web, empaques y DoorDash
