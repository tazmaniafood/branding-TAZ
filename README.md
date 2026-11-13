# branding-TAZ

Guía de identidad de marca de la comida rápida costeña en San José, CA.
**"TAZ" es un nombre provisional**, solo para diferenciar el proyecto.

## Qué hay aquí

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La guía de marca: esencia, valores, personalidad, voz, públicos e identidad visual. Ábrela en el navegador. |
| `css/tokens.css` | Variables de marca (colores, tipografías, bordes, sombras, espacios). Úsalas en cualquier página del proyecto. |
| `css/styles.css` | Estilos de la guía. |
| `js/main.js` | Interacciones de la guía (valores desplegables, selector de tono, copiar colores). |

## Cómo usar los tokens en otro proyecto

```html
<link rel="stylesheet" href="css/tokens.css">
```

```css
.boton-pedir {
  background: var(--color-picante);
  font-family: var(--font-display);
  border: var(--border-cartel);
  box-shadow: var(--shadow-cartel);
}
```

## Estado (v0.1)

- [x] Esencia, propósito y posicionamiento
- [x] Valores: Rebosao, Mamadera de gallo, De pura cepa, Más complaciente que na', De buen pecho
- [x] Personalidad y voz
- [x] Públicos
- [x] Rol de cada red: TikTok (volumen), Instagram (vitrina), Facebook (comunidad), WhatsApp (venta y recompra)
- [x] Identidad visual v0.2: fast food con alma costeña (rojo fogón, mostaza, negro plancha + fucsia picó y salsa rosada; Bowlby One + Rubik)
- [ ] Nombre definitivo
- [ ] Historia de origen
- [ ] Plato(s) costeño(s) insignia
- [ ] Logo y personaje ilustrado
- [ ] Validar paleta y tipografías v0.2
- [ ] Aplicaciones: web, empaques, redes, WhatsApp, DoorDash
