# branding-TAZ

Guía de identidad de la comida rápida costeña en San José, California.
**"TAZ" es un nombre provisional**, solo para diferenciar el proyecto.

Abre `index.html` en el navegador (con internet, para que carguen las fuentes).

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La guía: alma, valores, personalidad, voz, públicos, identidad visual, aplicaciones, redes y pendientes. HTML semántico y accesible. |
| `css/tokens.css` | Tokens de marca y semánticos (`--bg-surface`, `--text-primary`, `--accent`, `--space-*`, `--step-*`, radios, sombras, movimiento y adornos). Úsalo en cualquier página del proyecto. |
| `css/styles.css` | Estilos de la guía, mobile-first, con tipografía y espacios fluidos (`clamp()`). |
| `img/logo-taz.png` | Logo actual (provisional), tomado de la web de pedidos. |
| `js/main.js` | Interacciones con delegación de eventos (`data-action`), estado en `data-state` / `aria-*` y código defensivo. |

## Identidad v0.7 · "Fiesta costeña"

Alineada con la web de pedidos (Frontend-consumidor): caricatura cálida de fast food.

- **Colores del antojo:** vino `#2A0A0A` (fondo), rojo `#E63312`, naranja `#F7941D` (acción), amarillo `#FFC933` (títulos), crema `#FFF3DC` (texto y tarjetas), tinta `#120303` (contornos y sombras). Verde `#7BD88F` solo para confirmar.
- **Letras:** Anton (títulos con contorno negro) + Nunito (lectura).
- **Estilo:** contorno tinta de 4 px y sombra dura en todo; tarjetas un poquito chuecas que se enderezan al pasar el mouse.
- **Lo costeño:** palabras, cinta de mamadera de gallo, banderines, explosión de cómic y medallones de comida. Todo animado (respeta "reducir movimiento").

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
- [ ] Validar identidad visual v0.7
- [ ] Nombre definitivo
- [ ] Historia de origen
- [ ] Plato costeño insignia
- [ ] Logo y personaje ilustrado
- [ ] Aplicar la marca a la web, empaques y DoorDash
