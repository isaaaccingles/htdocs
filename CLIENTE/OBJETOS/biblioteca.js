
document.addEventListener('DOMContentLoaded', () => {
    const lectoresInput = document.getElementById('file-lectores');
    const librosInput = document.getElementById('file-libros');

    lectoresInput.addEventListener('change', async (e) => {
        const archivo = e.target.files[0];
        if (!archivo || !archivo.name.endsWith(".csv")) {
            alert("Por favor, selecciona un archivo CSV válido para Lectores.");
            return;
        }

        try {
            const contenido = await leerArchivo(archivo);
            procesarLectoresCSV(contenido);
            console.log("Lectores cargados:", lectoresArray);
        } catch (error) {
            console.error("Error leyendo el archivo de lectores:", error);
        }
    });

    librosInput.addEventListener('change', async (e) => {
        const archivo = e.target.files[0];
        if (!archivo || !archivo.name.endsWith(".csv")) {
            alert("Por favor, selecciona un archivo CSV válido para Libros.");
            return;
        }

        try {
            const contenido = await leerArchivo(archivo);
            procesarLibrosCSV(contenido);
            console.log("Libros cargados:", librosArray);
        } catch (error) {
            console.error("Error leyendo el archivo de libros:", error);
        }
    });
});

async function leerArchivo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}

// Procesar contenido CSV de Lectores
function procesarLectoresCSV(contenido) {
    const lineas = contenido.split('\n');
    for (let i = 1; i < lineas.length; i++) { 
        const linea = lineas[i].trim();
        if (linea) {
            const [numSocio, nombre, apellido, telefono, email] = linea.split(',');
            const nuevoLector = new lectores(numSocio, nombre, apellido, telefono, email);
            lectoresArray.push(nuevoLector);
        }
    }
}

// Procesar contenido CSV de Libros
function procesarLibrosCSV(contenido) {
    const lineas = contenido.split('\n');
    for (let i = 1; i < lineas.length; i++) { 
        const linea = lineas[i].trim();
        if (linea) {
            const [codLibro, isbn, autor, titulo, editorial, ejemplares, clasificacion] = linea.split(',');
            const nuevoLibro = new libros(codLibro, isbn, autor, titulo, editorial, parseInt(ejemplares), clasificacion);
            librosArray.push(nuevoLibro);
        }
    }
}


async function leerArchivo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}



// Lectores
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
            baja: true,
            fechaBaja: new Date().toLocaleDateString()
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

// Libros
function libros(codLibro, isbn, autor, titulo, editorial, ejemplares, clasificacion) {
    this.codLibro = codLibro;
    this.isbn = isbn;
    this.autor = autor;
    this.titulo = titulo;
    this.editorial = editorial;
    this.ejemplares = ejemplares;
    this.clasificacion = clasificacion;
}

// Préstamos
function prestamos(numPrestamo, numSocio, codLibro, fechaPrestamo, fechaDevolucion) {
    this.numPrestamo = numPrestamo;
    this.numSocio = numSocio;
    this.codLibro = codLibro;
    this.fechaPrestamo = fechaPrestamo;
    this.fechaDevolucion = fechaDevolucion;
}

// Clasificación
const clasificacion = { pasillo: "7", estanteria: "4", estante: "6" };

const lectoresArray = [];
const librosArray = [];

// Alta Lector
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
    let lectorExistente = lectoresArray.find(lector => lector.numSocio === numSocio);
    if (lectorExistente) {
        return "El número de socio ya existe";
    }

    let nuevoLector = new lectores(numSocio, nombre, apellido, telefono, email);
    lectoresArray.push(nuevoLector);

    return "Lector dado de alta correctamente";
}

//Baja lector
function bajaLector(numSocio) {
    let lector = lectoresArray.find(lector => lector.numSocio === numSocio);
    if (lector) {
        lector.darDeBaja();
        return `Lector con número de socio ${numSocio} dado de baja correctamente.`;
    } else {
        return "Lector no encontrado.";
    }
}

//Modificar lector
function modificarLector(numSocio) {
    let lector = lectoresArray.find(lector => lector.numSocio === numSocio);
    if (!lector) {
        return "Lector no encontrado.";
    }
    let dato = prompt("¿Qué dato deseas modificar? (nombre, apellido, telefono, email): ");
    let nuevoValor = prompt("Introduce el nuevo valor: ");
    lector.modificarLector(dato, nuevoValor);
    return `Dato ${dato} del lector ${numSocio} actualizado correctamente.`;
}

//Comprobar emails
function comprobarEmails() {
    let invalidos = [];
    lectoresArray.forEach(lector => {
        let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(lector.email)) {
            invalidos.push(`${lector.nombre} ${lector.apellido} + ${lector.email}`);
        }
    });
    return invalidos.length ? invalidos : "Todos los emails son válidos.";
}

//Comprobar telefonos
function comprobarTelefonos() {
    let invalidos = [];
    lectoresArray.forEach(lector => {
        let telefonoRegex = /^\d{9}$/; 
        if (!telefonoRegex.test(lector.telefono)) {
            invalidos.push(`${lector.nombre} ${lector.apellido} + ${lector.telefono}`);
        }
    });
    return invalidos.length ? invalidos : "Todos los teléfonos son válidos.";
}


// console.log(altaLector());
// console.log(lectoresArray);

// console.log(bajaLector(1)); 
console.log(modificarLector("")); 

// console.log(comprobarEmails()); 
// console.log(comprobarTelefonos()); 
