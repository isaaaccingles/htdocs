// Arrays globales para los libros, lectores y prestamos(total y vivos)
let arrayLibros = [];
let arrayLectores = [];
let prestamosArray = [];
let prestamosArrayVivos = [];

async function leerArchivo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}


// Alta de lector en el html
document.addEventListener('DOMContentLoaded', function() {
    // Asegurarnos de que los elementos estén disponibles al cargar la página
    const altaLectorBoton = document.getElementById('alta-lector-boton');
    const altaLectorNombre = document.getElementById('alta-lector-nombre');
    const altaLectorApellido = document.getElementById('alta-lector-apellido');
    const altaLectorTelefono = document.getElementById('alta-lector-telefono');
    const altaLectorEmail = document.getElementById('alta-lector-email');

    altaLectorBoton.addEventListener('click', function() {
        let nombre = altaLectorNombre.value;
        let apellido = altaLectorApellido.value;
        let telefono = altaLectorTelefono.value;
        let email = altaLectorEmail.value;

        // Verificar si el div para los mensajes ya existe, si no, crearlo
        let mensajeAltaLector = document.getElementById('mensaje-alta-lector');
        if (!mensajeAltaLector) {
            mensajeAltaLector = document.createElement('div');
            mensajeAltaLector.id = 'mensaje-alta-lector';
            mensajeAltaLector.style.marginTop = '10px';
            mensajeAltaLector.style.fontWeight = 'bold';
            mensajeAltaLector.style.textAlign = 'center';
        }

        // Limpiar el mensaje anterior antes de mostrar el nuevo
        mensajeAltaLector.textContent = '';

        // Verificar si algún campo está vacío
        if (!nombre || !apellido || !telefono || !email) {
            mensajeAltaLector.textContent = "Por favor, rellena todos los campos.";
            mensajeAltaLector.style.color = 'red';
            let contenedorAltaLector = document.getElementById('alta-lector');
            contenedorAltaLector.insertBefore(mensajeAltaLector, altaLectorBoton);
            return;
        }

        // Validar nombre
        const nombreVal = /^[a-zA-ZÀ-ÿ]+(?:[\s-][a-zA-ZÀ-ÿ]+)?$/;
        if (!nombreVal.test(nombre)) {
            mensajeAltaLector.textContent = "El nombre no es válido. Debe ser una o dos palabras con letras del alfabeto español, pudiendo incluir guiones.";
            mensajeAltaLector.style.color = 'red';
            let contenedorAltaLector = document.getElementById('alta-lector');
            contenedorAltaLector.insertBefore(mensajeAltaLector, altaLectorBoton);
            return;
        }

        // Validar apellido
        const apellidoVal = /^[a-zA-ZÀ-ÿ]+(?:[\s-][a-zA-ZÀ-ÿ]+)?$/;
        if (!apellidoVal.test(apellido)) {
            mensajeAltaLector.textContent = "El apellido no es válido. Debe ser una o dos palabras con letras del alfabeto español, pudiendo incluir guiones.";
            mensajeAltaLector.style.color = 'red';
            let contenedorAltaLector = document.getElementById('alta-lector');
            contenedorAltaLector.insertBefore(mensajeAltaLector, altaLectorBoton);
            return;
        }

        // Validar teléfono (9 dígitos)
        const telefonoVal = /^\d{9}$/;
        if (!telefonoVal.test(telefono)) {
            mensajeAltaLector.textContent = "El teléfono debe tener 9 dígitos.";
            mensajeAltaLector.style.color = 'red';
            let contenedorAltaLector = document.getElementById('alta-lector');
            contenedorAltaLector.insertBefore(mensajeAltaLector, altaLectorBoton);
            return;
        }

        // Validar email
        const emailVal = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(es|com|net|eu|org)$/;
        if (!emailVal.test(email)) {
            mensajeAltaLector.textContent = "El correo electrónico no es válido. Solo se permiten los dominios: .es, .com, .net, .eu, .org.";
            mensajeAltaLector.style.color = 'red';
            let contenedorAltaLector = document.getElementById('alta-lector');
            contenedorAltaLector.insertBefore(mensajeAltaLector, altaLectorBoton);
            return;
        }

        // Verificar si el email ya existe
        let lectorExistente = arrayLectores.find(lector => lector.email === email);
        if (lectorExistente) {
            mensajeAltaLector.textContent = "Ya existe un lector con este correo electrónico.";
            mensajeAltaLector.style.color = 'red';
            let contenedorAltaLector = document.getElementById('alta-lector');
            contenedorAltaLector.insertBefore(mensajeAltaLector, altaLectorBoton);
            return;
        }

        // Crear el nuevo lector y agregarlo al array
        let nuevoLector = new Lectores(siguienteNumSocio, nombre, apellido, telefono, email);
        arrayLectores.push(nuevoLector);

        // Incrementar el número de socio para el próximo lector
        siguienteNumSocio++;

        // Mostrar el mensaje de éxito
        mensajeAltaLector.textContent = `Lector registrado exitosamente. Número de socio: ${nuevoLector.numSocio}`;
        mensajeAltaLector.style.color = 'green'; // Cambio a verde para éxito, diferente al rojo de altaLibro
        let contenedorAltaLector = document.getElementById('alta-lector');
        contenedorAltaLector.insertBefore(mensajeAltaLector, altaLectorBoton);
    });
});

// Baja de lector
document.addEventListener('DOMContentLoaded', function() {
    // Asegurarnos de que los elementos estén disponibles al cargar la página
    const bajaLectorBoton = document.getElementById('baja-lector-boton');
    const bajaLectorEmail = document.getElementById('baja-lector-email');

    bajaLectorBoton.addEventListener('click', function() {
        let email = bajaLectorEmail.value;

        // Verificar si el div para los mensajes ya existe, si no, crearlo
        let mensajeBajaLector = document.getElementById('mensaje-baja-lector');
        if (!mensajeBajaLector) {
            mensajeBajaLector = document.createElement('div');
            mensajeBajaLector.id = 'mensaje-baja-lector';
            mensajeBajaLector.style.marginTop = '10px';
            mensajeBajaLector.style.fontWeight = 'bold';
            mensajeBajaLector.style.textAlign = 'center';
        }

        // Limpiar el mensaje anterior antes de mostrar el nuevo
        mensajeBajaLector.textContent = '';

        // Verificar si el campo email está vacío
        if (!email) {
            mensajeBajaLector.textContent = "Por favor, introduce un email.";
            mensajeBajaLector.style.color = 'red';
            let contenedorBajaLector = document.getElementById('baja-lector');
            contenedorBajaLector.insertBefore(mensajeBajaLector, bajaLectorBoton);
            return;
        }

        // Buscar el lector por email
        let lectorExistente = arrayLectores.find(lector => lector.email === email);
        if (!lectorExistente) {
            mensajeBajaLector.textContent = "No se encontró un lector con este correo.";
            mensajeBajaLector.style.color = 'red';
            let contenedorBajaLector = document.getElementById('baja-lector');
            contenedorBajaLector.insertBefore(mensajeBajaLector, bajaLectorBoton);
            return;
        }

        // Llamar al método darDeBaja() para realizar la baja
        lectorExistente.darDeBaja();

        // Mostrar el mensaje de éxito
        mensajeBajaLector.textContent = `Lector dado de baja con éxito. Fecha de baja: ${lectorExistente.fechaBaja}`;
        mensajeBajaLector.style.color = 'green'; // Verde para éxito, como en altaLector
        let contenedorBajaLector = document.getElementById('baja-lector');
        contenedorBajaLector.insertBefore(mensajeBajaLector, bajaLectorBoton);
    });
});

// Modificar lector
document.addEventListener('DOMContentLoaded', function() {
    // Asegurarnos de que los elementos estén disponibles al cargar la página
    const modificarLectorBoton = document.getElementById('modificar-lector-boton');
    const modificarLectorNumSocio = document.getElementById('modificar-lector-num-socio');
    const modificarLectorDato = document.getElementById('modificar-lector-dato');
    const modificarLectorNuevoValor = document.getElementById('modificar-lector-nuevo-valor');

    modificarLectorBoton.addEventListener('click', function() {
        let numSocio = modificarLectorNumSocio.value;
        let dato = modificarLectorDato.value;
        let nuevoValor = modificarLectorNuevoValor.value.trim();

        // Verificar si el div para los mensajes ya existe, si no, crearlo
        let mensajeModificarLector = document.getElementById('mensaje-modificar-lector');
        if (!mensajeModificarLector) {
            mensajeModificarLector = document.createElement('div');
            mensajeModificarLector.id = 'mensaje-modificar-lector';
            mensajeModificarLector.style.marginTop = '10px';
            mensajeModificarLector.style.fontWeight = 'bold';
            mensajeModificarLector.style.textAlign = 'center';
        }

        // Limpiar el mensaje anterior antes de mostrar el nuevo
        mensajeModificarLector.textContent = '';

        // Verificar si los campos están vacíos
        if (!numSocio) {
            mensajeModificarLector.textContent = "Por favor, introduce el número de socio.";
            mensajeModificarLector.style.color = 'red';
            let contenedorModificarLector = document.getElementById('modificar-lector');
            contenedorModificarLector.insertBefore(mensajeModificarLector, modificarLectorBoton);
            return;
        }

        if (!nuevoValor) {
            mensajeModificarLector.textContent = "El valor no puede estar vacío.";
            mensajeModificarLector.style.color = 'red';
            let contenedorModificarLector = document.getElementById('modificar-lector');
            contenedorModificarLector.insertBefore(mensajeModificarLector, modificarLectorBoton);
            return;
        }

        // Buscar el lector por número de socio
        let lector = arrayLectores.find(lector => lector.numSocio === numSocio);
        if (!lector) {
            mensajeModificarLector.textContent = "Lector no encontrado.";
            mensajeModificarLector.style.color = 'red';
            let contenedorModificarLector = document.getElementById('modificar-lector');
            contenedorModificarLector.insertBefore(mensajeModificarLector, modificarLectorBoton);
            return;
        }

        // Modificar el dato del lector
        lector.modificarLector(dato, nuevoValor);

        // Mostrar el mensaje de éxito
        mensajeModificarLector.textContent = `Dato ${dato} del lector ${numSocio} actualizado correctamente.`;
        mensajeModificarLector.style.color = 'green'; // Verde para éxito, consistente con altaLector y bajaLector
        let contenedorModificarLector = document.getElementById('modificar-lector');
        contenedorModificarLector.insertBefore(mensajeModificarLector, modificarLectorBoton);
    });
});

// Baja de libro
document.addEventListener('DOMContentLoaded', function() {
    // Asegurarnos de que los elementos estén disponibles al cargar la página
    const bajaLibroBoton = document.getElementById('baja-libro-boton');
    const bajaLibroCodLibro = document.getElementById('baja-libro-cod-libro');

    bajaLibroBoton.addEventListener('click', function() {
        let codLibro = bajaLibroCodLibro.value;

        // Verificar si el div para los mensajes ya existe, si no, crearlo
        let mensajeBajaLibro = document.getElementById('mensaje-baja-libro');
        if (!mensajeBajaLibro) {
            mensajeBajaLibro = document.createElement('div');
            mensajeBajaLibro.id = 'mensaje-baja-libro';
            mensajeBajaLibro.style.marginTop = '10px';
            mensajeBajaLibro.style.fontWeight = 'bold';
            mensajeBajaLibro.style.textAlign = 'center';
        }

        // Limpiar el mensaje anterior antes de mostrar el nuevo
        mensajeBajaLibro.textContent = '';

        // Verificar si el campo código está vacío
        if (!codLibro) {
            mensajeBajaLibro.textContent = "Por favor, introduce el código del libro.";
            mensajeBajaLibro.style.color = 'red';
            let contenedorBajaLibro = document.getElementById('baja-libro');
            contenedorBajaLibro.insertBefore(mensajeBajaLibro, bajaLibroBoton);
            return;
        }

        // Buscar el índice del libro por código
        let libroIndex = arrayLibros.findIndex(libro => libro.codLibro === codLibro);
        if (libroIndex !== -1) {
            // Eliminar el libro del array
            arrayLibros.splice(libroIndex, 1);

            // Mostrar el mensaje de éxito
            mensajeBajaLibro.textContent = `Libro con código ${codLibro} dado de baja correctamente.`;
            mensajeBajaLibro.style.color = 'green'; // Verde para éxito, consistente con otros eventos
            let contenedorBajaLibro = document.getElementById('baja-libro');
            contenedorBajaLibro.insertBefore(mensajeBajaLibro, bajaLibroBoton);
        } else {
            mensajeBajaLibro.textContent = "Libro no encontrado.";
            mensajeBajaLibro.style.color = 'red';
            let contenedorBajaLibro = document.getElementById('baja-libro');
            contenedorBajaLibro.insertBefore(mensajeBajaLibro, bajaLibroBoton);
        }
    });
});

// Modificar libro
document.addEventListener('DOMContentLoaded', function() {
    // Asegurarnos de que los elementos estén disponibles al cargar la página
    const modificarLibroBoton = document.getElementById('modificar-libro-boton');
    const modificarLibroCodLibro = document.getElementById('modificar-libro-cod-libro');
    const modificarLibroDato = document.getElementById('modificar-libro-dato');
    const modificarLibroNuevoValor = document.getElementById('modificar-libro-nuevo-valor');

    modificarLibroBoton.addEventListener('click', function() {
        let codLibro = modificarLibroCodLibro.value;
        let dato = modificarLibroDato.value;
        let nuevoValor = modificarLibroNuevoValor.value.trim();

        // Verificar si el div para los mensajes ya existe, si no, crearlo
        let mensajeModificarLibro = document.getElementById('mensaje-modificar-libro');
        if (!mensajeModificarLibro) {
            mensajeModificarLibro = document.createElement('div');
            mensajeModificarLibro.id = 'mensaje-modificar-libro';
            mensajeModificarLibro.style.marginTop = '10px';
            mensajeModificarLibro.style.fontWeight = 'bold';
            mensajeModificarLibro.style.textAlign = 'center';
        }

        // Limpiar el mensaje anterior antes de mostrar el nuevo
        mensajeModificarLibro.textContent = '';

        // Verificar si los campos están vacíos
        if (!codLibro) {
            mensajeModificarLibro.textContent = "Por favor, introduce el código del libro.";
            mensajeModificarLibro.style.color = 'red';
            let contenedorModificarLibro = document.getElementById('modificar-libro');
            contenedorModificarLibro.insertBefore(mensajeModificarLibro, modificarLibroBoton);
            return;
        }

        if (!nuevoValor) {
            mensajeModificarLibro.textContent = "El valor no puede estar vacío.";
            mensajeModificarLibro.style.color = 'red';
            let contenedorModificarLibro = document.getElementById('modificar-libro');
            contenedorModificarLibro.insertBefore(mensajeModificarLibro, modificarLibroBoton);
            return;
        }

        // Buscar el libro por código
        let libro = arrayLibros.find(libro => libro.codLibro === codLibro);
        if (!libro) {
            mensajeModificarLibro.textContent = "Libro no encontrado.";
            mensajeModificarLibro.style.color = 'red';
            let contenedorModificarLibro = document.getElementById('modificar-libro');
            contenedorModificarLibro.insertBefore(mensajeModificarLibro, modificarLibroBoton);
            return;
        }

        // Modificar el dato del libro
        libro.modificarLibro(dato, nuevoValor);

        // Mostrar el mensaje de éxito
        mensajeModificarLibro.textContent = `Dato ${dato} del libro ${codLibro} actualizado correctamente.`;
        mensajeModificarLibro.style.color = 'green'; // Verde para éxito, consistente con otros eventos
        let contenedorModificarLibro = document.getElementById('modificar-libro');
        contenedorModificarLibro.insertBefore(mensajeModificarLibro, modificarLibroBoton);
    });
});

// Buscar libro por ISBN
document.addEventListener('DOMContentLoaded', function() {
    // Asegurarnos de que los elementos estén disponibles al cargar la página
    const buscarLibroBoton = document.getElementById('buscar-libro-boton');
    const buscarLibroIsbn = document.getElementById('buscar-libro-isbn');

    buscarLibroBoton.addEventListener('click', function() {
        let isbn = buscarLibroIsbn.value;

        // Verificar si el div para los mensajes ya existe, si no, crearlo
        let mensajeBuscarLibro = document.getElementById('mensaje-buscar-libro');
        if (!mensajeBuscarLibro) {
            mensajeBuscarLibro = document.createElement('div');
            mensajeBuscarLibro.id = 'mensaje-buscar-libro';
            mensajeBuscarLibro.style.marginTop = '10px';
            mensajeBuscarLibro.style.fontWeight = 'bold';
            mensajeBuscarLibro.style.textAlign = 'center';
        }

        // Limpiar el mensaje anterior antes de mostrar el nuevo
        mensajeBuscarLibro.textContent = '';

        // Verificar si el campo ISBN está vacío
        if (!isbn) {
            mensajeBuscarLibro.textContent = "Por favor, introduce el ISBN del libro.";
            mensajeBuscarLibro.style.color = 'red';
            let contenedorBuscarLibro = document.getElementById('buscar-libro');
            contenedorBuscarLibro.insertBefore(mensajeBuscarLibro, buscarLibroBoton);
            return;
        }

        // Buscar el libro por ISBN
        let libroEncontrado = arrayLibros.find(libro => libro.isbn === isbn);

        if (libroEncontrado) {
            // Mostrar mensaje de éxito si el libro existe
            mensajeBuscarLibro.textContent = `El libro con ISBN ${isbn} existe en la biblioteca. Título: ${libroEncontrado.titulo}`;
            mensajeBuscarLibro.style.color = 'green'; // Verde para indicar que se encontró
            let contenedorBuscarLibro = document.getElementById('buscar-libro');
            contenedorBuscarLibro.insertBefore(mensajeBuscarLibro, buscarLibroBoton);
        } else {
            // Mostrar mensaje de error si no existe
            mensajeBuscarLibro.textContent = `No se encontró un libro con el ISBN ${isbn}.`;
            mensajeBuscarLibro.style.color = 'red';
            let contenedorBuscarLibro = document.getElementById('buscar-libro');
            contenedorBuscarLibro.insertBefore(mensajeBuscarLibro, buscarLibroBoton);
        }
    });
});

// Ubicar libro por código
document.addEventListener('DOMContentLoaded', function() {
    // Asegurarnos de que los elementos estén disponibles al cargar la página
    const ubicarLibroBoton = document.getElementById('ubicar-libro-boton');
    const ubicarLibroCodLibro = document.getElementById('ubicar-libro-cod-libro');

    ubicarLibroBoton.addEventListener('click', function() {
        let codLibro = ubicarLibroCodLibro.value;

        // Verificar si el div para los mensajes ya existe, si no, crearlo
        let mensajeUbicarLibro = document.getElementById('mensaje-ubicar-libro');
        if (!mensajeUbicarLibro) {
            mensajeUbicarLibro = document.createElement('div');
            mensajeUbicarLibro.id = 'mensaje-ubicar-libro';
            mensajeUbicarLibro.style.marginTop = '10px';
            mensajeUbicarLibro.style.fontWeight = 'bold';
            mensajeUbicarLibro.style.textAlign = 'center';
        }

        // Limpiar el mensaje anterior antes de mostrar el nuevo
        mensajeUbicarLibro.textContent = '';

        // Verificar si el campo código está vacío
        if (!codLibro) {
            mensajeUbicarLibro.textContent = "Por favor, introduce el código del libro.";
            mensajeUbicarLibro.style.color = 'red';
            let contenedorUbicarLibro = document.getElementById('ubicar-libro');
            contenedorUbicarLibro.insertBefore(mensajeUbicarLibro, ubicarLibroBoton);
            return;
        }

        // Buscar el libro por código
        let libro = arrayLibros.find(libro => libro.codLibro === codLibro);

        if (!libro) {
            mensajeUbicarLibro.textContent = "Libro no encontrado.";
            mensajeUbicarLibro.style.color = 'red';
            let contenedorUbicarLibro = document.getElementById('ubicar-libro');
            contenedorUbicarLibro.insertBefore(mensajeUbicarLibro, ubicarLibroBoton);
        } else {
            // Mostrar la ubicación del libro
            mensajeUbicarLibro.textContent = `Ubicación del libro con código ${libro.codLibro}: Pasillo ${libro.clasificacion.pasillo}, Estantería ${libro.clasificacion.estanteria}, Estante ${libro.clasificacion.estante}.`;
            mensajeUbicarLibro.style.color = 'green'; // Verde para éxito, consistente con otros eventos
            let contenedorUbicarLibro = document.getElementById('ubicar-libro');
            contenedorUbicarLibro.insertBefore(mensajeUbicarLibro, ubicarLibroBoton);
        }
    });
});

// Listado total de préstamos
document.addEventListener('DOMContentLoaded', function() {
    // Asegurarnos de que los elementos estén disponibles al cargar la página
    const listadoPrestamosBoton = document.getElementById('listado-prestamos-boton');
    const resultadoListadoPrestamos = document.getElementById('resultado-listado-prestamos');

    listadoPrestamosBoton.addEventListener('click', function() {
        // Limpiar el contenido anterior
        resultadoListadoPrestamos.innerHTML = '';

        // Verificar si hay préstamos registrados
        if (prestamosArray.length === 0) {
            resultadoListadoPrestamos.textContent = "No hay préstamos registrados.";
            resultadoListadoPrestamos.style.color = 'red';
            resultadoListadoPrestamos.style.marginTop = '10px';
            resultadoListadoPrestamos.style.fontWeight = 'bold';
            resultadoListadoPrestamos.style.textAlign = 'center';
            return;
        }

        // Crear un contenedor para el listado
        let listado = document.createElement('div');
        listado.style.marginTop = '10px';
        listado.style.textAlign = 'left';

        // Recorrer el array de préstamos y mostrar la información de cada uno
        prestamosArray.forEach(prestamo => {
            // Comprobar que cada préstamo tenga la información necesaria
            if (!prestamo.numPrestamo || !prestamo.numSocio || !prestamo.codLibro || !prestamo.fechaPrestamo) {
                listado.innerHTML += '<p style="color: red;">Error: Faltan datos en un préstamo.</p>';
                return;
            }

            // Mostrar la información de cada préstamo
            let prestamoTexto = `
                Número de préstamo: ${prestamo.numPrestamo}<br>
                Número de socio: ${prestamo.numSocio}<br>
                Código del libro: ${prestamo.codLibro}<br>
                Fecha de préstamo: ${prestamo.fechaPrestamo}<br>
                Fecha de devolución: ${prestamo.fechaDevolucion ? prestamo.fechaDevolucion : "Pendiente"}<br>
                -----------------------------------<br>
            `;
            listado.innerHTML += prestamoTexto;
        });

        // Añadir el listado al contenedor de resultados
        resultadoListadoPrestamos.appendChild(listado);
        resultadoListadoPrestamos.style.color = 'green'; // Verde para éxito general
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const vistaLibrosTabla = document.getElementById('vista-libros-tabla').getElementsByTagName('tbody')[0];
    const vistaLectoresTabla = document.getElementById('comprobar-lectores-tabla').getElementsByTagName('tbody')[0];
    const importarBoton = document.getElementById('importar-boton');
    const vistaLibrosBoton = document.getElementById('vista-libros-boton');
    const comprobarLectoresBoton = document.getElementById('comprobar-lectores-boton');
    const altaLibroBoton = document.getElementById('alta-libro-boton'); 
    const altaLibroIsbn = document.getElementById('alta-libro-isbn');
    const altaLibroAutor = document.getElementById('alta-libro-autor');
    const altaLibroTitulo = document.getElementById('alta-libro-titulo');
    const altaLibroEditorial = document.getElementById('alta-libro-editorial');
    const altaLibroEjemplares = document.getElementById('alta-libro-ejemplares');
    
// Función para actualizar la vista de los libros
function actualizarVistaLibros() {
    vistaLibrosTabla.innerHTML = ''; // Limpiar la tabla antes de mostrar los datos actualizados

    // Crear la fila de encabezado
    let encabezado = vistaLibrosTabla.insertRow();
    const titulos = ['Código', 'ISBN', 'Autor', 'Título', 'Editorial', 'Ejemplares'];
    titulos.forEach(titulo => {
        let th = document.createElement('th');
        th.textContent = titulo;
        th.style.backgroundColor = '#BB61F0';
        th.style.color = '#1B1B1B';
        th.style.padding = '30px';
        th.style.border = '1px solid #1B1B1B';
        encabezado.appendChild(th);
    });

    // Crear las filas con los datos de los libros
    arrayLibros.forEach(libro => {
        let row = vistaLibrosTabla.insertRow();

        // Insertar celdas
        let codLibro = row.insertCell();
        codLibro.textContent = libro.codLibro;
        codLibro.style.backgroundColor = '#C398EB';
        codLibro.style.color = '#1B1B1B';
        codLibro.style.padding = '30px';
        codLibro.style.border = '1px solid #1B1B1B';
        codLibro.style.outline = '2px solid #1B1B1B';

        let isbn = row.insertCell();
        isbn.textContent = libro.isbn;
        isbn.style.backgroundColor = '#C398EB';
        isbn.style.color = '#1B1B1B';
        isbn.style.padding = '30px';
        isbn.style.border = '1px solid #1B1B1B';
        isbn.style.outline = '2px solid #1B1B1B';

        let autor = row.insertCell();
        autor.textContent = libro.autor;
        autor.style.backgroundColor = '#C398EB';
        autor.style.color = '#1B1B1B';
        autor.style.padding = '30px';
        autor.style.border = '1px solid #1B1B1B';
        autor.style.outline = '2px solid #1B1B1B';

        let titulo = row.insertCell();
        titulo.textContent = libro.titulo;
        titulo.style.backgroundColor = '#C398EB';
        titulo.style.color = '#1B1B1B';
        titulo.style.padding = '30px';
        titulo.style.border = '1px solid #1B1B1B';
        titulo.style.outline = '2px solid #1B1B1B';

        let editorial = row.insertCell();
        editorial.textContent = libro.editorial;
        editorial.style.backgroundColor = '#C398EB';
        editorial.style.color = '#1B1B1B';
        editorial.style.padding = '30px';
        editorial.style.border = '1px solid #1B1B1B';
        editorial.style.outline = '2px solid #1B1B1B';

        let ejemplares = row.insertCell();
        ejemplares.textContent = libro.ejemplares;
        ejemplares.style.backgroundColor = '#C398EB';
        ejemplares.style.color = '#1B1B1B';
        ejemplares.style.padding = '30px';
        ejemplares.style.border = '1px solid #1B1B1B';
        ejemplares.style.outline = '2px solid #1B1B1B';
    });
}
// Función para actualizar la vista de los lectores
function actualizarVistaLectores() {
    vistaLectoresTabla.innerHTML = '';

    // Crear la fila de encabezado
    let encabezado = vistaLectoresTabla.insertRow();
    const titulos = ['Número de Socio', 'Nombre', 'Apellido', 'Teléfono', 'Email'];
    titulos.forEach(titulo => {
        let th = document.createElement('th');
        th.textContent = titulo;
        th.style.backgroundColor = '#BB61F0';
        th.style.color = '#1B1B1B';
        th.style.padding = '30px';
        th.style.border = '1px solid #1B1B1B';
        encabezado.appendChild(th);
    });

    // Crear las filas con los datos de los lectores
    arrayLectores.forEach(lector => {
        let row = vistaLectoresTabla.insertRow();

        // Insertar celdas y aplicar estilos
        let numSocio = row.insertCell();
        numSocio.textContent = lector.numSocio;
        numSocio.style.backgroundColor = '#C398EB';
        numSocio.style.color = '#1B1B1B';
        numSocio.style.padding = '30px';
        numSocio.style.border = '1px solid #1B1B1B';
        numSocio.style.outline = '2px solid #1B1B1B'; // Outline para buen estilo

        let nombre = row.insertCell();
        nombre.textContent = lector.nombre;
        nombre.style.backgroundColor = '#C398EB';
        nombre.style.color = '#1B1B1B';
        nombre.style.padding = '30px';
        nombre.style.border = '1px solid #1B1B1B';
        nombre.style.outline = '2px solid #1B1B1B';

        let apellido = row.insertCell();
        apellido.textContent = lector.apellido;
        apellido.style.backgroundColor = '#C398EB';
        apellido.style.color = '#1B1B1B';
        apellido.style.padding = '30px';
        apellido.style.border = '1px solid #1B1B1B';
        apellido.style.outline = '2px solid #1B1B1B';

        let telefono = row.insertCell();
        telefono.textContent = lector.telefono;
        telefono.style.backgroundColor = '#C398EB';
        telefono.style.color = '#1B1B1B';
        telefono.style.padding = '30px';
        telefono.style.border = '1px solid #1B1B1B';
        telefono.style.outline = '2px solid #1B1B1B';

        // Verificar si el teléfono es válido
        if (!verificarTelefono(lector.telefono)) {
            telefono.style.backgroundColor = '#EA9E90'; // Color de fondo si es inválido
        }

        let email = row.insertCell();
        email.textContent = lector.email;
        email.style.backgroundColor = '#C398EB';
        email.style.color = '#1B1B1B';
        email.style.padding = '10px';
        email.style.border = '1px solid #1B1B1B';
        email.style.outline = '2px solid #1B1B1B';

        // Verificar si el email es válido
        if (!verificarEmail(lector.email)) {
            email.style.backgroundColor = '#EA9E90'; // Color de fondo si es inválido
        }
    });
}

// Función que se encarga de mostrar el mensaje debajo de los botones
function mostrarMensaje(mensaje) {
    // Verificar si el div para los mensajes ya existe, si no, crearlo
    let mensajeDiv = document.getElementById('mensaje-prestamo-devolucion');
    if (!mensajeDiv) {
        mensajeDiv = document.createElement('div');
        mensajeDiv.id = 'mensaje-prestamo-devolucion';
        mensajeDiv.style.marginTop = '10px';
        mensajeDiv.style.fontWeight = 'bold';
        mensajeDiv.style.textAlign = 'center';
        document.body.appendChild(mensajeDiv); 
    }
    // Limpiar el mensaje anterior antes de mostrar el nuevo
    mensajeDiv.textContent = ''; 
    mensajeDiv.textContent = mensaje;
    mensajeDiv.style.color = 'red';  
}

// Alta de libro 
altaLibroBoton.addEventListener('click', function() {
        let isbn = altaLibroIsbn.value;
        let autor = altaLibroAutor.value;
        let titulo = altaLibroTitulo.value;
        let editorial = altaLibroEditorial.value;
        let ejemplares = parseInt(altaLibroEjemplares.value);
    
        let codLibro = prompt("Escribe el código del libro: ");
        
        // Verificar si el div para los mensajes ya existe, si no, crearlo
        let mensajeAltaLibro = document.getElementById('mensaje-alta-libro');
        if (!mensajeAltaLibro) {
            mensajeAltaLibro = document.createElement('div');
            mensajeAltaLibro.id = 'mensaje-alta-libro';
            mensajeAltaLibro.style.marginTop = '10px';
            mensajeAltaLibro.style.fontWeight = 'bold';
            mensajeAltaLibro.style.textAlign = 'center';
        }
    
        // Limpiar el mensaje anterior antes de mostrar el nuevo
        mensajeAltaLibro.textContent = ''; // Eliminar cualquier mensaje previo
    
        if (!codLibro) {
            mensajeAltaLibro.textContent = "El código del libro es obligatorio.";
            mensajeAltaLibro.style.color = 'red';
    
            // Insertar el mensaje encima del botón "Alta"
            let contenedorAltaLibro = document.getElementById('alta-libro');
            contenedorAltaLibro.insertBefore(mensajeAltaLibro, altaLibroBoton);
            
            return;
        }
    
        // Verificar si el libro ya existe
        let libroExistente = arrayLibros.find(libro => libro.codLibro === codLibro);
        if (libroExistente) {
            mensajeAltaLibro.textContent = "El código del libro ya existe.";
            mensajeAltaLibro.style.color = 'red';
    
            // Insertar el mensaje encima del botón "Alta"
            let contenedorAltaLibro = document.getElementById('alta-libro');
            contenedorAltaLibro.insertBefore(mensajeAltaLibro, altaLibroBoton.nextSibling);
    
            return;
        }
    
        // Crear el nuevo libro y agregarlo al array
        let nuevoLibro = new Libros(codLibro, isbn, autor, titulo, editorial, ejemplares);
        arrayLibros.push(nuevoLibro);
    
        // Mostrar el mensaje de éxito
        mensajeAltaLibro.textContent = `¡Libro dado de alta con éxito! Código del libro: ${nuevoLibro.codLibro}`;
        mensajeAltaLibro.style.color = 'red'; 
    
        // Insertar el mensaje encima del botón "Alta"
        let contenedorAltaLibro = document.getElementById('alta-libro');
        contenedorAltaLibro.insertBefore(mensajeAltaLibro, altaLibroBoton);
});
    
// Devolución de libro
document.getElementById("devolucion-boton").addEventListener("click", function() {
    const numSocio = document.getElementById("devolucion-prestamo-socio").value;
    const codLibro = document.getElementById("devolucion-prestamo-libro").value;

    // Limpiar cualquier mensaje anterior
    mostrarMensaje("", "");

    // Procesar la devolución
    const resultado = devolucionPrestamo(numSocio, codLibro);

    if (resultado.includes("Devolución registrada correctamente")) {
        // Si la devolución es exitosa, mostrar mensaje de éxito
        mostrarMensaje("exito", `${resultado}. Número de préstamo: ${resultado.numPrestamo}. Fecha de devolución: ${resultado.fechaDevolucion}`);
    } else {
        // Si hay error, mostrar mensaje de error
        mostrarMensaje("error", resultado);
    }
});

// Préstamo de libro
document.getElementById("prestamo-boton").addEventListener("click", function() {
    const numSocio = document.getElementById("devolucion-prestamo-socio").value;
    const codLibro = document.getElementById("devolucion-prestamo-libro").value;

    // Limpiar cualquier mensaje anterior
    mostrarMensaje("", "");

    // Procesar el préstamo
    const resultado = solicitudPrestamo(numSocio, codLibro);

    if (resultado.includes("Préstamo solicitado correctamente")) {
        // Si el préstamo es exitoso, mostrar mensaje de éxito
        mostrarMensaje("exito", `${resultado}. Número de préstamo: ${resultado.numPrestamo}. Fecha de préstamo: ${resultado.fechaPrestamo}`);
    } else {
        // Si hay error, mostrar mensaje de error
        mostrarMensaje("error", resultado);
    }
});

// Actualizar las vistas de libros y lectores
vistaLibrosBoton.addEventListener('click', actualizarVistaLibros);
comprobarLectoresBoton.addEventListener('click', actualizarVistaLectores);

// Función para importar archivos CSV 
importarBoton.addEventListener('click', function() {
        let archivoLibros = document.getElementById('importar-input-libros').files[0];
        let archivoLectores = document.getElementById('importar-input-lectores').files[0];
    
        // Verificar si el div de mensajes existe, si no, crearlo
        let mensajeImportacion = document.getElementById('mensaje-importacion');
        if (!mensajeImportacion) {
            mensajeImportacion = document.createElement('div');
            mensajeImportacion.id = 'mensaje-importacion';
            mensajeImportacion.style.marginTop = '10px';
            mensajeImportacion.style.fontWeight = 'bold';
            mensajeImportacion.style.textAlign = 'center';
        }
    
        // Limpiar mensaje previo
        mensajeImportacion.textContent = '';
        mensajeImportacion.style.color = ''; 
    
        let librosCargados = false;
        let lectoresCargados = false;
    
        // Importar libros desde CSV
        if (archivoLibros) {
            leerArchivo(archivoLibros)
                .then(contenido => {
                    const lineas = contenido.split('\r\n').filter(linea => linea.trim() !== '');
                    lineas.shift(); // Quitar el encabezado
    
                    arrayLibros.length = 0; // Limpiar array antes de importar
                    lineas.forEach(linea => {
                        const partes = linea.split(",");
                        if (partes.length >= 6) {
                            const nuevoLibro = new Libros(
                                partes[0], partes[1], partes[2], partes[3], partes[4], partes[5]
                            );
                            arrayLibros.push(nuevoLibro);
                        }
                    });
    
                    librosCargados = true;
                    verificarImportacion();
                })
                .catch(error => {
                    mostrarMensajeError(`Error al leer el archivo de libros: ${error.message}`);
                });
        } else {
            mostrarMensajeError("No se ha seleccionado un archivo de libros.");
        }
    
        // Importar lectores desde CSV
        if (archivoLectores) {
            leerArchivo(archivoLectores)
                .then(contenido => {
                    const lineas = contenido.split('\r\n').filter(linea => linea.trim() !== '');
                    lineas.shift(); // Quitar el encabezado
    
                    arrayLectores.length = 0; // Limpiar array antes de importar
                    lineas.forEach(linea => {
                        const partes = linea.split(",");
                        if (partes.length >= 5) {
                            const nuevoLector = new Lectores(
                                partes[0], partes[1], partes[2], partes[3], partes[4]
                            );
                            arrayLectores.push(nuevoLector);
                        }
                    });
    
                    lectoresCargados = true;
                    verificarImportacion();
                })
                .catch(error => {
                    mostrarMensajeError(`Error al leer el archivo de lectores: ${error.message}`);
                });
        } else {
            mostrarMensajeError("No se ha seleccionado un archivo de lectores.");
        }
    
        // Verificar si ambas importaciones fueron exitosas
        function verificarImportacion() {
            if (librosCargados && lectoresCargados) {
                mostrarMensajeExito("Importación realizada con éxito.");
            }
        }
    
        // Función para mostrar un mensaje de error
        function mostrarMensajeError(mensaje) {
            mensajeImportacion.textContent = mensaje;
            mensajeImportacion.style.color = 'red';
            
            // Insertar el mensaje encima del botón "Importar"
            const importarSection = document.getElementById('importar');
            const importarButton = document.getElementById('importar-boton');
            importarSection.insertBefore(mensajeImportacion, importarButton.nextSibling);
        }
    
        // Función para mostrar un mensaje de éxito
        function mostrarMensajeExito(mensaje) {
            mensajeImportacion.textContent = mensaje;
            mensajeImportacion.style.color = 'red';
            
            // Insertar el mensaje encima del botón "Importar"
            const importarSection = document.getElementById('importar');
            const importarButton = document.getElementById('importar-boton');
            importarSection.insertBefore(mensajeImportacion, importarButton.nextSibling);
        }
});
});
  
const clasificacion = {pasillo: 7, estanteria: 4, estante: 6};

function Lectores(numSocio, nombre, apellido, telefono, email) {

    this.numSocio = numSocio;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.email = email;
    this.activo = true; 
    this.fechaBaja = null; 
    this.bajaLector = null;

    this.darDeBaja = function() {
        this.activo = false;
        this.fechaBaja = new Date().toLocaleDateString('en-GB'); 
        this.bajaLector = {
            baja: true,
            fechaBaja: this.fechaBaja
        };
    };

    this.modificarLector = function(dato, nuevoValor) {
        if (dato === 'nombre') {
            this.nombre = nuevoValor;
        } else if (dato === 'apellido') {
            this.apellido = nuevoValor;
        } else if (dato === 'telefono') {
            this.telefono = nuevoValor;
        } else if (dato === 'email') {
            this.email = nuevoValor;
        } else if (dato === 'fechaBaja') {
            this.fechaBaja = nuevoValor;
        }
    };
}

function Libros(codLibro, isbn, autor, titulo, editorial, ejemplares, clasificacion, fechaBaja) {
    // Generación del código de libro único
    Libros.siguienteCodLibro = (Libros.siguienteCodLibro || 1000) + 1;
    this.codLibro = Libros.siguienteCodLibro;

    // Asignación de los parámetros
    this.codLibro = codLibro;
    this.isbn = isbn;
    this.autor = autor;
    this.titulo = titulo;
    this.editorial = editorial;
    this.ejemplares = ejemplares;
    this.clasificacion = clasificacion;
    this.fechaBaja = fechaBaja || null; 
    this.bajaLibro = null;

    // Función para dar de baja el libro
    this.darDeBaja = function() {
        this.bajaLibro = {
            baja: true,
            fechaBaja: new Date().toLocaleDateString('en-GB') 
        };
    };

    // Función para modificar los datos del libro
    this.modificarLibro = function(dato, nuevoValor) {
        if (dato === 'titulo') {
            this.titulo = nuevoValor;
        } else if (dato === 'editorial') {
            this.editorial = nuevoValor;
        } else if (dato === 'ejemplares') {
            this.ejemplares = nuevoValor;
        } else if (dato === 'clasificacion') {
            this.clasificacion = nuevoValor;
        } else if (dato === 'fechaBaja') {
            this.fechaBaja = nuevoValor;
        }
    };
}

function Prestamo(numSocio, codLibro, fechaPrestamo, fechaDevolucion) {
    // Asignar la fecha de préstamo
    this.numPrestamo = (Prestamo.siguienteNumPres = (Prestamo.siguienteNumPres || 1000) + 1);
    
    this.numSocio = numSocio;
    this.codLibro = codLibro;
    this.fechaPrestamo = fechaPrestamo; // Se asigna directamente la fecha de préstamo proporcionada
    this.fechaDevolucion = fechaDevolucion; // Se asigna directamente la fecha de devolución proporcionada
}

let siguienteNumSocio = 1000; // Número de socio inicial
function altaLector() {
    let nombre = prompt("Escribe tu nombre: ");
    let apellido = prompt("Escribe tu apellido: ");
    let telefono = prompt("Escribe tu teléfono: ");
    let email = prompt("Escribe tu email: ");

    // Verificar si algún campo está vacío
    if (!nombre || !apellido || !telefono || !email) {
        return "Por favor, rellena todos los campos.";  
    }

    // Validar nombre
    const nombreVal = /^[a-zA-ZÀ-ÿ]+(?:[\s-][a-zA-ZÀ-ÿ]+)?$/;
    if (!nombreVal.test(nombre)) {
        return "El nombre no es válido. Debe ser una o dos palabras con letras del alfabeto español, pudiendo incluir guiones.";
    }

    // Validar apellido
    const apellidoVal = /^[a-zA-ZÀ-ÿ]+(?:[\s-][a-zA-ZÀ-ÿ]+)?$/;
    if (!apellidoVal.test(apellido)) {
        return "El apellido no es válido. Debe ser una o dos palabras con letras del alfabeto español, pudiendo incluir guiones.";
    }

    // Validar teléfono (9 dígitos)
    const telefonoVal = /^\d{9}$/;
    if (!telefonoVal.test(telefono)) {
        return "El teléfono debe tener 9 dígitos.";
    }

    // Validar email
    const emailVal = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(es|com|net|eu|org)$/;
    if (!emailVal.test(email)) {
        return "El correo electrónico no es válido. Solo se permiten los dominios: .es, .com, .net, .eu, .org.";
    }
    

    // Verificar si el email ya existe
    let lectorExistente = arrayLectores.find(lector => lector.email === email);
    if (lectorExistente) {
        return "Ya existe un lector con este correo electrónico.";
    }

    // Crear un nuevo lector y agregarlo al array
    let nuevoLector = new Lectores(siguienteNumSocio, nombre, apellido, telefono, email);
    arrayLectores.push(nuevoLector);
    
    // Incrementar el número de socio para el próximo lector
    siguienteNumSocio++;

    // Devolver el número de socio del nuevo lector
    return `Lector registrado exitosamente. Número de socio: ${nuevoLector.numSocio}`;
}

function bajaLector() {
    let email = prompt("Introduce el email del lector a dar de baja: ");
    let lectorExistente = arrayLectores.find(lector => lector.email === email);

    if (!lectorExistente) {
        console.log("No se encontró un lector con este correo.");
        return;
    }

    // Llamar al método darDeBaja() para realizar la baja
    lectorExistente.darDeBaja();

    console.log(`Fecha de baja registrada: ${lectorExistente.fechaBaja}`);
}

function modificarLector(numSocio) {
    let lector = arrayLectores.find(lector => lector.numSocio === numSocio);
    if (!lector) {
        return "Lector no encontrado.";
    }
    let dato = prompt("¿Qué dato deseas modificar? (nombre, apellido, telefono, email): ").trim();
    let nuevoValor = prompt("Introduce el nuevo valor: ").trim();

    if (!nuevoValor) {
        return "El valor no puede estar vacío.";
    }

    lector.modificarLector(dato, nuevoValor);
    return `Dato ${dato} del lector ${numSocio} actualizado correctamente.`;
}

function comprobarEmails(arrayLectores) {
    let invalidos = [];
    
    arrayLectores.forEach(lector => {
        if (!verificarEmail(lector.email)) {
            invalidos.push(`${lector.nombre} ${lector.apellido} - ${lector.email}`);
        }
    });

    return invalidos.length ? invalidos : "Todos los emails son válidos.";
}

function comprobarTelefonos(arrayLectores) {
    let invalidos = [];
    
    arrayLectores.forEach(lector => {
        if (!verificarTelefono(lector.telefono)) {
            invalidos.push(`${lector.nombre} ${lector.apellido} - ${lector.telefono}`);
        }
    });

    return invalidos.length ? invalidos : "Todos los teléfonos son válidos.";
}

function verificarEmail(email) {
    const emailVal = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailVal.test(email);
}

function verificarTelefono(telefono) {
    const telefonoVal = /^\d{9}$/;
    return telefonoVal.test(telefono);
}

function altaLibro() {
    let codLibro = prompt("Escribe el código del libro: ");
    let isbn = prompt("Escribe el ISBN del libro: ");
    let autor = prompt("Escribe el autor del libro: ");
    let titulo = prompt("Escribe el título del libro: ");
    let editorial = prompt("Escribe la editorial del libro: ");
    let ejemplares = parseInt(prompt("Escribe el número de ejemplares del libro: "));

    // Verificar si algún campo está vacío o si ejemplares no es un número válido
    if (!codLibro || !isbn || !autor || !titulo || !editorial || isNaN(ejemplares) || ejemplares <= 0) {
        return "Por favor, rellene todos los campos correctamente.";
    }

    // Validar formato de ISBN (ISBN-13)
    const isbnVal = /^(?:\d{3}-)?\d{1,5}-\d{1,7}-\d{1,7}-\d{1,7}$/;
    if (!isbnVal.test(isbn)) {
        return "El ISBN no es válido. Debe seguir el formato de ISBN-13.";
    }

    // Validar autor (solo letras y posibles espacios o guiones)
    const autorVal = /^[a-zA-ZÀ-ÿ]+(?:[\s-][a-zA-ZÀ-ÿ]+)?$/;
    if (!autorVal.test(autor)) {
        return "El autor no es válido. Debe ser una o dos palabras con letras del alfabeto español, pudiendo incluir guiones.";
    }

    // Validar título (títulos con letras, números y caracteres especiales permitidos)
    const tituloVal = /^[a-zA-ZÀ-ÿ0-9\s\-_¡!@#$%&/()¿?€.,;:]+$/;
    if (!tituloVal.test(titulo)) {
        return "El título no es válido. Puede contener letras, números y algunos caracteres especiales.";
    }

    // Validar editorial (letras con posibles espacios o guiones)
    const editorialVal = /^[a-zA-ZÀ-ÿ]+(?:[\s-][a-zA-ZÀ-ÿ]+)?$/;
    if (!editorialVal.test(editorial)) {
        return "La editorial no es válida. Debe ser una o dos palabras con letras del alfabeto español, pudiendo incluir guiones.";
    }

    // Verificar si ya existe el libro con ese código
    let libroExistente = arrayLibros.find(libro => libro.codLibro === codLibro);
    if (libroExistente) {
        return "El código del libro ya existe.";
    }

    // Crear un nuevo libro y agregarlo a arrayLibros
    let nuevoLibro = new libros(codLibro, isbn, autor, titulo, editorial, ejemplares);
    arrayLibros.push(nuevoLibro);

    return "Libro dado de alta correctamente.";
}

function bajaLibro(codLibro) {
    let libroIndex = arrayLibros.findIndex(libro => libro.codLibro === codLibro);
    if (libroIndex !== -1) {
        // Eliminar el libro del array
        arrayLibros.splice(libroIndex, 1);

        return `Libro con código ${codLibro} dado de baja correctamente.`;
    } else {
        return "Libro no encontrado.";
    }
}

function modificarLibro(codLibro) {
    let libro = arrayLibros.find(libro => libro.codLibro === codLibro);
    if (!libro) {
        return "Libro no encontrado.";
    }
    let dato = prompt("¿Qué dato deseas modificar? (titulo, editorial, ejemplares, clasificacion): ").trim();
    let nuevoValor = prompt("Introduce el nuevo valor: ").trim();

    if (!nuevoValor) {
        return "El valor no puede estar vacío.";
    }

    libro.modificarLibro(dato, nuevoValor);
    return `Dato ${dato} del libro ${codLibro} actualizado correctamente.`;
}

function hayLibro(isbn) {
    let libroEncontrado = arrayLibros.find(libro => libro.isbn === isbn);
    
    if (libroEncontrado) {
        return true;

    } else {
        return false;
    }
}

function solicitudPrestamo(numSocio, codLibro) {
    // Buscar lector por número de socio
    let lector = arrayLectores.find(lector => lector.numSocio === numSocio);
    
    // Verificar si el lector existe y no está dado de baja
    if (!lector) {
        return "Lector no encontrado.";
    }
    if (lector.dadoDeBaja) {
        return "El lector está dado de baja y no puede solicitar préstamos.";
    }

    // Buscar el libro por código o ISBN
    let libro = arrayLibros.find(libro => libro.codLibro === codLibro);
    
    // Verificar si el libro existe, no está dado de baja y tiene ejemplares disponibles
    if (!libro) {
        return "Libro no encontrado.";
    }
    if (libro.dadoDeBaja) {
        return "El libro está dado de baja y no puede ser prestado.";
    }
    if (libro.ejemplares <= 0) {
        return `No hay ejemplares disponibles del libro "${libro.titulo}".`;
    }

    // Llamar a la función prestamoLibro para registrar el préstamo
    if (!prestamoLibro(codLibro)) {
        return `No se pudo registrar el préstamo del libro "${libro.titulo}".`;
    }

    // Crear el nuevo número de préstamo
    let numPrestamo = `${numSocio}-${codLibro}-${new Date().getTime()}`;

    // Fecha de préstamo en formato dd/mm/yyyy
    let fechaPrestamo = new Date().toLocaleDateString('es-ES');

    let fechaDevolucion = null;

    // Crear el nuevo objeto de préstamo
    let nuevoPrestamo = new Prestamo(numSocio, codLibro, fechaPrestamo, fechaDevolucion, numPrestamo);
    prestamosArray.push(nuevoPrestamo);

    return `Préstamo solicitado correctamente. Número de préstamo: ${numPrestamo}`;
}

function devolucionPrestamo() {
    // Solicitar los datos del lector y el libro
    let numSocio = prompt("Introduce el número de socio:").trim();
    let codLibro = prompt("Introduce el código del libro:").trim();

    // Validar la existencia del lector
    let lector = arrayLectores.find(lector => lector.numSocio === numSocio);
    if (!lector) {
        alert("El número de socio no existe.");
        return;
    }

    // Validar la existencia del libro
    let libro = arrayLibros.find(libro => libro.codLibro === codLibro);
    if (!libro) {
        alert("El código del libro no existe.");
        return;
    }

    // Buscar el préstamo que coincida con numSocio y codLibro
    let prestamo = prestamosArray.find(prestamo => prestamo.numSocio === numSocio && prestamo.codLibro === codLibro);

    if (!prestamo) {
        alert("No existe un préstamo que coincida con el número de socio y el código del libro.");
        return;
    }

    // Actualizar la fecha de devolución del préstamo
    let fechaActual = new Date().toLocaleDateString();
    prestamo.fechaDevolucion = fechaActual;

    // Incrementar el número de ejemplares disponibles del libro
    libro.ejemplares += 1;

    
    alert(`Devolución registrada correctamente. Número de préstamo: ${prestamo.numPrestamo}. Fecha de devolución: ${fechaActual}`);
}

function prestamoLibro(codLibro) {
    // Buscar el libro en el array por el código
    let libro = arrayLibros.find(libro => libro.codLibro === codLibro);

    // Comprobar si hay ejemplares disponibles para el préstamo
    if (libro.ejemplares <= 0) {
        console.log(`No hay ejemplares disponibles del libro "${libro.titulo}".`);
        return false;
    }

    // Actualizar los datos del libro reflejando el préstamo
    libro.ejemplares -= 1;
    return true;
}

function devolucionLibro(codLibro) {
    // Buscar el libro por codLibro
    let libro = arrayLibros.find(libro => libro.codLibro === codLibro);
    // Verificar si el libro existe
    if (!libro) {
        console.log("El código del libro no existe.");
        return false;
    }

    // Incrementar el número de ejemplares disponibles
    libro.ejemplares += 1;
    console.log(`Devolución registrada correctamente. Ejemplares disponibles: ${libro.ejemplares}.`);
     
    return true;
}

function dondeLibro(codLibro) {
    let libro = arrayLibros.find(libro => libro.codLibro === codLibro);
    
    if (!libro) {
        return "Libro no encontrado.";
    }
    
    // Devolver la ubicación del libro
    return `Ubicación del libro con codigo = ${libro.codigo}: Pasillo ${libro.clasificacion.pasillo}, Estantería ${libro.clasificacion.estanteria}, Estante ${libro.clasificacion.estante}.`;
}

function listadoTotalPrestamos() {
    // Verificar si hay préstamos registrados
    if (prestamosArray.length === 0) {
        console.log("No hay préstamos registrados.");
        return;
    }
    // Recorrer el array de préstamos y mostrar la información de cada uno
    prestamosArray.forEach(prestamo => {
        // Comprobar que cada préstamo tenga la información necesaria
        if (!prestamo.numPrestamo || !prestamo.numSocio || !prestamo.codLibro || !prestamo.fechaPrestamo) {
            console.log("Error: Faltan datos en el préstamo.");
            return;
        }
        // Mostrar la información de cada préstamo
        console.log(`Número de préstamo: ${prestamo.numPrestamo}`);
        console.log(`Número de socio: ${prestamo.numSocio}`);
        console.log(`Código del libro: ${prestamo.codLibro}`);
        console.log(`Fecha de préstamo: ${prestamo.fechaPrestamo}`);
        console.log(`Fecha de devolución: ${prestamo.fechaDevolucion ? prestamo.fechaDevolucion : "Pendiente"}`);
        console.log('-----------------------------------');
    });
}

function ListadoPrestamosVivos() {
    // Verificar si hay préstamos registrados
    if (prestamosArray.length === 0) {
        console.log("No hay préstamos registrados.");
        return;
    }

    // Recorrer el array de préstamos y mostrar los que están vivos (no devueltos)
    let prestamosVivos = prestamosArray.filter(prestamo => prestamo.fechaDevolucion === null);

    // Si no hay préstamos vivos, mostrar mensaje
    if (prestamosVivos.length === 0) {
        console.log("No hay préstamos vivos (todos han sido devueltos).");
        return;
    }

    // Mostrar la información de los préstamos vivos
    prestamosVivos.forEach(prestamo => {
        // Comprobar que cada préstamo tenga la información necesaria
        if (!prestamo.numPrestamo || !prestamo.numSocio || !prestamo.codLibro || !prestamo.fechaPrestamo) {
            console.log("Error: Faltan datos en el préstamo.");
            return;
        }

        // Mostrar la información del préstamo
        console.log(`Número de préstamo: ${prestamo.numPrestamo}`);
        console.log(`Número de socio: ${prestamo.numSocio}`);
        console.log(`Código del libro: ${prestamo.codLibro}`);
        console.log(`Fecha de préstamo: ${prestamo.fechaPrestamo}`);
        console.log(`Fecha de devolución: Pendiente`);
        console.log('-----------------------------------');
    });
}
