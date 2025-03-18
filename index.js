// Array para almacenar los productos en el carrito
let carrito = [];

// Función para actualizar el contador de carrito en el encabezado
function actualizarCarritoCount() {
    const carritoCount = document.getElementById('carrito-count');
    carritoCount.textContent = carrito.length;
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto, precio) {
    // Crear un objeto con los datos del producto
    const item = { producto, precio };
    carrito.push(item);
    alert(`${producto} ha sido agregado al carrito.`);
    actualizarCarritoCount();
}

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    const carritoContainer = document.getElementById('carrito');
    carritoContainer.innerHTML = '<h2>Tu Carrito</h2>'; // Limpiar carrito

    if (carrito.length === 0) {
        carritoContainer.innerHTML += '<p>No tienes productos en el carrito.</p>';
    } else {
        carrito.forEach((item, index) => {
            carritoContainer.innerHTML += `
                <div class="carrito-item">
                    <p>${item.producto} - $${item.precio}</p>
                    <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
                </div>
            `;
        });
        carritoContainer.innerHTML += '<button>Finalizar Compra</button>';
    }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Elimina el producto en la posición index
    alert('Producto eliminado del carrito.');
    mostrarCarrito();
    actualizarCarritoCount();
}

// Agregar eventos a los botones de productos
document.querySelectorAll('.producto button').forEach((boton, index) => {
    boton.addEventListener('click', () => {
        // Cambia los detalles según el producto específico
        const producto = `Juego ${index + 1}`;
        const precio = (index + 1) * 40; // Precio ejemplo
        agregarAlCarrito(producto, precio);
    });
});

// Mostrar el carrito cuando se haga clic en el ícono del carrito
document.getElementById('carrito').addEventListener('click', mostrarCarrito);
