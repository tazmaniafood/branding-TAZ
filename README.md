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
| `js/main.js` | Interacciones con delegación de eventos (`data-action`), estado en `data-state` / `aria-*` y código defensivo. |

## Identidad v0.6 · "Noche costeña"

- **Colores:** noche `#140F22` (base), hueso `#FBF6EC` (estructural), amarillo `#FFD60A` (único acento de acción), fucsia `#FF3D8B` y cian `#22D3EE` (solo decoración). Texto con contraste WCAG AA.
- **Letras:** Lilita One (letra de picó, títulos) + Nunito (lectura).
- **Adornos, "la fiesta que cae":** bolitas de confeti, serpentinas y banderines. En los bordes, máximo dos por pieza.

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
- [ ] Validar identidad visual v0.6
- [ ] Nombre definitivo
- [ ] Historia de origen
- [ ] Plato costeño insignia
- [ ] Logo y personaje ilustrado
- [ ] Aplicar la marca a la web, empaques y DoorDash
