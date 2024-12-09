
// Ejercicio 1: Convierte el string "Hola Mundo" a minúsculas y mayúsculas.
let texto = "Hola Mundo";
console.log(texto.toLowerCase()); // "hola mundo"
console.log(texto.toUpperCase()); // "HOLA MUNDO"

// Ejercicio 2: Encuentra la posición de la primera y última aparición de la letra "o" en el string "Hola Mundo".
console.log(texto.indexOf("o")); // 1
console.log(texto.lastIndexOf("o")); // 7

// Ejercicio 3: Verifica si el string "Hola Mundo" comienza con "Hola" y termina con "Mundo".
console.log(texto.startsWith("Hola")); // true
console.log(texto.endsWith("Mundo")); // true

// Ejercicio 4: Extrae la palabra "Mundo" del string "Hola Mundo".
console.log(texto.slice(5)); // "Mundo"

// Ejercicio 5: Divide el string "JavaScript es genial" en palabras y reemplaza "genial" por "fácil".
let frase = "JavaScript es genial";
let palabras = frase.split(" ");
console.log(palabras); // ["JavaScript", "es", "genial"]
let nuevaFrase = frase.replace("genial", "fácil");
console.log(nuevaFrase); // "JavaScript es fácil"

// Ejercicio 6: Compara los strings "árbol" y "arbol" respetando caracteres especiales usando localeCompare().
let resultado = "árbol".localeCompare("arbol", "es");
console.log(resultado); // Devuelve un número: -1, 0, o 1 dependiendo de la comparación


// Ejercicio 7: Crea un objeto Date que represente la fecha y hora actual.
let fechaActual = new Date();
console.log(fechaActual); // Muestra la fecha y hora actuales

// Ejercicio 8: Calcula cuántos milisegundos han pasado desde el 1 de enero de 1970 hasta ahora usando Date.now().
let milisegundos = Date.now();
console.log(milisegundos); // Milisegundos desde 1 de enero de 1970

// Ejercicio 9: Muestra el año, mes, día y hora actuales por separado usando métodos del objeto Date.
console.log(fechaActual.getFullYear()); // Año actual
console.log(fechaActual.getMonth() + 1); // Mes actual (0-indexado)
console.log(fechaActual.getDate()); // Día del mes
console.log(fechaActual.getHours()); // Hora actual

// Ejercicio 10: Resta dos fechas para calcular cuántos días hay entre ellas.
let fecha1 = new Date("2024-01-01");
let fecha2 = new Date("2024-12-31");
let diferencia = (fecha2 - fecha1) / (1000 * 60 * 60 * 24);
console.log(diferencia); // Número de días entre las dos fechas


// Ejercicio 12: Crea un array multidimensional que represente una matriz 3x3 y accede al elemento en la posición [1][2].
let matriz = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
console.log(matriz[1][2]); // 6

// Ejercicio 13: Usa splice() para eliminar el tercer elemento de un array y luego añade dos elementos en su lugar.
let numeros = [1, 2, 3, 4];
numeros.splice(2, 1, 99, 100);
console.log(numeros); // [1, 2, 99, 100, 4]

// Ejercicio 14: Une dos arrays usando concat() y luego conviértelos en un string con join().
let array1 = [1, 2];
let array2 = [3, 4];
let unido = array1.concat(array2);
console.log(unido.join("-")); // "1-2-3-4"

// Ejercicio 15: Usa push() y pop() para añadir y eliminar elementos al final de un array.
numeros.push(5);
console.log(numeros); // [1, 2, 99, 100, 4, 5]
numeros.pop();
console.log(numeros); // [1, 2, 99, 100, 4]

// Ejercicio 16: Encuentra el índice de la primera aparición del número 5 en el array [1, 2, 5, 3, 5, 4].
console.log([1, 2, 5, 3, 5, 4].indexOf(5)); // 2

// Ejercicio 17: Usa filter() para obtener todos los números mayores a 10 en el array [5, 15, 10, 20].
let filtrados = [5, 15, 10, 20].filter(num => num > 10);
console.log(filtrados); // [15, 20]

// Ejercicio 18: Multiplica por 2 todos los elementos de un array usando map().
let duplicados = [1, 2, 3].map(num => num * 2);
console.log(duplicados); // [2, 4, 6]

// Ejercicio 19: Usa reduce() para sumar todos los elementos del array [1, 2, 3, 4].
let suma = [1, 2, 3, 4].reduce((acc, num) => acc + num, 0);
console.log(suma); // 10

// Ejercicio 20: Ordena el array [20, 5, 10, 15] de menor a mayor con sort().
let ordenados = [20, 5, 10, 15].sort((a, b) => a - b);
console.log(ordenados); // [5, 10, 15, 20]


// Ejercicio 21: Crea un conjunto con los elementos 1, 2, 3 y añade el número 4.
let conjunto = new Set([1, 2, 3]);
conjunto.add(4);
console.log(conjunto); // Set {1, 2, 3, 4}

// Ejercicio 22: Comprueba si el conjunto contiene el número 2 y elimina el número 1.
console.log(conjunto.has(2)); // true
conjunto.delete(1);
console.log(conjunto); // Set {2, 3, 4}

// Ejercicio 23: Convierte un conjunto en un array y viceversa.
let arrayConjunto = Array.from(conjunto);
let nuevoConjunto = new Set(arrayConjunto);
console.log(arrayConjunto, nuevoConjunto);

// Ejercicio 24: Une dos conjuntos {1, 2, 3} y {3, 4, 5} usando el operador spread.
let conjunto1 = new Set([1, 2, 3]);
let conjunto2 = new Set([3, 4, 5]);
let union = new Set([...conjunto1, ...conjunto2]);
console.log(union); // Set {1, 2, 3, 4, 5}


// Ejercicio 25: Define una función que sume dos números y devuelve el resultado.
function suma(a, b) {
    return a + b;
  }
  console.log(suma(2, 3)); // 5
  
// Ejercicio 26: Crea una función con parámetros por defecto que devuelva el cuadrado de un número (o 1 si no se pasa ningún argumento).
function cuadrado(num = 1) {
    return num * num;
  }
  console.log(cuadrado()); // 1
  console.log(cuadrado(4)); // 16
  
// Ejercicio 27: Demuestra el paso por referencia modificando un objeto dentro de una función.
function modificarObjeto(obj) {
    obj.nombre = "Cambiado";
  }
  let persona = { nombre: "Original" };
  modificarObjeto(persona);
  console.log(persona.nombre); // "Cambiado"
  
// Ejercicio 28: Escribe una función que reciba un número variable de argumentos y devuelva la suma de todos ellos.
function sumaTodos(...numeros) {
    return numeros.reduce((acc, num) => acc + num, 0);
  }
  console.log(sumaTodos(1, 2, 3, 4)); // 10
  

// Ejercicio 29: Declara una variable con un valor primitivo y otra con un objeto. Cambia sus valores dentro de una función.
let primitiva = 10;
let objeto = { valor: 10 };

function cambiar(val, obj) {
  val = 20;
  obj.valor = 20;
}

cambiar(primitiva, objeto);
console.log(primitiva); // 10 (por valor)
console.log(objeto.valor); // 20 (por referencia)


// Ejercicio 30: Crea un programa que imprima "Par" o "Impar" para los números del 1 al 10 usando un bucle for.
for (let i = 1; i <= 10; i++) {
    console.log(`${i} es ${i % 2 === 0 ? "Par" : "Impar"}`);
  }
  
// Ejercicio 31: Crea un bucle anidado para imprimir una tabla de multiplicar del 1 al 3.
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      console.log(`${i} x ${j} = ${i * j}`);
    }
  }
  
// Ejercicio 32: Escribe un bucle while que siga ejecutándose hasta que se genere un número aleatorio mayor a 0.8
let numero;
do {
  numero = Math.random();
  console.log(numero);
} while (numero <= 0.8);


// Ejercicio 33: Usa el operador ?? para asignar un valor predeterminado si una variable es null o undefined.
let valorNulo = null;
let valorIndefinido;
let valorConcreto = "Hola";

let resultado1 = valorNulo ?? "Valor predeterminado";
let resultado2 = valorIndefinido ?? "Valor predeterminado";
let resultado3 = valorConcreto ?? "Valor predeterminado";

console.log(resultado1); // "Valor predeterminado"
console.log(resultado2); // "Valor predeterminado"
console.log(resultado3); // "Hola"

// Ejercicio 34: Usa typeof para verificar el tipo de diferentes valores.
console.log(typeof 42); // "number"
console.log(typeof "JavaScript"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (peculiaridad de JS)
console.log(typeof { clave: "valor" }); // "object"
console.log(typeof Symbol("simbolo")); // "symbol"

// Ejercicio 35: Comprueba si un valor es un array con Array.isArray() y si es un número con isNaN()
let array = [1, 2, 3];
let noArray = "No soy un array";

console.log(Array.isArray(array)); // true
console.log(Array.isArray(noArray)); // false

let numeroValido = 42;
let noEsNumero = "texto";

console.log(isNaN(numeroValido)); // false (42 es un número)
console.log(isNaN(noEsNumero)); // true ("texto" no es un número)
