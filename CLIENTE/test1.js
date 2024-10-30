a = 7;
b = 4;
c = "Hola";
d = 0x27;
e = 0o27;
color = 0xFFFFFF;
console.log("a vale: " + a );
console.log("Suma de a y b = " + (a+b));
console.log(typeof a);
console.log(typeof c);
console.log(d);
console.log(e);
console.log("El color es " + color.toString(8));
//document.write("Escribir " + a);
//let nombre = "Isaac";
respuesta = prompt("color: "); //sale pantalla
console.log(typeof respuesta); //ver tipo de variable
m = parseInt(respuesta, 16); //cambiar a int
console.log(typeof m);