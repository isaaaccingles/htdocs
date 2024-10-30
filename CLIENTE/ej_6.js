numeros = prompt("Escribe unos numeros separados por comas: ")

const numerosSep =  numeros.split(",");
console.log("Numeros introducidos: " + numerosSep);

numerosSep.sort(function(a,b){return a -b});
console.log("Mayor a menor: " + numerosSep);

numerosSep.reverse();
console.log("Menor a mayor: " + numerosSep);


