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

## Identidad v1.3 · "Cartel de picó"

La identidad sale de los **carteles de fiesta de picó** de Barranquilla y Cartagena. Tienen una gramática fija, y por eso todo queda coherente. Seis reglas:

1. **Fondo negro** (`#0C0A12`): la noche de la verbena.
2. **Cinco colores costeños:** mango `#F5B335`, buganvilia `#E0457B`, palma `#3FAE6A`, achiote `#EE6A2F` y caribe `#1E9EA6`. Dos hondos solo para sombras y toldo: corozo `#8A1F37` y caribe hondo `#106B73`. Texto en crema `#FFF1DC`.
3. **Letra picotera:** Lilita One en mayúsculas con relleno de color, primera capa blanca (contorno) y sombra en bloque de otro color. Clase `.picotera`, con `--c` (relleno) y `--s` (sombra).
4. **La explosión amarilla:** ahí va lo más importante. Clase `.explosion`.
5. **Eje al centro:** composición centrada, de lo más grande a lo más chico.
6. **Marco de fiesta:** estrellas, serpentinas y destellos, tupidos en los bordes y con capa blanca como la letra picotera. El centro queda limpio para el texto. Cada pieza está colocada a mano en `MARCOS` (js/main.js); nada de confeti al azar.

**El toldo.** El menú y el pie son la carpa del puesto de comida, el mismo toldo festoneado del sitio de pedidos, de un solo color: caribe hondo (`--toldo` en tokens.css). El festón lleva capa crema debajo.

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
- [ ] Validar identidad visual v1.3
- [ ] Nombre definitivo
- [ ] Historia de origen
- [ ] Plato costeño insignia
- [ ] Logo y personaje ilustrado
- [ ] Aplicar la marca a la web, empaques y DoorDash
