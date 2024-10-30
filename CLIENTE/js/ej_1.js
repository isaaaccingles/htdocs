// preguntar color, ponerlo en hexa, decimal, binario

respuesta = prompt("Escribe un color: ");
conversion_H = parseInt(respuesta, 16);
console.log(conversion_H.toString(16));
conversion_D = parseInt(respuesta, 10);
console.log(conversion_D.toString(10));
conversion_B = parseInt(respuesta, 2);
console.log(conversion_B.toString(2));