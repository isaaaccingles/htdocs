
//Objeto lectores
function lectores(numSocio, nombre, apellido, telefono, email, bajaLector){
    this.numSocio = numSocio;
    this.nombre = nombre;
    this.apellido = apellido;
    this.telefono = telefono;
    this.email = email;
    this.bajaLector = function(){
        bajaLector = false;
        
    }
}

const Julia = new lectores("465", "Julia", "Martínez", "644994312", "jmar@gmail.com");
const PedroLuis = new lectores("687", "Pedro Luis", "Pérez", "611894466", "pper@gmail.com");
const Elena = new lectores("612", "Elena", "Lopez", "638t94652", "elopez@hotmail.es");
const Manuel = new lectores("911", "Manuel", "Velasco", "611733917", "manuelvel@gmaileu");
const Diego = new lectores("132", "Diego", "Alcaraz", "623891175", "diego.alcaraz.gmail.au");
const Isabel = new lectores("175", "Isabel", "Martín", "6779446339", "isa.mar22@gmail.com");
const Juan = new lectores("426", "Juan", "López", "633911691", "julo3776@gmailcom");
const JoseAntonio = new lectores("344", "Jose Antonio", "Pérez", "66819955", "japerez11@gmail..com");



//Objeto libros
function libros(codLibro, isbn, autor, titulo, editorial, ejemplares){
    this.codLibro = codLibro;
    this.isbn = isbn;
    this.autor = autor;
    this.titulo = titulo;
    this.editorial = editorial;
    this.ejemplares = ejemplares;
}


//Objeto prestamos
function prestamos(numPrestamo, numSocio, codLibro, fechaPrestamo, fechaDevolucion){
    this.numPrestamo = numPrestamo;
    this.numSocio = numSocio;
    this.codLibro = codLibro;
    this.fechaPrestamo = fechaPrestamo;
    this.fechaDevolucion = fechaDevolucion;
}


//Objeto Clasificacion
const clasificacion = {pasillo: "7", estanteria: "4", estante: "6"};

//-----------------------------------------32134234

const lectoresArray = [
    Julia,
    PedroLuis,
    Elena,
    Manuel,
    Diego,
    Isabel,
    Juan,
    JoseAntonio
];


function altaLector() {
    let numSocio = prompt("Escribe tu número de socio: ");
    let nombre = prompt("Escribe tu nombre: ");
    let apellido = prompt("Escribe tu apellido: ");
    let telefono = prompt("Escribe tu teléfono: ");
    let email = prompt("Escribe tu email: ");

    if (!numSocio || !nombre || !apellido || !telefono || !email) {
        return "Por favor, rellene todos los campos";
    }

    let nuevoLector = new lectores(numSocio, nombre, apellido, telefono, email);

    lectoresArray.push(nuevoLector);

    return "Lector dado de alta correctamente";
}

console.log(altaLector());
console.log(lectoresArray);

