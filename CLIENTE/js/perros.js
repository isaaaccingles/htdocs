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
        mostrarFamilia(datosFamilia);
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
    const familiaSet = new Set();
    const datos = [];
    
    lineas.forEach(linea => {
            const [nombre, madre, padre, abuela, abuelo] = linea.split(';');
           
        });
        return datos;
    }

   





