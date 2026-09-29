// ---------------------------------------------
// carrito.js
// Todo lo relacionado con el carrito de compras
// ---------------------------------------------

let carrito = [];

// Agrega un producto (si ya estaba, le suma 1 a la cantidad)
function agregarProducto(id) {
  const producto = listaProductos.find(p => p.id === id);
  if (!producto) return;

  const enCarrito = carrito.find(item => item.id === id);
  if (enCarrito) {
    enCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
}

// Resta 1 a la cantidad, y si queda en 0 lo saca del carrito
function restarProducto(id) {
  const item = carrito.find(item => item.id === id);
  if (!item) return;

  item.cantidad--;
  if (item.cantidad === 0) {
    carrito = carrito.filter(i => i.id !== id);
  }
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

// Vuelve a dibujar el resumen del carrito con el total
function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  let total = 0;
  let unidades = 0;

  if (carrito.length === 0) {
    lista.innerHTML = '<li class="text-muted small py-3">Todavía no agregas productos.</li>';
  } else {
    lista.innerHTML = '';

    carrito.forEach(item => {
      total += item.precio * item.cantidad;
      unidades += item.cantidad;

      const li = document.createElement('li');
      li.className = 'item-carrito d-flex align-items-center gap-2 py-2 border-bottom';
      li.innerHTML = `
        <img src="${item.img}" alt="">
        <div class="flex-grow-1 small">
          ${item.nombre}<br>
          <span class="text-muted">${formatoPesos(item.precio * item.cantidad)}</span>
        </div>
        <div class="btn-group btn-group-sm">
          <button class="btn btn-outline-secondary" data-restar="${item.id}">-</button>
          <span class="btn btn-light disabled">${item.cantidad}</span>
          <button class="btn btn-outline-secondary" data-sumar="${item.id}">+</button>
        </div>`;
      lista.appendChild(li);
    });
  }

  document.getElementById('total').textContent = formatoPesos(total);
  document.querySelectorAll('.cantidad-carrito').forEach(el => el.textContent = unidades);

  // si no hay nada no se puede pagar ni vaciar
  document.getElementById('btn-comprar').disabled = carrito.length === 0;
  document.getElementById('btn-vaciar').disabled = carrito.length === 0;
}
