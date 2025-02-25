// Un callback es una función que se pasa como argumento a otra función y que se ejecuta después de que esa otra función haya completado su tarea. Es un mecanismo fundamental en JavaScript para manejar operaciones asíncronas o para ejecutar código en un orden específico, especialmente antes de que existieran promesas y async/await. Los callbacks permiten que una función "llame de vuelta" (callback) a otra cuando termina.
// Características

//     Asincronía: Los callbacks son comunes en operaciones que toman tiempo, como leer archivos, hacer peticiones HTTP o usar temporizadores (setTimeout).
//     Control de flujo: Garantizan que algo ocurra solo después de que otra cosa haya terminado.
//     Anidamiento: Pueden llevar a un problema llamado "callback hell" si se anidan demasiado.

// Ejemplo básico
// javascript
function saludar(nombre, callback) {
    console.log("Hola, " + nombre);
    callback(); // Llama al callback después
}

function despedirse() {
    console.log("Adiós!");
}

saludar("Ana", despedirse);
// Salida:
// "Hola, Ana"
// "Adiós!"

//     Aquí, despedirse es el callback que se ejecuta tras saludar.

// Relación con tu código

// En biblioteca.js, ya usas callbacks implícitamente en eventos como addEventListener (la función anónima es un callback que se ejecuta al hacer clic) y en leerArchivo (los manejadores onload y onerror son callbacks).
// Ejercicios sobre Callbacks

// A continuación, te doy cinco ejercicios para añadir o modificar funcionalidades en tu código usando callbacks. Incluyo la solución y una explicación para cada uno.
// Ejercicio 1: Callback para mostrar mensaje tras alta de libro

// Descripción:

// Modifica el evento altaLibroBoton.addEventListener para que acepte un callback que muestre el mensaje de éxito o error después de intentar dar de alta un libro, en lugar de manejarlo directamente dentro del evento.

// Solución:
// javascript
function altaLibro(isbn, autor, titulo, editorial, ejemplares, codLibro, callback) {
    const libroExistente = arrayLibros.find(libro => libro.codLibro === codLibro);
    if (!codLibro) {
        callback("El código del libro es obligatorio.", "red");
    } else if (libroExistente) {
        callback("El código del libro ya existe.", "red");
    } else {
        const nuevoLibro = new Libros(codLibro, isbn, autor, titulo, editorial, ejemplares);
        arrayLibros.push(nuevoLibro);
        callback(`¡Libro dado de alta con éxito! Código: ${nuevoLibro.codLibro}`, "green");
    }
}

altaLibroBoton.addEventListener('click', function() {
    const isbn = altaLibroIsbn.value;
    const autor = altaLibroAutor.value;
    const titulo = altaLibroTitulo.value;
    const editorial = altaLibroEditorial.value;
    const ejemplares = parseInt(altaLibroEjemplares.value);
    const codLibro = prompt("Escribe el código del libro: ");

    altaLibro(isbn, autor, titulo, editorial, ejemplares, codLibro, function(mensaje, color) {
        const mensajeAltaLibro = document.getElementById('mensaje-alta-libro') || document.createElement('div');
        mensajeAltaLibro.id = 'mensaje-alta-libro';
        mensajeAltaLibro.style.marginTop = '10px';
        mensajeAltaLibro.style.fontWeight = 'bold';
        mensajeAltaLibro.style.textAlign = 'center';
        mensajeAltaLibro.textContent = mensaje;
        mensajeAltaLibro.style.color = color;
        document.getElementById('alta-libro').insertBefore(mensajeAltaLibro, altaLibroBoton);
    });
});

// Explicación:

//     altaLibro: Toma los datos del libro y un callback como parámetros. Ejecuta la lógica y luego llama al callback con el mensaje y el color.
//     El callback en el evento muestra el resultado en la interfaz. Esto separa la lógica de alta de la presentación.

// Ejercicio 2: Callback para procesar archivo tras lectura

// Descripción:

// Modifica leerArchivo para que no use promesas, sino que acepte un callback para procesar el contenido del archivo una vez leído. Úsalo en importarBoton para importar libros.

// Solución:
// javascript
function leerArchivo(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => callback(null, e.target.result); // Éxito: pasa el contenido
    reader.onerror = (e) => callback(e, null); // Error: pasa el error
    reader.readAsText(file);
}

importarBoton.addEventListener('click', function() {
    const archivoLibros = document.getElementById('importar-input-libros').files[0];
    const mensajeImportacion = document.getElementById('mensaje-importacion') || document.createElement('div');
    mensajeImportacion.id = 'mensaje-importacion';
    mensajeImportacion.style.marginTop = '10px';
    document.getElementById('importar').insertBefore(mensajeImportacion, importarBoton);

    if (!archivoLibros) {
        mensajeImportacion.textContent = "No se seleccionó archivo de libros.";
        return;
    }

    mensajeImportacion.textContent = "Leyendo archivo...";
    leerArchivo(archivoLibros, function(error, contenido) {
        if (error) {
            mensajeImportacion.textContent = "Error al leer el archivo.";
            mensajeImportacion.style.color = 'red';
        } else {
            const lineas = contenido.split('\r\n').filter(linea => linea.trim() !== '');
            lineas.shift();
            arrayLibros.length = 0;
            lineas.forEach(linea => {
                const partes = linea.split(",");
                if (partes.length >= 6) arrayLibros.push(new Libros(...partes.slice(0, 6)));
            });
            mensajeImportacion.textContent = "Libros importados con éxito.";
            mensajeImportacion.style.color = 'green';
        }
    });
});

// Explicación:

//     leerArchivo: Ahora usa un callback con la convención (error, resultado) (primero error, luego dato), típica en Node.js.
//     El callback en importarBoton procesa el contenido o muestra un error, reemplazando la lógica de promesas.

// Ejercicio 3: Callback con retraso para actualizar tablas

// Descripción:

// Crea una función actualizarConRetraso(tabla, datos, callback) que simule un retraso de 1 segundo antes de actualizar una tabla (vista-libros-tabla o comprobar-lectores-tabla) y luego llame a un callback para notificar el resultado. Úsala en vista-libros-boton.

// Solución:
// javascript
function actualizarConRetraso(tabla, datos, callback) {
    setTimeout(() => {
        tabla.innerHTML = ''; // Limpiar tabla
        datos.forEach(item => {
            const row = tabla.insertRow();
            Object.values(item).forEach(valor => {
                const cell = row.insertCell();
                cell.textContent = valor;
            });
        });
        callback(null, "Tabla actualizada con éxito.");
    }, 1000);
}

vistaLibrosBoton.addEventListener('click', function() {
    const mensaje = document.createElement('div');
    mensaje.textContent = "Actualizando tabla...";
    vistaLibrosTabla.insertAdjacentElement('beforebegin', mensaje);

    actualizarConRetraso(vistaLibrosTabla.getElementsByTagName('tbody')[0], arrayLibros, function(error, resultado) {
        mensaje.textContent = error ? "Error al actualizar" : resultado;
        mensaje.style.color = error ? 'red' : 'green';
    });
});

// Explicación:

//     actualizarConRetraso: Usa setTimeout para simular un retraso y luego actualiza la tabla, llamando al callback con el resultado.
//     El evento muestra un mensaje intermedio y usa el callback para actualizar la interfaz tras la operación.

// Ejercicio 4: Callback para verificar préstamo antes de devolución

// Descripción:

// Crea una función verificarPrestamo(numSocio, codLibro, callback) que compruebe si existe un préstamo activo y llame a un callback con el resultado. Modifica devolucion-boton para usarla antes de procesar la devolución.

// Solución:
// javascript
function verificarPrestamo(numSocio, codLibro, callback) {
    setTimeout(() => { // Simula verificación asíncrona
        const prestamo = prestamosArray.find(p => p.numSocio === numSocio && p.codLibro === codLibro && !p.fechaDevolucion);
        if (!prestamo) callback(new Error("No hay préstamo activo."), null);
        else callback(null, prestamo);
    }, 500);
}

document.getElementById("devolucion-boton").addEventListener("click", function() {
    const numSocio = document.getElementById("devolucion-prestamo-socio").value;
    const codLibro = document.getElementById("devolucion-prestamo-libro").value;

    mostrarMensaje("Verificando préstamo...");

    verificarPrestamo(numSocio, codLibro, function(error, prestamo) {
        if (error) {
            mostrarMensaje(error.message);
        } else {
            prestamo.fechaDevolucion = new Date().toLocaleDateString('es-ES');
            const libro = arrayLibros.find(l => l.codLibro === codLibro);
            libro.ejemplares += 1;
            mostrarMensaje(`Devolución registrada. Número de préstamo: ${prestamo.numPrestamo}`);
        }
    });
});

// Explicación:

//     verificarPrestamo: Busca un préstamo activo con un retraso simulado y pasa el resultado al callback.
//     El evento usa el callback para decidir si procesar la devolución o mostrar un error, manteniendo la lógica separada.

// Ejercicio 5: Callback anidado para sincronizar datos

// Descripción:

// Crea una función sincronizarDatos(callback) que actualice secuencialmente arrayLibros y arrayLectores con un retraso simulado (500ms cada uno) y use callbacks anidados para notificar el progreso. Añade un botón "Sincronizar Datos" para ejecutarla.

// Solución:
// javascript
// Añadir botón al HTML
document.body.insertAdjacentHTML('beforeend', '<button id="sincronizar-datos">Sincronizar Datos</button>');

function sincronizarDatos(callback) {
    setTimeout(() => {
        console.log("Sincronizando libros..."); // Simula actualización
        callback(null, "Libros sincronizados", () => {
            setTimeout(() => {
                console.log("Sincronizando lectores...");
                callback(null, "Lectores sincronizados", () => {
                    callback(null, "Sincronización completa");
                });
            }, 500);
        });
    }, 500);
}

document.getElementById("sincronizar-datos").addEventListener("click", function() {
    const mensaje = document.createElement('div');
    document.body.appendChild(mensaje);

    sincronizarDatos(function(error, resultado, next) {
        if (error) {
            mensaje.textContent = "Error: " + error.message;
            mensaje.style.color = 'red';
        } else {
            mensaje.textContent = resultado;
            mensaje.style.color = 'green';
            if (next) next(); // Llama al siguiente callback si existe
        }
    });
});

// Explicación:

//     sincronizarDatos: Usa callbacks anidados para simular una sincronización en pasos (libros, luego lectores).
//     El evento muestra el progreso en la interfaz, avanzando al siguiente paso con next() si está definido. Esto muestra cómo los callbacks pueden encadenarse, aunque puede volverse complejo (callback hell).