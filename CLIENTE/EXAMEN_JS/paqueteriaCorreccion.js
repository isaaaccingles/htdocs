document.getElementById('file-input').addEventListener('change', async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    try {
        const contenido = await leerArchivo(archivo);
        const [listaClientes, listaTelefonos, listaCompras] = contenido.split("&&&&&").map(section => section.trim());

        const clientes = procesarClientes(listaClientes);
        const telefonos = procesarTelefonos(listaTelefonos);
        const compras = procesarCompras(listaCompras);

        console.log("Clientes procesados:", clientes);
        console.log("Clientes y sus telefonos:", telefonos);
        console.log("Clientes y sus compras:", compras);
        

    } catch (error) {
        console.error("Error procesando el archivo:", error);
    }
}, false);

async function leerArchivo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}

function procesarClientes(listaClientes) {
    const lineas = listaClientes.split("\r\n").slice(1);
    const resultado = [];
    
    for (const linea of lineas) {
        const [nombreApellido, direccion] = linea.split(" - ").map(item => item.trim());
        const [nombre, apellido] = nombreApellido.split(" ");
        const [calle, numero, poblacion] = direccion.split(",").map(item => item.trim());
        resultado.push({ nombre, apellido, calle, numero, poblacion});
    }
    
    return resultado;
}


function procesarTelefonos(listaTelefonos){
    const lineas = listaTelefonos.split("\n").slice(1).map(line=> line.split(",").map(item => item.trim()));
    return lineas.map(linea =>{
        const [nombre, apellido, telefono] = linea;
        return {nombre, apellido, telefono};
    })
}

function procesarCompras(listaCompras){
    const lineas = listaCompras.split("\n").slice(1);
    return lineas.map(linea =>{
        const [nombre, apellido, fechaCompra, referencia, descripcion, precio] = linea.split(",").map(item => item.trim());;
        return {nombre, apellido, fechaCompra, referencia, descripcion, precio};
    })
}