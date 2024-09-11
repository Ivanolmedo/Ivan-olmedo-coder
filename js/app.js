// Constructor de Objetos para el catalogo
class Producto {
  constructor(nombre, precio, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }

  crearElementoProducto() {
    const div = document.createElement('div');

    const img = document.createElement('img');
    img.classList.add('producto');
    img.src = this.imagen;
    img.alt = this.nombre;

    const nombreP = document.createElement('p');
    nombreP.textContent = this.nombre;

    const precioP = document.createElement('p');
    precioP.textContent = this.precio;

    const boton = document.createElement('button');
    boton.textContent = 'Agregar producto';
    boton.addEventListener('click', () => agregarAlCarrito(this.precio));

    div.appendChild(img);
    div.appendChild(nombreP);
    div.appendChild(precioP);
    div.appendChild(boton);

    return div;
  }
}

const productos = [
  new Producto('Torta Mozart', 10000, '../assets/img/producto1.jpg'),
  new Producto('Torta Milhojas', 10000, '../assets/img/producto2.jpg'),
  new Producto('Oreo Berries', 3000, '../assets/img/producto3.jpg'),
  new Producto('Torta Berries', 2500, '../assets/img/producto4.jpg'),
  new Producto('Torta Oreo', 3000, '../assets/img/producto5.jpg'),
  new Producto('Torta Milhojas', 3000, '../assets/img/producto6.jpg'),
  new Producto('Torta', 3000, '../assets/img/producto7.jpg'),
  new Producto('Cupcakes', 2000, '../assets/img/producto8.jpg'),
  new Producto('Torta cumpleaños', 10000, '../assets/img/producto9.jpg')
];

const contenedorProductos = document.getElementById('productos');

function mostrarProductos(filtrados) {
  contenedorProductos.innerHTML = '';
  filtrados.forEach(producto => {
    contenedorProductos.appendChild(producto.crearElementoProducto());
  });
}

function agregarAlCarrito(precio) {
  try {
    // Solicitar cantidad del producto usando SweetAlert
    Swal.fire({
      title: 'Ingrese la cantidad del producto',
      input: 'number',
      inputAttributes: {
        min: 1,
        step: 1
      },
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        let cantidadEnNumero = Number(result.value);
        if (!Number.isInteger(cantidadEnNumero) || cantidadEnNumero <= 0) {
          throw new Error("Cantidad no válida. Por favor ingrese un número entero mayor que 0.");
        }

        // Confirmar si se desea agregar al carrito
        Swal.fire({
          title: '¿Desea agregar el producto al carrito?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Sí',
          cancelButtonText: 'No'
        }).then((confirmResult) => {
          if (confirmResult.isConfirmed) {
            let precioTotal = cantidadEnNumero * precio;
            total += precioTotal;
            document.getElementById("total").textContent = total.toFixed(2);

            // Mostrar alerta de éxito
            Swal.fire({
              title: 'Producto agregado',
              text: 'El producto ha sido agregado al carrito',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
          } else {
            // Mostrar alerta de cancelación
            Swal.fire({
              title: 'Producto no agregado',
              text: 'El producto no ha sido agregado al carrito',
              icon: 'info',
              timer: 1500,
              showConfirmButton: false
            });
          }
        });
      }
    });
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: error.message,
      icon: 'error'
    });
  } finally {
    console.log("Proceso de agregar al carrito finalizado.");
  }
}

// Mostrar todos los productos inicialmente
mostrarProductos(productos);

// Filtrar productos según la barra de búsqueda
document.getElementById('busqueda').addEventListener('input', (e) => {
  const termino = e.target.value.toLowerCase();
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(termino)
  );
  mostrarProductos(productosFiltrados);
});

let total = 0;