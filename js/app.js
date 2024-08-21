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

  productos.forEach(producto => {
    contenedorProductos.appendChild(producto.crearElementoProducto());
  });

  //Carrito ( Prompt. ALert y Confirm )

  let total = 0;

  function agregarAlCarrito(precio) {
    let cantidad = prompt("Ingrese la cantidad del producto:");
    let enNumero = Number(cantidad);

    if (Number.isInteger(enNumero) && enNumero > 0) {
      let confirmar = confirm("¿Desea agregar el producto al carrito?");
      if (confirmar) {
        let subtotal = enNumero * precio;
        total += subtotal;
        document.getElementById("total").textContent = total.toFixed(2);
        alert("El producto ha sido agregado al carrito");
      } else {
        alert("Producto no agregado al carrito");
      }
    } else {
      alert("Por favor, ingrese una cantidad válida");
    }
  }