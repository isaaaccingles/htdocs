
//Creamos los objetos Cliente y Viajes
const cliente = {nombre: "Isaac", apellido: "Inglés", miViaje: "Mallorca", telefono: "666 666 666", ciudad: "Boadilla del Monte", 
    contratado: function(){
        if(miViaje = ""){
            return "Sin viajes";
        }else{
            return this.miViaje;
        }
    }};


const viaje = {origen: "Madrid", destino: "Sevilla", precio: 10, duracion: 5, pais: "España",
trayecto: function(){
    console.log(viaje.origen + " - " + viaje.destino);
}
};

// for (clave in viaje){
//     if(typeof viaje[clave] !=  "function"){
//         console.log(clave + ":" + viaje[clave]);
//     }
// }

// viaje.trayecto();

//Constructores
function Viaje(origen, destino, precio, duracion, pais){
    this.origen = origen;
    this.destino = destino;
    this.precio = precio;
    this.duracion = duracion;
    this.pais = pais;
}


const mallorca = new Viaje("Madrid", "Mallorca",15, 3, "España");
// console.log(Mallorca);
const londres = new Viaje("Madrid", "Londres",12, 4, "Reino Unido");
// console.log(Londres);
const burgos = new Viaje("Madrid", "Burgos",25, 1, "España");
// console.log(Burgos);
const toledo = new Viaje("Madrid", "Toledo",129, 1, "España");
// console.log(roma);
const roma = new Viaje("Madrid", "Roma",90, 2, "Italia");


function burgosMes(mes, fechaSalida){
    this.mes = mes;
    this.fecha = fechaSalida;
}
//Aqui hacemos que burgos sea un prototipo de burgosEnero
const burgosEnero = new burgosMes("enero", "20/01/2025");
burgosEnero.__proto__=burgos;
//console.log(burgosEnero);


//Añadimos clientes
const cliente1 = new Cliente("Isaac", "Inglés", mallorca, "666 666 666", "Boadilla del Monte");
const cliente2 = new Cliente("Juan", "Pérez", burgos, "666 666 666", "Boadilla del Monte");
const cliente3 = new Cliente("Jesus", "Villaverde", toledo, "666 666 666", "Boadilla del Monte");
const cliente4 = new Cliente("Khaled", "Beno", londres, "666 666 666", "Boadilla del Monte");
const pepe = new Cliente("Pepe", "Alvarez", roma, "666 666 666", "Boadilla del Monte");



function Cliente(nombre, apellido, miViaje, telefono, ciudad, contratado){
    this.nombre = nombre;
    this.apellido = apellido;
    this.miViaje = miViaje;
    this.telefono = telefono;
    this.ciudad = ciudad;
    this.contratado = contratado;
}

//Info del cliente1
// for (clave in cliente1){
//     if(typeof viaje[clave] !=  "function"){
//         console.log(clave + ":" + cliente1[clave]);
//     }
// }

// console.log(cliente.contratado());


//----------------------------------------------


// -----------------------------------------------

//Clientes sin viajes
// arrayClientes.forEach((cliente) => {
//     if (cliente.miViaje == null || cliente.miViaje == "") {
//         console.log(`Cliente sin viajes: ${cliente.nombre}`);
//     }
// });


//--------------------------------------------------

//Dinero total gastado en viajes
// let dineroViajesTotal = 0;

// arrayClientes.forEach(cliente => {
//     if (cliente.miViaje != "") {
//         dineroViajesTotal += cliente.miViaje.precio;
//     }
// });

//console.log("El dinero total gastado en viajes es: " + dineroViajesTotal + " euros ");

//--------------------------------------------------

const direccion01 = {calle: "Av.Nuevo mundo", numero: "14", piso: "4-A"};
const agencia = {
    nif: "09143879J",
    direccion: direccion01,
    telefono: "684352974",
    dirCom: function() {
        return this.direccion.calle + "," + this.direccion.numero + "," + this.direccion.piso;
    }
};

//console.log(agencia.dirCom());
agencia.__proto__ = direccion01;
mallorca.__proto__=agencia;
londres.__proto__=agencia;
burgos.__proto__=agencia;
toledo.__proto__=agencia;
roma.__proto__=agencia;
console.log(roma);

// sacar direccin de la agencia y su telefono
console.log("Direccion: "+roma.direccion.calle + ", telefono: " + roma.telefono);

//Creacion de arrays de objetos

const arrayClientes = [
    cliente1,
    cliente2,
    cliente3,
    cliente4
];

// console.log(arrayClientes);

const arrayViaje = [
    mallorca,
    londres,
    burgos,
    toledo
];

//console.log(arrayViaje);

// arrayViaje.forEach(viaje => {
//     viaje.__proto__=agencia;
// });
// console.log(arrayViaje);

// arrayClientes.forEach(cliente=>{
//         arrayViaje.forEach(viaje=>{
//             if(cliente.miViaje == viaje){
//                 arrayClientes.__proto__=viaje;
//             }
//         })
//     })

// console.log(cliente1);
// console.log(cliente2);
// console.log(cliente3);
// console.log(cliente4);
// console.log(pepe);


arrayClientes.forEach(cliente =>{
    console.log("Nombre: " + cliente.nombre + ", Destino: " + cliente.miViaje.destino + ", Origen: " + cliente.miViaje.origen + 
        ", Precio: " + cliente.miViaje.precio + ", NIF agencia: " + cliente.miViaje.nif + ", direccion agencia: " + cliente.miViaje.dirCom() + ", telefono agencia: " + cliente.miViaje.telefono);
})



