//FIFO
palabras = [];
palabras = prompt("Escribe unas palabras separados por comas: ")

const palabrasSep =  palabras.split(",");
console.log("Palabras introducidas: ", palabrasSep);

palabrasSep.push("Juan");
console.log(palabrasSep);

//palabrasSep.pop();
//console.log(palabrasSep.shift());

