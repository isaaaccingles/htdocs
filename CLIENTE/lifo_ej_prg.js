//a añadir, q quitar, fin
//que ha añadido, decir tamaño y listar

const arr = ["Alvaro", "Miguel", "Asier", "Jesus"];
palabras = "";

while (palabras != "FIN"){

palabras = prompt("Añadir elemento(a), quitar(q), o terminar(FIN): ");


if(palabras == "a"){

    añadir = prompt("Escribe una palabra");
    arr.push(añadir);
    console.log(arr);
    console.log("Se ha añadido: ", añadir);
    console.log("El tamaño del array ahora es: ", arr.length);

}else if(palabras == "q"){

    eliminado = arr.shift();
    console.log(arr);
    console.log("Se ha quitado: ", eliminado);
    console.log("El tamaño del array ahora es: ", arr.length);

}else if(palabras == "FIN"){

    console.log(arr);
    console.log("El tamaño del arreglo ahora es: ", arr.length);

}else{
    confirm("ERROR: Letra/Palabra no valida. Pulsa aceptar para continuar");
}
}

document.getElementById("tamaño").innerHTML="El tamaño de la pila: " + arr.length;
document.getElementById("pila").innerHTML="La pila final: " + arr;
