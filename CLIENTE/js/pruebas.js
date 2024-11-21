
function quitar(lista,...args) { 

    resultado = [];
    for (let numero of lista) {
        if (!args.includes(numero)) {
            resultado.push(numero);
        }
    }
    return resultado;
    
}

lista = [7, 5, 4, 2, 8, 1];
resultado = quitar(lista, 5, 4); 
console.log(resultado);
