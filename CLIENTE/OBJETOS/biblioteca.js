// Definir arrays globales
const arrayLectores = [];
const arrayLibros = [];

// Función para leer archivo de texto
async function leerArchivo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}

// Función para mostrar contenido del archivo
function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    if (elemento) {
        elemento.innerHTML = contenido;
    }
}

// Manejar eventos de entrada de archivo (Lectores)
document.getElementById('file-lectores').addEventListener('change', async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    const contenido = await leerArchivo(archivo);

    const lineas = contenido.split('\r\n'); 
    lineas.shift(); 

    arrayLectores.length = 0;
    lineas.forEach(linea => {
        const partes = linea.split(",");

        const numSocio = partes[0].trim();
        const nombre = partes[1].trim();
        const apellido = partes[2].trim();
        const telefono = partes[3].trim();
        const email = partes[4].trim();

        const nuevoLector = new lectores(numSocio, nombre, apellido, telefono, email);
        arrayLectores.push(nuevoLector);
    });

}, false);


document.getElementById('file-libros').addEventListener('change', async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    const contenido = await leerArchivo(archivo);

    const lineas = contenido.split('\r\n');
    lineas.shift(); 

    arrayLibros.length = 0;
    lineas.forEach(linea => {
        const partes = linea.split(",");

        const codLibro = partes[0].trim();
        const isbn = partes[1].trim();
        const autor = partes[2].trim();
        const titulo = partes[3].trim();
        const editorial = partes[4].trim();
        const ejemplares = partes[5].trim();

        const nuevoLibro = new libros(codLibro, isbn, autor, titulo, editorial, ejemplares);
        arrayLibros.push(nuevoLibro);
    });

}, false);

//Defino el objeto Clasificacion
const clasificacion = {pasillo: 7, estanteria: 4, estante: 6};


// Función constructora de Lectores
function lectores(numSocio, nombre, apellido, telefono, email) {
    this.numSocio = numSocio;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.email = email;
    this.activo = true;
    this.bajaLector = null;

    this.darDeBaja = function() {
        this.activo = false;
        this.bajaLector = {
            baja: true
        };
    };

    // Función para modificar los datos del lector
    this.modificarLector = function(dato, nuevoValor) {
        if (dato === 'nombre') {
            this.nombre = nuevoValor;
        } else if (dato === 'apellido') {
            this.apellido = nuevoValor;
        } else if (dato === 'telefono') {
            this.telefono = nuevoValor;
        } else if (dato === 'email') {
            this.email = nuevoValor;
        }
    };
}

// Función constructora de Libros
function libros(codLibro, isbn, autor, titulo, editorial, ejemplares) {
    this.codLibro = codLibro;
    this.isbn = isbn;
    this.autor = autor;
    this.titulo = titulo;
    this.editorial = editorial;
    this.ejemplares = ejemplares;
    this.bajaLibro = null;
    this.clasificacion = clasificacion;

    this.darDeBaja = function() {
        this.activo = false;
        this.bajaLibro = {
            baja: true
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
        }
    };
}


let prestamosArray = [];

// Función constructora para crear un nuevo préstamo
function prestamos(numPrestamo, numSocio, codLibro, fechaPrestamo, fechaDevolucion) {
    this.numPrestamo = numPrestamo;
    this.numSocio = numSocio;
    this.codLibro = codLibro;
    this.fechaPrestamo = fechaPrestamo;
    this.fechaDevolucion = fechaDevolucion;
}


// Función para alta de lector
function altaLector() {
    let numSocio = prompt("Escribe tu número de socio: ");
    let nombre = prompt("Escribe tu nombre: ");
    let apellido = prompt("Escribe tu apellido: ");
    let telefono = prompt("Escribe tu teléfono: ");
    let email = prompt("Escribe tu email: ");

    if (!numSocio || !nombre || !apellido || !telefono || !email) {
        return "Por favor, rellene todos los campos";
    }

    // Verificar si ya existe el lector
    let lectorExistente = arrayLectores.find(lector => lector.numSocio === numSocio);
    if (lectorExistente) {
        return "El número de socio ya existe";
    }

    let nuevoLector = new lectores(numSocio, nombre, apellido, telefono, email);
    arrayLectores.push(nuevoLector);

    return "Lector dado de alta correctamente";
}

// Función para modificar lector
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

// Función para comprobar emails válidos
function comprobarEmails() {
    let invalidos = [];
    arrayLectores.forEach(lector => {
        let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(lector.email)) {
            invalidos.push(`${lector.nombre} ${lector.apellido} + ${lector.email}`);
        }
    });
    return invalidos.length ? invalidos : "Todos los emails son válidos.";
}

// Función para comprobar teléfonos válidos
function comprobarTelefonos() {
    let invalidos = [];
    arrayLectores.forEach(lector => {
        let telefonoRegex = /^\d{9}$/;
        if (!telefonoRegex.test(lector.telefono)) {
            invalidos.push(`${lector.nombre} ${lector.apellido} + ${lector.telefono}`);
        }
    });
    return invalidos.length ? invalidos : "Todos los teléfonos son válidos.";
}


// Función para alta de libro
function altaLibro() {
    let codLibro = prompt("Escribe el código del libro: ");
    let isbn = prompt("Escribe el ISBN del libro: ");
    let autor = prompt("Escribe el autor del libro: ");
    let titulo = prompt("Escribe el título del libro: ");
    let editorial = prompt("Escribe la editorial del libro: ");
    let ejemplares = parseInt(prompt("Escribe el número de ejemplares del libro: "));

    if (!codLibro || !isbn || !autor || !titulo || !editorial || isNaN(ejemplares)) {
        return "Por favor, rellene todos los campos correctamente";
    }

    // Verificar si ya existe el libro
    let libroExistente = arrayLibros.find(libro => libro.codLibro === codLibro);
    if (libroExistente) {
        return "El código del libro ya existe";
    }

    let nuevoLibro = new libros(codLibro, isbn, autor, titulo, editorial, ejemplares);
    arrayLibros.push(nuevoLibro);

    return "Libro dado de alta correctamente";
}

// Función para modificar libro
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

// Función para baja de libro
function bajaLibro(codLibro) {
    let libro = arrayLibros.find(libro => libro.codLibro === codLibro);
    if (libro) {
        libro.darDeBaja();
        return `Libro con código ${codLibro} dado de baja correctamente.`;
    } else {
        return "Libro no encontrado.";
    }
}

// Función para comprobar si existe un libro por ISBN
function hayLibro(isbn) {
    let libroEncontrado = arrayLibros.find(libro => libro.isbn === isbn);
    
    if (libroEncontrado) {
        return {
            isbn: libroEncontrado.isbn,
            autor: libroEncontrado.autor,
            titulo: libroEncontrado.titulo,
            ejemplares: libroEncontrado.ejemplares
        };
    } else {
        console.log("Libro no encontrado");
        return "Libro no encontrado";
    }
}

// Función para gestionar los préstamos
function prestarLibro(numSocio, codLibro) {
    let lector = arrayLectores.find(lector => lector.numSocio === numSocio);
    let libro = arrayLibros.find(libro => libro.codLibro === codLibro);
    
    if (!lector) {
        return "Lector no encontrado.";
    }
    if (!libro) {
        return "Libro no encontrado.";
    }
    if (libro.ejemplares <= 0) {
        return `No hay ejemplares disponibles del libro ${libro.titulo}.`;
    }

    // Crear un nuevo préstamo
    let numPrestamo = `${numSocio}-${codLibro}-${new Date().getTime()}`;
    let fechaPrestamo = new Date().toLocaleDateString();
    let fechaDevolucion = prompt("Introduce la fecha de devolución (dd/mm/yyyy): ").trim();

    if (!fechaDevolucion) {
        return "La fecha de devolución es obligatoria.";
    }

    let nuevoPrestamo = new prestamos(numPrestamo, numSocio, codLibro, fechaPrestamo, fechaDevolucion);

    // Disminuir el número de ejemplares del libro
    libro.ejemplares -= 1;

    return `Libro prestado correctamente. Número de préstamo: ${numPrestamo}`;
}

// Función para devolver libro
function devolverLibro(numPrestamo) {
    let prestamo = prestamosArray.find(p => p.numPrestamo === numPrestamo);

    if (!prestamo) {
        return "Préstamo no encontrado.";
    }

    let libro = arrayLibros.find(libro => libro.codLibro === prestamo.codLibro);
    if (libro) {
        libro.ejemplares += 1; // Aumentar ejemplares disponibles
    }

    // Eliminar préstamo
    prestamosArray = prestamosArray.filter(p => p.numPrestamo !== numPrestamo);
    return `Libro devuelto correctamente. Número de préstamo: ${numPrestamo}`;
}

// Función para buscar un libro por ISBN y devolver la ubicación (pasillo, estantería y estante)
function dondeLibro(isbn) {
    let libro = arrayLibros.find(libro => libro.isbn === isbn);
    
    if (!libro) {
        return "Libro no encontrado.";
    }
    
    // Devolver la ubicación del libro
    return `Ubicación del libro con isbn = ${libro.isbn}: Pasillo ${libro.clasificacion.pasillo}, Estantería ${libro.clasificacion.estanteria}, Estante ${libro.clasificacion.estante}.`;
}

function solicitudPrestamo(numSocio, cod_isbn) {
    let lector = arrayLectores.find(lector => lector.numSocio === numSocio);
    if (!lector) {
        return "Lector no encontrado.";
    }

    // Buscar el libro por código o ISBN
    let libro = arrayLibros.find(libro => libro.codLibro === cod_isbn || libro.isbn === cod_isbn);
    if (!libro) {
        return "Libro no encontrado.";
    }

    // Verificar si hay ejemplares disponibles
    if (libro.ejemplares <= 0) {
        return `No hay ejemplares disponibles del libro ${libro.titulo}.`;
    }

    // Crear el nuevo número de préstamo
    let numPrestamo = `${numSocio}-${cod_isbn}-${new Date().getTime()}`;
    let fechaPrestamo = new Date().toLocaleDateString();
    let fechaDevolucion = prompt("Introduce la fecha de devolución (dd/mm/yyyy): ").trim();

    if (!fechaDevolucion) {
        return "La fecha de devolución es obligatoria.";
    }

    // Crear un nuevo objeto de préstamo
    let nuevoPrestamo = new prestamos(numPrestamo, numSocio, cod_isbn, fechaPrestamo, fechaDevolucion);

    // Disminuir el número de ejemplares del libro
    libro.ejemplares -= 1;

    prestamosArray.push(nuevoPrestamo);

    return `Préstamo solicitado correctamente. Número de préstamo: ${numPrestamo}`;
}

function devolucionPrestamos(numPrestamo) {
    // Buscar el préstamo por su número de préstamo
    let prestamo = prestamosArray.find(p => p.numPrestamo === numPrestamo);
    if (!prestamo) {
        return "Préstamo no encontrado.";
    }

    // Buscar el libro asociado al préstamo
    let libro = arrayLibros.find(libro => libro.codLibro === prestamo.codLibro);
    if (!libro) {
        return "Libro no encontrado.";
    }

    // Actualizar la fecha de devolución en el préstamo
    prestamo.fechaDevolucion = new Date().toLocaleDateString();

    // Incrementar el número de ejemplares del libro
    libro.ejemplares += 1;

    // Eliminar el préstamo de la lista de préstamos
    prestamosArray = prestamosArray.filter(p => p.numPrestamo !== numPrestamo);

    return `Libro devuelto correctamente. Número de préstamo: ${numPrestamo}`;
}

function listadoTotalPrestamos() {
    if (prestamosArray.length === 0) {
        return "No hay préstamos registrados.";
    }

    let listado = "Listado Total de Préstamos:\n";
    prestamosArray.forEach(prestamo => {
        listado += `Número de Préstamo: ${prestamo.numPrestamo}\n`;
        listado += `Número de Socio: ${prestamo.numSocio}\n`;
        listado += `Código del Libro: ${prestamo.codLibro}\n`;
        listado += `Fecha de Préstamo: ${prestamo.fechaPrestamo}\n`;
        listado += `Fecha de Devolución: ${prestamo.fechaDevolucion || "Pendiente"}\n`;
    });

    return listado;
}

function listadoPrestamosVivos() {
    let prestamosVivos = prestamosArray.filter(prestamo => !prestamo.fechaDevolucion);

    if (prestamosVivos.length === 0) {
        return "No hay préstamos vivos.";
    }

    let listado = "Listado de Préstamos Vivos:\n";
    prestamosVivos.forEach(prestamo => {
        listado += `Número de Préstamo: ${prestamo.numPrestamo}\n`;
        listado += `Número de Socio: ${prestamo.numSocio}\n`;
        listado += `Código del Libro: ${prestamo.codLibro}\n`;
        listado += `Fecha de Préstamo: ${prestamo.fechaPrestamo}\n`;
        listado += `Fecha de Devolución: Pendiente\n`;
    });

    return listado;
}
