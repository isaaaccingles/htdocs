
document.getElementById('file-input').addEventListener('change', async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    try {
        const contenido = await leerArchivo(archivo);

        // Separar secciones del fichero
        const [clientesCSV, telefonosCSV, comprasCSV] = contenido.split("&&&&&").map(section => section.trim());

        // Procesar las secciones del CSV
        const clientes = parseClientes(clientesCSV);
        const telefonos = parseTelefonos(telefonosCSV);
        const compras = parseCompras(comprasCSV);

        // Generar listas de clientes completos e incompletos
        const [clientesOk, clientesNoOk] = filtrarClientes(clientes, telefonos);
        console.log("Clientes completos:", clientesOk);
        console.log("Clientes incompletos:", clientesNoOk);

        // Crear lista de entregas
        const entregasHoy = crearEntregas(clientesOk, compras);
        console.log("Entregas de hoy:", entregasHoy);

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

// Procesar clientes y direcciones
function parseClientes(data) {
    const lines = data.split("\n").slice(1).map(line => line.split("–").map(item => item.trim()));
    return lines.map(line => {
        const [nombreApellido, direccion] = line;
        const [nombre, apellido] = nombreApellido.split(" ");
        const [calle, numero, poblacion] = direccion.split(",").map(item => item.trim());
        return [nombre, apellido, calle, numero, poblacion];
    });
}

// Procesar teléfonos
function parseTelefonos(data) {
    const lines = data.split("\n").slice(1).map(line => line.split(";").map(item => item.trim()));
    return lines.map(line => [line[0], line[1], line[2] || ""]);
}

// Procesar compras
function parseCompras(data) {
    const lines = data.split("\n").slice(1).map(line => line.split(";").map(item => item.trim()));
    return lines.map(line => [
        line[0], // Nombre
        line[1], // Apellido
        line[2], // Fecha de compra
        line[3], // Referencia
        line[4], // Descripción
        parseFloat(line[5].replace("€", "").replace(",", "."))
    ]);
}

// Filtrar clientes completos e incompletos
function filtrarClientes(clientes, telefonos) {
    const clientesOk = [];
    const clientesNoOk = [];
    for (const cliente of clientes) {
        const [nombre, apellido, calle, numero, poblacion] = cliente;
        const telefono = telefonos.find(t => t[0] === nombre && t[1] === apellido)?.[2] || "vacío";

        if ([nombre, apellido, calle, numero, poblacion, telefono].includes("") || telefono === "vacío") {
            clientesNoOk.push([nombre || "vacío", apellido || "vacío", calle || "vacío", numero || "vacío", poblacion || "vacío", telefono]);
        } else {
            clientesOk.push([nombre, apellido, calle, parseInt(numero, 10), poblacion, telefono]);
        }
    }
    return [clientesOk, clientesNoOk];
}

// Crear lista de entregas
function crearEntregas(clientes, compras) {
    return compras.map(compra => {
        const [nombre, apellido, fecha, referencia, descripcion, precio] = compra;
        const cliente = clientes.find(c => c[0] === nombre && c[1] === apellido);
        if (!cliente) return null;

        const [_, __, calle, numero, poblacion, telefono] = cliente;
        const entregable = [nombre, apellido, calle, numero, poblacion, telefono, referencia, descripcion, fecha, precio].every(item => item !== "" && item !== null);
        return [nombre, apellido, calle, parseInt(numero, 10), poblacion, telefono, referencia, descripcion, fecha, precio, entregable];
    }).filter(item => item);
}
