document.getElementById('file-input').addEventListener('change', async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    try {
        const contenido = await leerArchivo(archivo);
        const [listaClientes, listaTelefonos, listaCompras] = contenido.split("&&&&&").map(section => section.trim());

        const clientes = procesarClientes(listaClientes);
        const diasDesdeCompras = calcularDiasDesdeCompras(listaCompras);

        
        const referencias = new Set();

       
        diasDesdeCompras.forEach(compra => {
            const { referencia } = compra;
            referencias.add(referencia); 
        });

        referencias.add("456474");
        referencias.add("443534");

        
        const totalReferencias = referencias.size;
        const listadoReferencias = [...referencias].join(", ");
        console.log(`Total referencias a entregar: ${totalReferencias}. Listado de referencias: ${listadoReferencias}`);

        console.log("Clientes procesados:", clientes);
        console.log("Compras procesadas con días calculados:", diasDesdeCompras);

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

// Procesar la ista de clientes
function procesarClientes(listaClientes) {
    const lineas = listaClientes.split("\n").slice(1).map(line => line.split("-").map(item => item.trim()));
    return lineas.map(linea => {
        const [nombreApellido, direccion] = linea;
        const [nombre, apellido] = nombreApellido.split(" ");
        const [calle, numero, poblacion] = direccion.split(",").map(item => item.trim());
        return { nombre, apellido, calle, numero, poblacion };
    });
}

function calcularDiasDesdeCompras(listaCompras) {
    const hoy = new Date(); 
    return listaCompras.split("\n").slice(1).map(line => line.split(";").map(item => item.trim()))
        .map(linea => {
            const [nombre, apellido, fechaCompra, referencia, descripcion, importe] = linea;
            const fechaCompraDate = new Date(fechaCompra);
            const diferenciaEnMilisegundos = hoy - fechaCompraDate; 
            //Ahora hago los calculos para pasar los milisegundos a dias
            const diferenciaEnDias = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24));

            return { nombre, apellido, fechaCompra, referencia, descripcion, importe, diferenciaEnDias };
        });
}
