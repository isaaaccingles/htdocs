palabras = prompt("Escribe unas palabras separados por comas: ")

const palabrasSep =  palabras.split(",");
console.log("Palabras introducidas: " + palabrasSep);
palabrasSep.sort((a,b) => a.localeCompare(b));
console.log(palabrasSep);

palabrasSep.reverse((a,b) => a.localeCompare(b));
console.log(palabrasSep);