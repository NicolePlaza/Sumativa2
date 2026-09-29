# Greda & Mimbre

Tienda online de artículos de cocina, decoración y jardín.
Actividad sumativa Semana 6 - Desarrollo Frontend I (PFY2201).

**Sitio publicado:** 
## ¿Qué hace la página?

- Carga los productos desde `assets/data/productos.json` usando **Fetch API** y los muestra en tarjetas.
- La navbar tiene 3 categorías (Cocina, Decoración y Jardín) que filtran los productos.
- Tiene un buscador (evento **submit**) que filtra los productos por nombre.
- El botón "Agregar" (evento **click**) agrega productos al carrito. El carrito muestra la cantidad, se puedn sumar o restar unidades y calcula el total.
- Si el JSON no carga, aparece un mensaje de error con un botón para reintentar.
- Es responsiva: en celular el menú se contrae y el carrito se abre como panel lateral.

## Tecnologías

HTML, CSS, Bootstrap 5, Bootstrap Icons y JavaScript.

## Estructura

```
index.html
assets/
  css/estilos.css
  data/productos.json
  img/               imágenes de los productos
  js/productos.js    fetch y mostrar productos
  js/carrito.js      lógica del carrito
  js/app.js          eventos e inicio
```

## Cómo verlo en local

Abrir con Live Server en VS Code. Si se abre el `index.html` con doble clic, el fetch no funciona porque el navegador bloquea la lectura de archivos locales.
