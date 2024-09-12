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

// Fetch para obtener productos desde la API JSONPlaceholder (simulando un archivo JSON)
function cargarProductos() {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => {
      // Crear productos dinámicamente basados en los datos recibidos
      const productosCargados = json.slice(0, 9).map(item => {
        return new Producto(`Producto ${item.id}`, item.userId * 1000, '../assets/img/producto1.jpg');
      });
      mostrarProductos(productosCargados);
    })
    .catch(error => {
      console.error('Error al cargar productos:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron cargar los productos',
        icon: 'error'
      });
    });
}

// Filtrar productos según la barra de búsqueda
document.getElementById('busqueda').addEventListener('input', (e) => {
  const termino = e.target.value.toLowerCase();
  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(termino)
  );
  mostrarProductos(productosFiltrados);
});

let total = 0;

// Llamada para cargar los productos al cargar la página
cargarProductos();