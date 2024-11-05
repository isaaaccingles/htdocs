const nombres = new Set(["Pepe", "Juan", "Pedro"]);
console.log(nombres);
nombres.delete("Juan");
console.log(nombres);
nombres.add("Juan");
console.log(nombres);

const name = ["Antonio", "Pedro", "Lucas"];

nombres.add(name[0]);
nombres.add(name[1]);
nombres.add(name[2]);
console.log(nombres);

const nombres2 = [...nombres];
console.log(nombres2);