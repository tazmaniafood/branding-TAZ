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

## Identidad v3.5 · "La carpa"

Una sola idea: **la noche de fiesta en una casa costeña**, con el carrito de comida en la puerta, el cartel de picó y los colores planos del fast food. Los colores salen de las escaleras pintadas de los barrios, la Marimonda del Carnaval y la baldosa de la casa: planos y vivos, de fast food. Seis reglas:

1. **La noche:** casi todo va sobre negro `#0C0A12`.
2. **La paleta:** mango `#F6C431`, tomate `#E8472E` y loro `#3DAA52` para títulos y botones (mostaza, ketchup y lechuga); azulejo `#2F62C8` y menta `#7DD3B8` para detalles; corozo en la baldosa; corozo `#8A1F37` en todas las sombras. Texto y contorno en crema `#FFF1DC`.
3. **Letra picotera:** Lilita One en mayúsculas, relleno de color, contorno crema y sombra corozo. Clase `.picotera`, con `--c` (relleno) y `--s` (sombra).
4. **La calcomanía:** todo objeto (tarjeta, botón, pestaña, chip, muestra) se dibuja como la letra: relleno plano, contorno (`--contorno`, o `--contorno-tinta` sobre claro) y sombra dura corozo (`--sombra`, `--sombra-chica`).
5. **La explosión mango:** ahí va lo más importante. Clase `.explosion`.
6. **La carpa:** como el toldo de un carrito de comida. Fondo de baldosa plana y apagada (corozo de noche `#3A0D1B`, rombo y figuras de fast food en tonos bajos) y un faldón oscuro con costuras verticales y ondas entre punta y punta, trazado en neón mango (`--falda-img`). Va en el menú y, volteado, en el pie; la cenefa bajo cada título es un pedacito de baldosa (`.cenefa`).

**Neones del titular.** El titular de la portada lleva un letrero de neón a cada lado (`.cartel__titular`, `.neon`). Por ahora: `img/sombrero-vueltiao-neon.svg` a la izquierda y el mismo volteado a la derecha, mientras llega el segundo.

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
- [ ] Validar identidad visual v3.8
- [ ] Nombre definitivo
- [ ] Historia de origen
- [ ] Plato costeño insignia
- [ ] Logo y personaje ilustrado
- [ ] Aplicar la marca a la web, empaques y DoorDash
