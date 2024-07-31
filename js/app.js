let total = 0;

function agregarAlCarrito(precio) {
    let cantidad = prompt("ingrese la cantidad del producto")
    let EnNumero = Number(cantidad)
    if (Number.isInteger(EnNumero)){
        let confirmar = confirm("¿Desea agregar el producto al carrito?")
        if (confirmar){
            precio = EnNumero * precio;
            total += precio;
            document.getElementById("total").textContent = total.toFixed(2);
            alert("el producto ha sido agregado al carrito")
        }
        else{
            alert("producto no agregado al carrito")
        }
    }
    else{
        alert("Por favor, ingrese una cantidad válida")
    }
    
}


