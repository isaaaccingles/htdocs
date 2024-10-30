respuesta = prompt("Escribe digitos: "); //sale pantalla
console.log(typeof respuesta); //ver tipo de variable
conversion = parseInt(respuesta, 16); //cambiar a int
console.log(conversion);
console.log(typeof conversion); 
conversion2 = parseInt(conversion, 10);//cambiar variable a decimal
console.log(conversion2);
console.log(conversion2.toString(16));//cambiar variable a hexadecimal
conversion3 = parseInt(conversion2, 2);//cambiar variable a decimal
console.log(conversion3);
numero2 = Number(respuesta);//otra forma de comvertir string a int
//Nan significa que solo convierte del 0-9, asi que no puede