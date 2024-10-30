//FIFO
palabras = [];
palabras = prompt("Escribe unas palabras separados por comas: ")

const palabrasSep =  palabras.split(",");
console.log(palabrasSep);

palabrasSep.push("Juan");
//palabrasSep.unshift("Juan");
console.log(palabrasSep);

console.log(palabrasSep.shift());

