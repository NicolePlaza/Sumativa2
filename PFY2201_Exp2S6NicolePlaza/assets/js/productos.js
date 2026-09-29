// ---------------------------------------------
// productos.js
// Carga los productos del JSON y los muestra
// ---------------------------------------------

let listaProductos = [];      // aquí quedan los productos que llegan del JSON
let categoriaElegida = 'todas';
let busqueda = '';

const titulosCategoria = {
  todas: 'Todos los productos',
  cocina: 'Cocina',
  deco: 'Decoración',
  jardin: 'Jardín'
};

// Pasa un número a formato de pesos chilenos, ej: 18990 -> $18.990
function formatoPesos(numero) {
  return '$' + numero.toLocaleString('es-CL');
}

// Pide los productos al archivo JSON usando fetch
async function obtenerProductos() {
  const cargando = document.getElementById('cargando');
  cargando.style.display = 'block';

  try {
    const respuesta = await fetch('assets/data/productos.json');

    // fetch no da error si el archivo no existe (404), hay que revisarlo a mano
    if (!respuesta.ok) {
      throw new Error('Respuesta del servidor: ' + respuesta.status);
    }

    const datos = await respuesta.json();

    if (!Array.isArray(datos) || datos.length === 0) {
      throw new Error('El JSON no trae productos');
    }

    listaProductos = datos;
    document.getElementById('mensaje').innerHTML = '';
    filtrarProductos();

  } catch (error) {
    console.error(error);
    mostrarErrorCarga();
  } finally {
    cargando.style.display = 'none';
  }
}

// Mensaje para el usuario cuando no se pudieron cargar los productos
function mostrarErrorCarga() {
  document.getElementById('mensaje').innerHTML = `
    <div class="alert alert-danger">
      <strong>No pudimos mostrar los productos.</strong>
      Puede ser un problema de conexión, intenta de nuevo en unos minutos.
      <button class="btn btn-sm btn-outline-danger ms-2" id="btn-reintentar">Reintentar</button>
    </div>`;

  document.getElementById('btn-reintentar').addEventListener('click', obtenerProductos);
}

// Dibuja las tarjetas de los productos en la página
function mostrarProductos(productos) {
  const contenedor = document.getElementById('productos');
  contenedor.innerHTML = '';

  productos.forEach(producto => {
    const columna = document.createElement('div');
    columna.className = 'col';
    columna.innerHTML = `
      <div class="producto h-100 d-flex flex-column">
        <img src="${producto.img}" class="img-fluid" alt="${producto.nombre}">
        <div class="p-2 p-md-3 d-flex flex-column flex-grow-1">
          <h3 class="h6 mb-1">${producto.nombre}</h3>
          <p class="small text-muted mb-2 d-none d-md-block">${producto.detalle}</p>
          <p class="precio mt-auto mb-2">${formatoPesos(producto.precio)}</p>
          <button class="btn btn-sm btn-agregar" data-id="${producto.id}">Agregar</button>
        </div>
      </div>`;
    contenedor.appendChild(columna);
  });
}

// Filtra por categoría y por lo que se escribió en el buscador
function filtrarProductos() {
  const texto = busqueda.toLowerCase();

  const resultado = listaProductos.filter(p => {
    const mismaCategoria = categoriaElegida === 'todas' || p.categoria === categoriaElegida;
    const coincide = p.nombre.toLowerCase().includes(texto);
    return mismaCategoria && coincide;
  });

  // título de la sección según el filtro
  const titulo = document.getElementById('titulo-seccion');
  titulo.textContent = busqueda
    ? `Resultados para "${busqueda}"`
    : titulosCategoria[categoriaElegida];

  mostrarProductos(resultado);

  const mensaje = document.getElementById('mensaje');
  if (resultado.length === 0) {
    mensaje.innerHTML = '<div class="alert alert-warning">No encontramos productos con esa búsqueda.</div>';
  } else {
    mensaje.innerHTML = '';
  }
}
