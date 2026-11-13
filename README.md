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

## Identidad v2.1 · "La verbena en casa"

Una sola idea une todo: **la fiesta de noche en la terraza de una casa costeña**. La baldosa arriba, abajo y bajo cada título; en la pared el cartel de picó; en la mesa todo pegado como calcomanía. Es el propósito de la marca hecho imagen: que nadie se sienta lejos de casa a la hora de comer. Seis reglas:

1. **La noche:** casi todo va sobre negro `#0C0A12`.
2. **Paleta con oficios:** noche de fondo (60 %); corozo `#8A1F37` en todas las sombras y en la baldosa (20 %); mango `#F5B335`, achiote `#EE6A2F` y buganvilia `#E0457B` para títulos y botones (15 %); caribe `#1E9EA6` y palma `#3FAE6A` solo en detalles chicos (5 %), nunca en títulos. Texto y contorno en crema `#FFF1DC`; caribe hondo `#106B73` en los pétalos de la baldosa.
3. **Letra picotera:** Lilita One en mayúsculas, relleno cálido, contorno crema y sombra corozo. Clase `.picotera`, con `--c` (relleno) y `--s` (sombra).
4. **La calcomanía:** todo objeto (tarjeta, botón, pestaña, chip, muestra de color) se dibuja como la letra: relleno plano, contorno (`--contorno`, o `--contorno-tinta` sobre fondos claros) y sombra dura corozo (`--sombra`, `--sombra-chica`). Una esquina para tarjetas (`--radius-md`), píldora para lo que se toca.
5. **La explosión mango:** ahí va lo más importante. Clase `.explosion`.
6. **La baldosa:** baldosa hidráulica en corozo, caribe hondo y mango (`--baldosa`). Es la carpa del menú y del pie, con borde festoneado, y la cenefa bajo cada título (`.cenefa`). Es lo que une toda la casa.

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
- [ ] Validar identidad visual v2.1
- [ ] Nombre definitivo
- [ ] Historia de origen
- [ ] Plato costeño insignia
- [ ] Logo y personaje ilustrado
- [ ] Aplicar la marca a la web, empaques y DoorDash
