numeros = prompt("Escribe unos numeros separados por comas: ")

const numerosSep =  numeros.split(",");
console.log("Numeros introducidos: " + numerosSep);

ahora = new Date().getDate();
console.log("Dia del mes: " + ahora);

if (numerosSep.includes(ahora.toString())){
    console.log("Hoy alguien cumple años");
}else{
    console.log("Nadie cumple años hoy");
}
