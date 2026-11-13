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

## Identidad v5.0 · "Noche de Carnaval"

Una sola idea: **la noche de Carnaval en la Costa, con letreros de neón vivos**. Arriba y abajo, la carpa del carrito de comida con su faldón de neón y sus azulejos costeños; los títulos son de cartel de picó; lo demás va pegado como calcomanía. Seis reglas:

1. **La noche:** todo va sobre noche morada `#0D0919`.
2. **Neones de Carnaval:** mango `#FFC93C`, tomate `#FF4A5A` y cian `#2EC8FF` para títulos y botones; naranja `#FF8A2B`, morado `#B455FF` y lima `#7CFF6B` para figuras y detalles (lima también para confirmar y WhatsApp); uva `#5B1F94` en todas las sombras; texto en crema `#FFF1DC`.
3. **Letra picotera:** Lilita One en mayúsculas, relleno de color, contorno crema y sombra uva. Clase `.picotera`, con `--c` (relleno) y `--s` (sombra).
4. **La calcomanía:** todo objeto (tarjeta, botón, pestaña, chip, muestra) se dibuja como la letra: relleno plano, contorno (`--contorno`, o `--contorno-tinta` sobre claro) y sombra dura uva (`--sombra`, `--sombra-chica`).
5. **La explosión mango:** ahí va lo más importante. Clase `.explosion`.
6. **La carpa:** el toldo de un carrito de comida. Fondo de azulejos costeños de neón (`img/azulejos-costenos.svg`: sombrero vueltiao, acordeón, palma, mar y sol, arepa de huevo, cayena, maracas y kanas wayuu) con un velo suave, y un faldón de ondas en neón mango (`--falda-*`). Va en el menú y, volteado, en el pie; la cenefa de cada título es un pedacito.

**Portada.** Texto a la izquierda (titular, cenefa, bajada, datos y botón) y, a la derecha, un carrusel de figuras de neón que se turnan cada 4 s (`.cartel__escena.carrusel`: sombrero vueltiao y Marimonda por ahora). Para agregar una figura, otro `<img class="carrusel__item">`. En celular las figuras van arriba.

**Pestañas.** Tranquilas, para no competir con el titular: letra crema y borde crema tenue sobre noche translúcida; solo la activa se enciende en neón mango.

Las ilustraciones y adornos llegan después y deben seguir la regla 4.

Para leer: Nunito. Movimiento: el cartel "se pega" línea por línea al cargar; después, solo lo que responde a lo que haces (pestañas, valores, chat). Respeta "reducir movimiento".

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
- [ ] Validar identidad visual v5.0
- [ ] Nombre definitivo
- [ ] Historia de origen
- [ ] Plato costeño insignia
- [ ] Logo y personaje ilustrado
- [ ] Aplicar la marca a la web, empaques y DoorDash
