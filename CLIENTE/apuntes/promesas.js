// ===============================
// 📌 Apuntes sobre Promesas en JavaScript
// ===============================

// 🔹 ¿Qué es una Promesa?
// Una promesa es un objeto que representa una operación asincrónica.
// Puede estar en tres estados: pendiente (pending), resuelta (fulfilled) o rechazada (rejected).

// 🔹 Creación de una Promesa
const miPromesa = new Promise((resolve, reject) => {
    let exito = true; // Simula si la operación es exitosa o no
    if (exito) {
        resolve("¡Operación exitosa!"); // Resuelve la promesa
    } else {
        reject("Ocurrió un error"); // Rechaza la promesa
    }
});

// 🔹 Consumiendo una Promesa con .then() y .catch()
miPromesa
    .then(resultado => {
        console.log("Éxito:", resultado); 
    })
    .catch(error => {
        console.error("Error:", error);
    })
    .finally(() => {
        console.log("Proceso finalizado");
    });

// 🔹 Promesas con setTimeout (simulación de operación asincrónica)
const tareaAsincrona = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Datos obtenidos después de 2 segundos");
    }, 2000);
});

tareaAsincrona.then(console.log);

// 🔹 Uso de async / await para manejar Promesas
async function obtenerDatos() {
    try {
        const resultado = await tareaAsincrona;
        console.log(resultado);
    } catch (error) {
        console.error("Error:", error);
    }
}
obtenerDatos();

// 🔹 Métodos útiles con Promesas
// 1️⃣ Promise.all() - Espera a que todas las promesas se resuelvan
Promise.all([
    fetch("https://api1.com"),
    fetch("https://api2.com")
])
.then(respuestas => console.log("Todas resueltas", respuestas))
.catch(error => console.error("Error en alguna promesa", error));

// 2️⃣ Promise.race() - Retorna la primera promesa que se resuelva o rechace
Promise.race([
    fetch("https://api1.com"),
    fetch("https://api2.com")
])
.then(resultado => console.log("Primera en responder", resultado));

// 3️⃣ Promise.allSettled() - Espera a que todas las promesas terminen
Promise.allSettled([
    Promise.resolve("Éxito"),
    Promise.reject("Fallo")
])
.then(resultados => console.log(resultados));

// ===============================
// 📌 Ejercicios de Promesas en JavaScript
// ===============================

// 1️⃣ Crea una promesa que se resuelva después de 3 segundos y devuelva el mensaje "Promesa resuelta".
const ejercicio1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Promesa resuelta");
    }, 3000);
});

ejercicio1.then(console.log);

// 2️⃣ Crea una función async que use await para esperar la resolución de una promesa que se resuelve en 2 segundos.
async function ejercicio2() {
    const resultado = await new Promise(resolve => setTimeout(() => resolve("Ejercicio 2 completado"), 2000));
    console.log(resultado);
}
ejercicio2();

// 3️⃣ Crea una función que devuelva una promesa y use .then() para manejar su resultado.
function ejercicio3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Ejercicio 3: Promesa resuelta");
        }, 1500);
    });
}

ejercicio3().then(console.log);

// 4️⃣ Usa Promise.all() para ejecutar dos promesas en paralelo y mostrar el resultado cuando ambas se resuelvan.
Promise.all([
    new Promise(resolve => setTimeout(() => resolve("Primera promesa"), 1000)),
    new Promise(resolve => setTimeout(() => resolve("Segunda promesa"), 2000))
])
.then(resultados => console.log("Ejercicio 4 resultados:", resultados));

//---------------------------------------------------------

// Ejercicio 1: Validación asíncrona de ISBN antes de dar de alta un libro

// Descripción:

// Modifica el evento altaLibroBoton.addEventListener para que, antes de dar de alta un libro, cree una promesa que simule una validación asíncrona del ISBN (por ejemplo, esperando 1 segundo como si consultara una base de datos). Si el ISBN tiene menos de 10 caracteres, rechaza la promesa; si no, resuélvela con éxito.

// Solución:
// javascript
altaLibroBoton.addEventListener('click', function() {
    let isbn = altaLibroIsbn.value;
    let autor = altaLibroAutor.value;
    let titulo = altaLibroTitulo.value;
    let editorial = altaLibroEditorial.value;
    let ejemplares = parseInt(altaLibroEjemplares.value);
    let codLibro = prompt("Escribe el código del libro: ");

    let mensajeAltaLibro = document.getElementById('mensaje-alta-libro') || document.createElement('div');
    mensajeAltaLibro.id = 'mensaje-alta-libro';
    mensajeAltaLibro.style.marginTop = '10px';
    mensajeAltaLibro.style.fontWeight = 'bold';
    mensajeAltaLibro.style.textAlign = 'center';

    // Promesa para validar ISBN
    const validarISBN = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isbn.length < 10) {
                reject(new Error("El ISBN debe tener al menos 10 caracteres."));
            } else {
                resolve("ISBN válido");
            }
        }, 1000); // Simula espera de 1 segundo
    });

    mensajeAltaLibro.textContent = "Validando ISBN...";
    document.getElementById('alta-libro').insertBefore(mensajeAltaLibro, altaLibroBoton);

    validarISBN
        .then(resultado => {
            if (!codLibro) throw new Error("El código del libro es obligatorio.");
            let libroExistente = arrayLibros.find(libro => libro.codLibro === codLibro);
            if (libroExistente) throw new Error("El código del libro ya existe.");

            let nuevoLibro = new Libros(codLibro, isbn, autor, titulo, editorial, ejemplares);
            arrayLibros.push(nuevoLibro);
            mensajeAltaLibro.textContent = `¡Libro dado de alta con éxito! Código: ${nuevoLibro.codLibro}`;
            mensajeAltaLibro.style.color = 'green';
        })
        .catch(error => {
            mensajeAltaLibro.textContent = error.message;
            mensajeAltaLibro.style.color = 'red';
        });
});

// Explicación:

// Creo una promesa validarISBN que simula una validación asíncrona con setTimeout. Si el ISBN es válido (>= 10 caracteres), se resuelve; si no, se rechaza. Uso then para continuar con la lógica de alta y catch para mostrar errores. Mientras se valida, muestro un mensaje temporal.
// Ejercicio 2: Importación paralela de libros y lectores con Promise.all

// Descripción:

// Modifica el evento importarBoton.addEventListener para usar Promise.all y leer ambos archivos (libros y lectores) en paralelo. Si ambos se importan con éxito, muestra un mensaje de éxito; si alguno falla, muestra el error específico.

// Solución:
// javascript
importarBoton.addEventListener('click', function() {
    let archivoLibros = document.getElementById('importar-input-libros').files[0];
    let archivoLectores = document.getElementById('importar-input-lectores').files[0];
    
    let mensajeImportacion = document.getElementById('mensaje-importacion') || document.createElement('div');
    mensajeImportacion.id = 'mensaje-importacion';
    mensajeImportacion.style.marginTop = '10px';
    mensajeImportacion.style.fontWeight = 'bold';
    mensajeImportacion.style.textAlign = 'center';
    document.getElementById('importar').insertBefore(mensajeImportacion, importarBoton.nextSibling);

    const promesas = [];
    if (archivoLibros) promesas.push(leerArchivo(archivoLibros));
    if (archivoLectores) promesas.push(leerArchivo(archivoLectores));

    if (promesas.length === 0) {
        mensajeImportacion.textContent = "No se seleccionaron archivos.";
        mensajeImportacion.style.color = 'red';
        return;
    }

    mensajeImportacion.textContent = "Importando archivos...";
    Promise.all(promesas)
        .then(([contenidoLibros, contenidoLectores]) => {
            if (contenidoLibros) {
                const lineas = contenidoLibros.split('\r\n').filter(linea => linea.trim() !== '');
                lineas.shift();
                arrayLibros.length = 0;
                lineas.forEach(linea => {
                    const partes = linea.split(",");
                    if (partes.length >= 6) arrayLibros.push(new Libros(...partes.slice(0, 6)));
                });
            }
            if (contenidoLectores) {
                const lineas = contenidoLectores.split('\r\n').filter(linea => linea.trim() !== '');
                lineas.shift();
                arrayLectores.length = 0;
                lineas.forEach(linea => {
                    const partes = linea.split(",");
                    if (partes.length >= 5) arrayLectores.push(new Lectores(...partes.slice(0, 5)));
                });
            }
            mensajeImportacion.textContent = "Importación completada con éxito.";
            mensajeImportacion.style.color = 'green';
        })
        .catch(error => {
            mensajeImportacion.textContent = `Error al importar: ${error.message}`;
            mensajeImportacion.style.color = 'red';
        });
});

// Explicación:

// Uso Promise.all para ejecutar las promesas de leerArchivo en paralelo. Los resultados llegan como un array [contenidoLibros, contenidoLectores]. Proceso cada archivo si existe y manejo errores globalmente con catch.
// Ejercicio 3: Encadenamiento de promesas para verificar préstamos disponibles

// Descripción:

// Añade una nueva función verificarEjemplaresDisponibles(codLibro) que devuelva una promesa. Si hay ejemplares disponibles (> 0), resuelve la promesa; si no, la rechaza. Encadena esta verificación en el evento prestamo-boton antes de registrar el préstamo.

// Solución:
// javascript
function verificarEjemplaresDisponibles(codLibro) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { // Simula una consulta asíncrona
            const libro = arrayLibros.find(libro => libro.codLibro === codLibro);
            if (!libro) reject(new Error("Libro no encontrado."));
            else if (libro.ejemplares > 0) resolve("Ejemplares disponibles.");
            else reject(new Error("No hay ejemplares disponibles."));
        }, 500); // 0.5 segundos de espera
    });
}

document.getElementById("prestamo-boton").addEventListener("click", function() {
    const numSocio = document.getElementById("devolucion-prestamo-socio").value;
    const codLibro = document.getElementById("devolucion-prestamo-libro").value;

    mostrarMensaje("Verificando disponibilidad...");
    
    verificarEjemplaresDisponibles(codLibro)
        .then(() => solicitudPrestamo(numSocio, codLibro)) // Si hay ejemplares, solicita el préstamo
        .then(resultado => {
            mostrarMensaje(`${resultado}. Número de préstamo: ${resultado.numPrestamo}. Fecha de préstamo: ${resultado.fechaPrestamo}`);
        })
        .catch(error => {
            mostrarMensaje(`Error: ${error.message}`);
        });
});

// Explicación:

// Creo una promesa que verifica la disponibilidad de ejemplares con un retraso simulado. La encadeno con solicitudPrestamo usando then, y uso catch para manejar errores como falta de ejemplares o libro no encontrado.
// Ejercicio 4: Uso de finally() para limpiar la interfaz

// Descripción:

// Modifica el evento devolucion-boton para que use una promesa en devolucionPrestamo y añada finally() para limpiar los campos de entrada ("Nº de socio" y "Código de libro") independientemente de si la devolución tiene éxito o falla.

// Solución:
// javascript
function devolucionPrestamo(numSocio, codLibro) {
    return new Promise((resolve, reject) => {
        const lector = arrayLectores.find(l => l.numSocio === numSocio);
        const libro = arrayLibros.find(l => l.codLibro === codLibro);
        const prestamo = prestamosArray.find(p => p.numSocio === numSocio && p.codLibro === codLibro);

        if (!lector) reject(new Error("Lector no encontrado."));
        else if (!libro) reject(new Error("Libro no encontrado."));
        else if (!prestamo) reject(new Error("No existe un préstamo con esos datos."));
        else {
            prestamo.fechaDevolucion = new Date().toLocaleDateString('es-ES');
            libro.ejemplares += 1;
            resolve(`Devolución registrada correctamente. Número de préstamo: ${prestamo.numPrestamo}`);
        }
    });
}

document.getElementById("devolucion-boton").addEventListener("click", function() {
    const numSocio = document.getElementById("devolucion-prestamo-socio").value;
    const codLibro = document.getElementById("devolucion-prestamo-libro").value;

    devolucionPrestamo(numSocio, codLibro)
        .then(resultado => {
            mostrarMensaje(resultado);
        })
        .catch(error => {
            mostrarMensaje(`Error: ${error.message}`);
        })
        .finally(() => {
            document.getElementById("devolucion-prestamo-socio").value = "";
            document.getElementById("devolucion-prestamo-libro").value = "";
        });
});

// Explicación:

// Convierto devolucionPrestamo en una promesa que resuelve o rechaza según las validaciones. Uso finally() para limpiar los campos de entrada al final, ocurra lo que ocurra.
// Ejercicio 5: Simulación de guardado en servidor con Promise.race

// Descripción:

// Añade una función guardarEnServidor() que simule guardar arrayLibros en un servidor con una promesa que puede tardar entre 1 y 3 segundos. Usa Promise.race en el evento vista-libros-boton para competir con un temporizador de 2 segundos; si el guardado no termina a tiempo, muestra un mensaje de "timeout".

// Solución:
// javascript
function guardarEnServidor() {
    return new Promise((resolve, reject) => {
        const tiempo = Math.floor(Math.random() * 2000) + 1000; // Entre 1 y 3 segundos
        setTimeout(() => {
            if (arrayLibros.length === 0) reject(new Error("No hay libros para guardar."));
            else resolve("Libros guardados en el servidor.");
        }, tiempo);
    });
}

function timeout(ms) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Tiempo de espera agotado.")), ms);
    });
}

vistaLibrosBoton.addEventListener('click', function() {
    const mensaje = document.createElement('div');
    mensaje.textContent = "Guardando en servidor...";
    vistaLibrosTabla.insertAdjacentElement('afterend', mensaje);

    Promise.race([guardarEnServidor(), timeout(2000)])
        .then(resultado => {
            mensaje.textContent = resultado;
            mensaje.style.color = 'green';
            actualizarVistaLibros();
        })
        .catch(error => {
            mensaje.textContent = error.message;
            mensaje.style.color = 'red';
        });
});

// Explicación:

//     guardarEnServidor: Simula un guardado con tiempo aleatorio.
//     timeout: Rechaza la promesa si pasan 2 segundos.
//     Promise.race: Ejecuta ambas promesas y toma el resultado de la primera que termine. Si el guardado tarda más de 2 segundos, muestra "timeout"; si no, actualiza la tabla tras el éxito.

// Ejercicio 6: Verificación asíncrona de lector antes de préstamo

// Descripción:

// Crea una función verificarLectorActivo(numSocio) que devuelva una promesa para comprobar si un lector está activo (propiedad activo === true). Simula una consulta asíncrona con un retraso de 800ms. Modifica el evento prestamo-boton para usar esta promesa antes de procesar el préstamo y muestra mensajes de estado en la interfaz.

// Solución:
// javascript
function verificarLectorActivo(numSocio) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const lector = arrayLectores.find(l => l.numSocio === numSocio);
            if (!lector) reject(new Error("Lector no encontrado."));
            else if (!lector.activo) reject(new Error("El lector no está activo."));
            else resolve("Lector activo y listo para préstamo.");
        }, 800); // Retraso de 800ms
    });
}

document.getElementById("prestamo-boton").addEventListener("click", function() {
    const numSocio = document.getElementById("devolucion-prestamo-socio").value;
    const codLibro = document.getElementById("devolucion-prestamo-libro").value;

    mostrarMensaje("Verificando lector...");

    verificarLectorActivo(numSocio)
        .then(() => {
            mostrarMensaje("Lector verificado, procesando préstamo...");
            return solicitudPrestamo(numSocio, codLibro); // Encadenamos el préstamo
        })
        .then(resultado => {
            mostrarMensaje(`${resultado}. Número de préstamo: ${resultado.numPrestamo}. Fecha de préstamo: ${resultado.fechaPrestamo}`);
        })
        .catch(error => {
            mostrarMensaje(`Error: ${error.message}`);
        });
});

// Explicación:

//     verificarLectorActivo: Simula una verificación asíncrona del estado del lector.
//     En el evento del botón "Préstamo", uso la promesa y encadeno solicitudPrestamo solo si el lector está activo. Actualizo mensajes en cada etapa para reflejar el progreso o errores.

// Ejercicio 7: Confirmación asíncrona de alta de libro con Promise.resolve

// Descripción:

// Modifica el evento altaLibroBoton.addEventListener para que, después de validar el ISBN (como en el Ejercicio 1), use Promise.resolve para simular una confirmación inmediata del alta si no hay errores previos. Si el usuario cancela un confirm antes de completar el alta, rechaza la promesa con un mensaje.

// Solución:
// javascript
altaLibroBoton.addEventListener('click', function() {
    let isbn = altaLibroIsbn.value;
    let autor = altaLibroAutor.value;
    let titulo = altaLibroTitulo.value;
    let editorial = altaLibroEditorial.value;
    let ejemplares = parseInt(altaLibroEjemplares.value);
    let codLibro = prompt("Escribe el código del libro: ");

    let mensajeAltaLibro = document.getElementById('mensaje-alta-libro') || document.createElement('div');
    mensajeAltaLibro.id = 'mensaje-alta-libro';
    mensajeAltaLibro.style.marginTop = '10px';
    mensajeAltaLibro.style.fontWeight = 'bold';
    mensajeAltaLibro.style.textAlign = 'center';
    document.getElementById('alta-libro').insertBefore(mensajeAltaLibro, altaLibroBoton);

    const validarISBN = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (isbn.length < 10) reject(new Error("El ISBN debe tener al menos 10 caracteres."));
            else resolve("ISBN válido");
        }, 1000);
    });

    mensajeAltaLibro.textContent = "Validando ISBN...";

    validarISBN
        .then(() => {
            if (!codLibro) throw new Error("El código del libro es obligatorio.");
            if (!confirm("¿Confirmas el alta del libro?")) throw new Error("Alta cancelada por el usuario.");
            return Promise.resolve({ codLibro, isbn, autor, titulo, editorial, ejemplares });
        })
        .then(datos => {
            let libroExistente = arrayLibros.find(libro => libro.codLibro === datos.codLibro);
            if (libroExistente) throw new Error("El código del libro ya existe.");
            let nuevoLibro = new Libros(datos.codLibro, datos.isbn, datos.autor, datos.titulo, datos.editorial, datos.ejemplares);
            arrayLibros.push(nuevoLibro);
            mensajeAltaLibro.textContent = `¡Libro dado de alta! Código: ${nuevoLibro.codLibro}`;
            mensajeAltaLibro.style.color = 'green';
        })
        .catch(error => {
            mensajeAltaLibro.textContent = error.message;
            mensajeAltaLibro.style.color = 'red';
        });
});

// Explicación:

//     Uso Promise.resolve para devolver inmediatamente los datos del libro si el usuario confirma el alta.
//     Si el usuario cancela el confirm, lanzo un error con throw, que es capturado por catch. Esto simula una operación asíncrona simple tras la validación del ISBN.

// Ejercicio 8: Retraso en actualización de tablas con Promise chaining

// Descripción:

// Modifica los eventos vista-libros-boton y comprobar-lectores-boton para que usen una función retrasarActualizacion(ms) que devuelva una promesa que retrase la actualización de las tablas (por ejemplo, 1 segundo). Encadena esta promesa para mostrar un mensaje de "Preparando datos..." antes de actualizar.

// Solución:
// javascript
function retrasarActualizacion(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve("Datos preparados"), ms);
    });
}

vistaLibrosBoton.addEventListener('click', function() {
    const mensaje = document.createElement('div');
    mensaje.textContent = "Preparando datos...";
    vistaLibrosTabla.insertAdjacentElement('beforebegin', mensaje);

    retrasarActualizacion(1000)
        .then(() => {
            mensaje.remove();
            actualizarVistaLibros();
        })
        .catch(error => {
            mensaje.textContent = `Error: ${error.message}`;
            mensaje.style.color = 'red';
        });
});

comprobarLectoresBoton.addEventListener('click', function() {
    const mensaje = document.createElement('div');
    mensaje.textContent = "Preparando datos...";
    vistaLectoresTabla.insertAdjacentElement('beforebegin', mensaje);

    retrasarActualizacion(1000)
        .then(() => {
            mensaje.remove();
            actualizarVistaLectores();
        })
        .catch(error => {
            mensaje.textContent = `Error: ${error.message}`;
            mensaje.style.color = 'red';
        });
});

// Explicación:

//     retrasarActualizacion: Devuelve una promesa que se resuelve tras un retraso (1 segundo aquí).
//     En cada evento, muestro un mensaje temporal y encadeno la actualización de la tabla con then. Aunque no hay rechazos en este caso, incluyo catch por buena práctica.

// Ejercicio 9: Simulación de baja de lector con Promise.reject

// Descripción:

// Añade una función darDeBajaLector(numSocio) que devuelva una promesa para dar de baja a un lector (usando darDeBaja). Si el lector no existe o ya está inactivo, usa Promise.reject. Integra esta función en un nuevo botón "Baja Lector" en la sección "Vista lectores".

// Solución:
// javascript
// Añadir botón al HTML (podrías hacerlo dinámicamente también)
document.getElementById('vista-lectores').insertAdjacentHTML('beforeend', 
    '<button id="baja-lector-boton">Baja Lector</button>'
);

function darDeBajaLector(numSocio) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { // Simula operación asíncrona
            const lector = arrayLectores.find(l => l.numSocio === numSocio);
            if (!lector) reject(new Error("Lector no encontrado."));
            else if (!lector.activo) reject(new Error("El lector ya está dado de baja."));
            else {
                lector.darDeBaja();
                resolve(`Lector ${numSocio} dado de baja con éxito. Fecha: ${lector.fechaBaja}`);
            }
        }, 600); // Retraso de 600ms
    });
}

document.getElementById('baja-lector-boton').addEventListener('click', function() {
    const numSocio = prompt("Introduce el número de socio:");
    if (!numSocio) return;

    const mensaje = document.createElement('div');
    mensaje.textContent = "Procesando baja...";
    document.getElementById('vista-lectores').appendChild(mensaje);

    darDeBajaLector(numSocio)
        .then(resultado => {
            mensaje.textContent = resultado;
            mensaje.style.color = 'green';
            actualizarVistaLectores(); // Refrescar la tabla
        })
        .catch(error => {
            mensaje.textContent = `Error: ${error.message}`;
            mensaje.style.color = 'red';
        });
});

// Explicación:

//     darDeBajaLector: Usa Promise.reject para errores y resuelve con éxito al dar de baja.
//     Añado un botón y un evento que pide el número de socio, ejecuta la promesa y actualiza la interfaz según el resultado.

// Ejercicio 10: Sincronización de préstamos con Promise.allSettled

// Descripción:

// Crea una función sincronizarPrestamos() que use Promise.allSettled para verificar asíncronamente todos los préstamos vivos (prestamosArrayVivos) y asegurarse de que los libros asociados existan y tengan ejemplares disponibles. Muestra un informe de estado al hacer clic en un nuevo botón "Sincronizar Préstamos".

// Solución:
// javascript
// Añadir botón al HTML
document.getElementById('devolucion-prestamo').insertAdjacentHTML('beforeend', 
    '<button id="sincronizar-prestamos-boton">Sincronizar Préstamos</button>'
);

function verificarPrestamo(prestamo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const libro = arrayLibros.find(l => l.codLibro === prestamo.codLibro);
            if (!libro) reject(new Error(`Libro ${prestamo.codLibro} no encontrado.`));
            else if (libro.ejemplares < 0) reject(new Error(`Ejemplares negativos en ${prestamo.codLibro}.`));
            else resolve(`Préstamo ${prestamo.numPrestamo} válido.`);
        }, 400); // Retraso de 400ms por préstamo
    });
}

function sincronizarPrestamos() {
    const promesas = prestamosArrayVivos.map(prestamo => verificarPrestamo(prestamo));
    return Promise.allSettled(promesas);
}

document.getElementById('sincronizar-prestamos-boton').addEventListener('click', function() {
    const mensaje = document.createElement('div');
    mensaje.textContent = "Sincronizando préstamos...";
    document.getElementById('devolucion-prestamo').appendChild(mensaje);

    sincronizarPrestamos()
        .then(resultados => {
            const informe = resultados.map((result, i) => {
                return result.status === 'fulfilled' 
                    ? `${i + 1}. ${result.value}`
                    : `${i + 1}. Error: ${result.reason.message}`;
            }).join('\n');
            mensaje.textContent = `Informe de sincronización:\n${informe}`;
            mensaje.style.color = resultados.every(r => r.status === 'fulfilled') ? 'green' : 'red';
        });
});

// Explicación:

//     verificarPrestamo: Promesa que valida un préstamo individual.
//     sincronizarPrestamos: Usa Promise.allSettled para ejecutar todas las verificaciones, devolviendo un array con el estado de cada promesa (cumplida o rechazada).
//     El evento muestra un informe detallado, con color verde si todo está bien o rojo si hay errores.
