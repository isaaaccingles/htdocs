
//Añadir, nombre, dni, fecha y hora. Comprobar si el carrito esta vacio
//Algoritmo letra dni

productos = ["12,56€", "7,25€", "36,73€", "22,22", "14,49", "3,50"];

// Convertir los precios de los productos de string a número flotante
for(i = 0; i < productos.length; i++){
    productos[i] = parseFloat(productos[i].replace(',', '.'));
}

//Verificar si el producto está vacio
if(productos.length == 0){
    document.getElementById("carritoEstado").innerHTML = "No se ha efectuado ninguna compra.";
}else{
    //Pedir nombre y dni
    nombre = prompt("Introduce tu nombre: ");
    dni = prompt("Introduce tu DNI: ");

    dniNumero = dni.slice(0, -1); //Extrae el numero del dni
    dniLetra = dni.slice(-1);//Extrae l aletra del dni

    letrasDni = "TRWAGMYFPDXBNJZSQVHLCKE";
    letraCorrecta = letrasDni[dniNumero % 23];

     // Si la letra del DNI es un número, añadimos la letra correcta automáticamente
    if (!isNaN(dniLetra)) {
        dni += letraCorrecta;
        alert("El DNI sin letra ha sido completado automáticamente. DNI completo: " + dni);
    } else {
        // Comprobamos si la letra introducida es correcta
        if (dniLetra.toUpperCase() !== letraCorrecta) {
            alert("La letra del DNI es incorrecta. Debería ser: " + letraCorrecta);
        } else {
            alert("DNI correcto.");
        }
  
    }
}

// Función para aplicar descuento si hay más de 5 productos
precioMasBarato = productos[0];

function aplicarDescuento(productos) {
    let sumaTotal = 0;

    for (let i = 0; i < productos.length; i++) {
        sumaTotal += productos[i];
        if (productos[i] < precioMasBarato) {
            precioMasBarato = productos[i];
        }
    }

    
    if (productos.length > 5) {
        sumaTotal -= precioMasBarato;// Aplicar descuento eliminando el más barato
        console.log("Se ha aplicado un descuento de: " + precioMasBarato + "€");
    }

    return sumaTotal.toFixed(2);
}

const sumaTotal = aplicarDescuento(productos);


sumaTotalStr = sumaTotal.toString().replace('.', ',');
console.log(sumaTotalStr);




for(i = 1; i <= productos.length;i++){
    document.getElementById(("Prod"+ i)).innerHTML= productos[i-1].toFixed(2).replace('.',',') + "€";
};

carritoEstado = productos.length;

document.getElementById("Ptotal").innerHTML=sumaTotalStr + "€";
document.getElementById("Nombre").innerHTML= "Nombre: " + nombre;
document.getElementById("DNI").innerHTML= "DNI: " + dni;
document.getElementById("Descuento").innerHTML = "Se ha aplicado un descuento de " + precioMasBarato.toFixed(2).replace('.', ',') + "€";
document.getElementById("carritoEstado").innerHTML = "Productos en el carrito: " + carritoEstado;
