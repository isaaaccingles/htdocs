// ===============================
// 📌 Apuntes sobre Promesas en JavaScript
// ===============================

// 🔹 ¿Qué es una Promesa?
// Una promesa es un objeto que representa una operación asincrónica.
// Puede estar en tres estados: pendiente (pending), resuelta (fulfilled) o rechazada (rejected).

// 🔹 Creación de una Promesa
const miPromesa = new Promise((resolve, reject) => {
    let exito = true; // Simula si la operación es exitosa o no
    if (exito) {
        resolve("¡Operación exitosa!"); // Resuelve la promesa
    } else {
        reject("Ocurrió un error"); // Rechaza la promesa
    }
});

// 🔹 Consumiendo una Promesa con .then() y .catch()
miPromesa
    .then(resultado => {
        console.log("Éxito:", resultado); 
    })
    .catch(error => {
        console.error("Error:", error);
    })
    .finally(() => {
        console.log("Proceso finalizado");
    });

// 🔹 Promesas con setTimeout (simulación de operación asincrónica)
const tareaAsincrona = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Datos obtenidos después de 2 segundos");
    }, 2000);
});

tareaAsincrona.then(console.log);

// 🔹 Uso de async / await para manejar Promesas
async function obtenerDatos() {
    try {
        const resultado = await tareaAsincrona;
        console.log(resultado);
    } catch (error) {
        console.error("Error:", error);
    }
}
obtenerDatos();

// 🔹 Métodos útiles con Promesas
// 1️⃣ Promise.all() - Espera a que todas las promesas se resuelvan
Promise.all([
    fetch("https://api1.com"),
    fetch("https://api2.com")
])
.then(respuestas => console.log("Todas resueltas", respuestas))
.catch(error => console.error("Error en alguna promesa", error));

// 2️⃣ Promise.race() - Retorna la primera promesa que se resuelva o rechace
Promise.race([
    fetch("https://api1.com"),
    fetch("https://api2.com")
])
.then(resultado => console.log("Primera en responder", resultado));

// 3️⃣ Promise.allSettled() - Espera a que todas las promesas terminen
Promise.allSettled([
    Promise.resolve("Éxito"),
    Promise.reject("Fallo")
])
.then(resultados => console.log(resultados));

// ===============================
// 📌 Ejercicios de Promesas en JavaScript
// ===============================

// 1️⃣ Crea una promesa que se resuelva después de 3 segundos y devuelva el mensaje "Promesa resuelta".
const ejercicio1 = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Promesa resuelta");
    }, 3000);
});

ejercicio1.then(console.log);

// 2️⃣ Crea una función async que use await para esperar la resolución de una promesa que se resuelve en 2 segundos.
async function ejercicio2() {
    const resultado = await new Promise(resolve => setTimeout(() => resolve("Ejercicio 2 completado"), 2000));
    console.log(resultado);
}
ejercicio2();

// 3️⃣ Crea una función que devuelva una promesa y use .then() para manejar su resultado.
function ejercicio3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Ejercicio 3: Promesa resuelta");
        }, 1500);
    });
}

ejercicio3().then(console.log);

// 4️⃣ Usa Promise.all() para ejecutar dos promesas en paralelo y mostrar el resultado cuando ambas se resuelvan.
Promise.all([
    new Promise(resolve => setTimeout(() => resolve("Primera promesa"), 1000)),
    new Promise(resolve => setTimeout(() => resolve("Segunda promesa"), 2000))
])
.then(resultados => console.log("Ejercicio 4 resultados:", resultados));

