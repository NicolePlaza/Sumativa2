// ---------------------------------------------
// app.js
// Eventos de la página e inicio
// ---------------------------------------------

// CLICK en "Agregar" (el evento va en el contenedor porque
// las tarjetas se crean después, con JavaScript)
document.getElementById('productos').addEventListener('click', e => {
  if (!e.target.classList.contains('btn-agregar')) return;

  const boton = e.target;
  agregarProducto(Number(boton.dataset.id));

  // pequeño aviso en el mismo botón
  boton.textContent = 'Agregado ✓';
  boton.classList.add('agregado');
  setTimeout(() => {
    boton.textContent = 'Agregar';
    boton.classList.remove('agregado');
  }, 1000);
});

// SUBMIT del buscador
document.getElementById('buscador').addEventListener('submit', e => {
  e.preventDefault(); // para que no se recargue la página

  busqueda = document.getElementById('texto-busqueda').value.trim();
  filtrarProductos();
  cerrarMenu();
});

// CLICK en las categorías del menú
document.getElementById('categorias').addEventListener('click', e => {
  const link = e.target.closest('[data-cat]');
  if (!link) return;
  e.preventDefault();

  document.querySelectorAll('#categorias .nav-link').forEach(l => l.classList.remove('active'));
  link.classList.add('active');

  categoriaElegida = link.dataset.cat;
  busqueda = '';
  document.getElementById('texto-busqueda').value = '';
  filtrarProductos();
  cerrarMenu();
});

// CLICK en los botones + y - del carrito
document.getElementById('lista-carrito').addEventListener('click', e => {
  if (e.target.dataset.sumar) agregarProducto(Number(e.target.dataset.sumar));
  if (e.target.dataset.restar) restarProducto(Number(e.target.dataset.restar));
});

document.getElementById('btn-vaciar').addEventListener('click', vaciarCarrito);

document.getElementById('btn-comprar').addEventListener('click', () => {
  alert('Compra simulada. ¡Gracias por comprar en Greda & Mimbre!');
  vaciarCarrito();
});

// En celular, cierra el menú desplegable después de elegir algo
function cerrarMenu() {
  const menu = document.getElementById('menu');
  if (menu.classList.contains('show')) {
    bootstrap.Collapse.getOrCreateInstance(menu).hide();
  }
}

// Al cargar la página
actualizarCarrito();
obtenerProductos();
