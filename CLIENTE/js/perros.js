document.getElementById('file-input').addEventListener('change', async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    try {
        const contenido = await leerArchivo(archivo);

        const nombrePerro = prompt("Ingresa el nombre del perro para ver su familia:");

        if (!nombrePerro) {
            alert("Debes ingresar un nombre de perro.");
            return;
        }

        const datosFamilia = filtrarFamilia(contenido, nombrePerro);
        mostrarFamilia(nombrePerro, datosFamilia);
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

function filtrarFamilia(contenido, nombrePerro) {
    const lineas = contenido.split('\n').map(linea => linea.trim()).filter(linea => linea);
    const datos = {};
    const hijos = []; 

    lineas.forEach(linea => {
        const partes = linea.split(';');
        const padre = partes[0] || "desconocido";
        const madre = partes[1] || "desconocido";
        const listaHijos = partes.slice(2).filter(hijo => hijo);

        
        listaHijos.forEach(hijo => {
            datos[hijo] = { madre, padre };
        });

        
        if (padre === nombrePerro || madre === nombrePerro) {
            hijos.push(...listaHijos);
        }

        if (!datos[padre] && padre !== "desconocido") {
            datos[padre] = { madre: "desconocido", padre: "desconocido" };
        }
        if (!datos[madre] && madre !== "desconocido") {
            datos[madre] = { madre: "desconocido", padre: "desconocido" };
        }
    });

    
    if (!datos[nombrePerro]) {
        return null;
    }

    const madre = datos[nombrePerro].madre || "desconocido";
    const padre = datos[nombrePerro].padre || "desconocido";
    const abuelaMaterna = madre !== "desconocido" && datos[madre] ? datos[madre].madre : "desconocido";
    const abueloMaterno = madre !== "desconocido" && datos[madre] ? datos[madre].padre : "desconocido";
    const abuelaPaterna = padre !== "desconocido" && datos[padre] ? datos[padre].madre : "desconocido";
    const abueloPaterno = padre !== "desconocido" && datos[padre] ? datos[padre].padre : "desconocido";

    return {
        madre,
        padre,
        abuelaMaterna,
        abueloMaterno,
        abuelaPaterna,
        abueloPaterno,
        hijos: hijos.length ? hijos : ["No tiene hijos registrados"],
    };
}

function mostrarFamilia(nombrePerro, datosFamilia) {
    if (!datosFamilia) {
        console.log(`No se encontraron datos para ${nombrePerro}.`);
        return;
    }

    let mensaje = `Familia de ${nombrePerro}:\n`;
    mensaje += `Madre: ${datosFamilia.madre}\n`;
    mensaje += `Padre: ${datosFamilia.padre}\n`;
    mensaje += `Abuela Materna: ${datosFamilia.abuelaMaterna}\n`;
    mensaje += `Abuelo Materno: ${datosFamilia.abueloMaterno}\n`;
    mensaje += `Abuela Paterna: ${datosFamilia.abuelaPaterna}\n`;
    mensaje += `Abuelo Paterno: ${datosFamilia.abueloPaterno}\n`;
    mensaje += `Hijos: ${datosFamilia.hijos.join(', ')}\n`;

    console.log(mensaje);
}






// Procesar teléfonos
function Telefonos(contenido) {
    const lineas = contenido.split("\n").slice(1).map(lineas => lineas.split(";").map(item => item.trim()));
    return lineas.map(lineas => [lineas[0], lineas[1], lineas[2] || ""]);
}

// Procesar compras
function Compras(data) {
    const lines = data.split("\n").slice(1).map(line => line.split(";").map(item => item.trim()));
    return lines.map(line => [
        line[0], // Esta posicion es para el nombre
        line[1], // Esta posicion es para el apellido
        line[2], // Esta posicion es para la fecha de compra
        line[3], // Esta posicion es para la referencia
        line[4], // Esta posicion es para la descripcion
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

// const clientes = Clientes(listaClientes);
// const telefonos = Telefonos(listaTelefonos);
// const compras = Compras(listaCompras);

// const entregasHoy = crearEntregas(clientesOk, compras);
// console.log("Entregas de hoy:", entregasHoy);

const [clientesOk, clientesNoOk] = filtrarClientes(clientes, telefonos);
console.log("Clientes completos:", clientesOk);
console.log("Clientes incompletos:", clientesNoOk);

// Procesar compras y calcular días desde la fecha de compra
function calcularDiasDesdeCompras(data) {
    const hoy = new Date(); // Fecha actual
    const lines = data.split("\n").slice(1).map(line => line.split(";").map(item => item.trim()));

    return lines.map(line => {
        const [nombre, apellido, fechaCompra, referencia, descripcion, importe] = line;
        const fechaCompraDate = new Date(fechaCompra);

        const diferenciaEnMs = hoy - fechaCompraDate;
        const diasPasados = Math.floor(diferenciaEnMs / (1000 * 60 * 60 * 24));

        return {
            nombre,
            apellido,
            fechaCompra,
            referencia,
            descripcion,
            importe: parseFloat(importe.replace("€", "").replace(",", ".")),
            diasPasados
        };
    });
}

// Uso del cálculo en el archivo
document.getElementById('file-input').addEventListener('change', async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    try {
        const contenido = await leerArchivo(archivo);
        const [_, _, listaCompras] = contenido.split("&&&&&").map(section => section.trim());

        const comprasProcesadas = calcularDiasDesdeCompras(listaCompras);
        console.log("Listado de compras con días pasados:", comprasProcesadas);
    } catch (error) {
        console.error("Error procesando el archivo:", error);
    }
}, false);

// Resto del código permanece igual
