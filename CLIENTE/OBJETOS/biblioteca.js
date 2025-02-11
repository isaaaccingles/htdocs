// Definir arrays globales
const arrayLectores = [];
const arrayLibros = [];
let prestamosArray = [];


async function leerArchivo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}

function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    if (elemento) {
        elemento.innerHTML = contenido;
    }
}

document.getElementById('importar-input-lectores').addEventListener('change', async (e) => {
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

        const numSocio = partes[0];
        const nombre = partes[1];
        const apellido = partes[2];
        const telefono = partes[3];
        const email = partes[4];

        const nuevoLector = new lectores(numSocio, nombre, apellido, telefono, email);
        arrayLectores.push(nuevoLector);
    });

}, false);

document.getElementById('importar-input-libros').addEventListener('change', async (e) => {
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

        const codLibro = partes[0];
        const isbn = partes[1];
        const autor = partes[2];
        const titulo = partes[3];
        const editorial = partes[4];
        const ejemplares = partes[5];

        const nuevoLibro = new libros(codLibro, isbn, autor, titulo, editorial, ejemplares);
        arrayLibros.push(nuevoLibro);
    });

}, false);

const clasificacion = {pasillo: 7, estanteria: 4, estante: 6};

function Lectores(nombre, apellido, telefono, email, fechaBaja) {

    // Expresiones regulares para validación
    const nombreVal = /^[a-zA-ZÀ-ÿ]+(?:[\s-][a-zA-ZÀ-ÿ]+)?$/; // Letras con acentos, guiones y espacios
    const apellidoVal = /^[a-zA-ZÀ-ÿ]+(?:[\s-][a-zA-ZÀ-ÿ]+)?$/; // Letras con acentos, guiones y espacios
    const telefonoVal = /^\d{9}$/; // Exactamente 9 dígitos
    const emailVal = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email con formato básico
    const fechaVal = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/; // Formato dd/mm/yyyy

    // Validación de los parámetros
    if (!nombreVal.test(nombre)) {
        throw new Error("El nombre no es válido. Debe ser una o dos palabras con letras del alfabeto español, pudiendo incluir guiones.");
    }

    if (!apellidoVal.test(apellido)) {
        throw new Error("El apellido no es válido. Debe ser una o dos palabras con letras del alfabeto español, pudiendo incluir guiones.");
    }

    if (!telefonoVal.test(telefono)) {
        throw new Error("El teléfono no es válido. Debe contener exactamente 9 cifras.");
    }

    if (!emailVal.test(email)) {
        throw new Error("El correo electrónico no es válido.");
    }

    if (fechaBaja && !fechaVal.test(fechaBaja)) {
        throw new Error("La fecha de baja no es válida. Debe tener el formato dd/mm/yyyy.");
    }

    // Generación del número de socio único
    Lectores.siguienteNumSocio = (Lectores.siguienteNumSocio || 1000) + 1;
    this.numSocio = Lectores.siguienteNumSocio;

    // Asignación de las propiedades
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.email = email;
    this.fechaBaja = fechaBaja || null; 
    this.activo = true; 
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
            if (!nombreVal.test(nuevoValor)) {
                throw new Error("El nombre no es válido.");
            }
            this.nombre = nuevoValor;
        } else if (dato === 'apellido') {
            if (!apellidoVal.test(nuevoValor)) {
                throw new Error("El apellido no es válido.");
            }
            this.apellido = nuevoValor;
        } else if (dato === 'telefono') {
            if (!telefonoVal.test(nuevoValor)) {
                throw new Error("El teléfono debe contener exactamente 9 cifras.");
            }
            this.telefono = nuevoValor;
        } else if (dato === 'email') {
            if (!emailVal.test(nuevoValor)) {
                throw new Error("El correo electrónico no es válido.");
            }
            this.email = nuevoValor;
        } else if (dato === 'fechaBaja') {
            if (nuevoValor && !fechaVal.test(nuevoValor)) {
                throw new Error("La fecha de baja no es válida. Debe tener el formato dd/mm/yyyy.");
            }
            this.fechaBaja = nuevoValor;
        }
    };
}

function Libros(codLibro, isbn, autor, titulo, editorial, ejemplares, clasificacion, fechaBaja) {

    const isbnVal = /^(?:\d{3}-)?\d{1,5}-\d{1,7}-\d{1,7}-\d{1,7}$/; 
    const autorVal = /^[a-zA-ZÀ-ÿ]+(?:[\s-][a-zA-ZÀ-ÿ]+)?$/; 
    const tituloVal = /^[a-zA-ZÀ-ÿ0-9\s\-_¡!@#$%&/()¿?€.,;:]+$/; 
    const editorialVal = /^[a-zA-ZÀ-ÿ]+(?:[\s-][a-zA-ZÀ-ÿ]+)?$/; 
    const ejemplaresVal = /^\d+$/; 
    const fechaBajaVal = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/; 

    // Validación de los parámetros
    if (!isbnVal.test(isbn)) {
        throw new Error("El ISBN no es válido. Debe seguir el formato de ISBN-13.");
    }
    if (!autorVal.test(autor)) {
        throw new Error("El autor no es válido. Debe ser una o dos palabras con letras del alfabeto español, pudiendo incluir guiones.");
    }
    if (!tituloVal.test(titulo)) {
        throw new Error("El título no es válido.");
    }
    if (!editorialVal.test(editorial)) {
        throw new Error("La editorial no es válida. Debe ser una o dos palabras con letras del alfabeto español, pudiendo incluir guiones.");
    }
    if (!ejemplaresVal.test(ejemplares) || ejemplares < 1) {
        throw new Error("El número de ejemplares no es válido. Debe ser un número mayor que 0.");
    }
    if (fechaBaja && !fechaBajaVal.test(fechaBaja)) {
        throw new Error("La fecha de baja no es válida. Debe tener el formato dd/mm/aaaa.");
    }

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


    this.darDeBaja = function() {
        this.bajaLibro = {
            baja: true,
            fechaBaja: new Date().toLocaleDateString('en-GB') 
    };


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
            // Validación de nueva fecha de baja
            if (!fechaBajaVal.test(nuevoValor)) {
                throw new Error("La fecha de baja no es válida. Debe tener el formato dd/mm/aaaa.");
            }
            this.fechaBaja = nuevoValor;
        }
    };
    }
}

function Prestamo(numSocio, codLibro, fechaPrestamo, fechaDevolucion) {

    
    const fechaVal = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    // Validación de las fechas
    if (!fechaVal.test(fechaPrestamo)) {
        throw new Error("La fecha de préstamo no es válida. Debe tener el formato dd/mm/yyyy.");
    }

    if (!fechaVal.test(fechaDevolucion)) {
        throw new Error("La fecha de devolución no es válida. Debe tener el formato dd/mm/yyyy.");
    }

    // Asignar el siguiente número de préstamo
    Prestamo.siguienteNumPres = (Prestamo.siguienteNumPres || 1000) + 1;
    this.numPrestamo = Prestamo.siguienteNumPres;


    this.numSocio = numSocio;
    this.codLibro = codLibro;
    this.fechaPrestamo = fechaPrestamo;
    this.fechaDevolucion = fechaDevolucion;
}

function altaLector() {

    let nombre = prompt("Escribe tu nombre: ");
    let apellido = prompt("Escribe tu apellido: ");
    let telefono = prompt("Escribe tu teléfono: ");
    let email = prompt("Escribe tu email: ");

    // Verificar si algún campo está vacío
    if (!nombre || !apellido || !telefono || !email) {
        return "F";  
    }

    // Verificar formato del teléfono 
    let telefonoValido = /^\d{10}$/.test(telefono);
    if (!telefonoValido) {
        return "V";  // Formato de teléfono incorrecto
    }

    // Verificar formato del email 
    let emailValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    if (!emailValido) {
        return "V";  
    }

    // Verificar si el email ya existe
    let lectorExistente = arrayLectores.find(lector => lector.email === email);
    if (lectorExistente) {
        return "V";  
    }

    let nuevoLector = new Lector(nombre, apellido, telefono, email);
    arrayLectores.push(nuevoLector);

    return nuevoLector.numSocio;  
}

function bajaLector() {
    
    let numSocio = prompt("Introduce el email del lector a dar de baja: ");

   
    let lectorExistente = arrayLectores.find(lector => lector.numSocio === numSocio);

    
    if (!lectorExistente) {
        console.log("E"); 
        return;
    }

   
    let diaBaja = prompt("Introduce el día de la baja (DD): ");
    let mesBaja = prompt("Introduce el mes de la baja (MM): ");
    let añoBaja = prompt("Introduce el año de la baja (AAAA): ");

    // Validar que la fecha es correcta
    if (!diaBaja || !mesBaja || !añoBaja || isNaN(diaBaja) || isNaN(mesBaja) || isNaN(añoBaja) ||
        diaBaja < 1 || diaBaja > 31 || mesBaja < 1 || mesBaja > 12 || añoBaja < 1900) {
        console.log("E");  // Error en la fecha de baja
        return;
    }

    lectorExistente.bajaLector = true;
    lectorExistente.fechaBaja = `${diaBaja}/${mesBaja}/${añoBaja}`;

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

function bajaLibro(codLibro) { 
    let libro = arrayLibros.find(libro => libro.codLibro === codLibro);
    if (libro) {
        libro.darDeBaja();
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

function prestamoLibro(numSocio, codLibro) {
    // Buscar el lector y el libro
    let lector = arrayLectores.find(lector => lector.numSocio === numSocio);
    let libro = arrayLibros.find(libro => libro.codLibro === codLibro);

    // Validación de existencia del lector
    if (!lector) {
        return "El número de socio no existe.";
    }

    // Validación de existencia y disponibilidad del libro
    if (!libro) {
        return "El código del libro no existe.";
    }

    if (libro.ejemplares <= 0) {
        return "No hay ejemplares disponibles para préstamo.";
    }

    // Solicitar y validar la fecha de devolución
    let fechaDevolucion = prompt("Introduce la fecha de devolución (dd/mm/yyyy): ").trim();
    if (!fechaDevolucion || !/^\d{2}\/\d{2}\/\d{4}$/.test(fechaDevolucion)) {
        return "La fecha de devolución es obligatoria y debe tener el formato dd/mm/yyyy.";
    }

    // Crear un nuevo préstamo
    let numPrestamo = `${numSocio}-${codLibro}-${Date.now()}`;
    let fechaPrestamo = new Date().toLocaleDateString();

    let nuevoPrestamo = new Prestamo(numPrestamo, numSocio, codLibro, fechaPrestamo, fechaDevolucion);

    // Agregar el préstamo al registro
    prestamosArray.push(nuevoPrestamo);

    // Descontar un ejemplar del libro
    libro.ejemplares -= 1;

    return `Libro prestado correctamente. Número de préstamo: ${numPrestamo}`;
}

function devolverLibro(numPrestamo) {
    let prestamo = prestamosArray.find(p => p.numPrestamo === numPrestamo);

    if (!prestamo) {
        return "Préstamo no encontrado.";
    }

    let libro = arrayLibros.find(libro => libro.codLibro === prestamo.codLibro);
    if (libro) {
        libro.ejemplares += 1; 
    }

    // Eliminar préstamo
    prestamosArray = prestamosArray.filter(p => p.numPrestamo !== numPrestamo);
    return `Libro devuelto correctamente. Número de préstamo: ${numPrestamo}`;
}

function dondeLibro(isbn) {
    let libro = arrayLibros.find(libro => libro.isbn === isbn);
    
    if (!libro) {
        return "Libro no encontrado.";
    }
    
    // Devolver la ubicación del libro
    return `Ubicación del libro con isbn = ${libro.isbn}: Pasillo ${libro.clasificacion.pasillo}, Estantería ${libro.clasificacion.estanteria}, Estante ${libro.clasificacion.estante}.`;
}

function prestamoLibro(numSocio, cod_isbn) {
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

