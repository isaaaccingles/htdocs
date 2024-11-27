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
