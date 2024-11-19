
document.getElementById('file-input').addEventListener('change', async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return; 

    try {
        const contenido = await leerArchivo(archivo);
        const contenidoFiltrado = filtrarDuplicados(contenido);

        const equiposYReservas = formarEquipos(completarPorGenero(contenidoFiltrado));

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

function filtrarDuplicados(contenido) {
    const lineas = contenido.split('\n').map(linea => linea.trim()).filter(linea => linea);
    const repartoSet = new Set();

    lineas.forEach(linea => {
        // Divido la línea en sus componentes y verifico que estén completas.
        const [nombre, genero, apellido, puesto, equipo] = linea.split(';');
        if (nombre && genero && apellido && puesto && equipo) {
            // Uso un Set para evitar duplicados.
            repartoSet.add(`${nombre};${genero};${apellido};${puesto};${equipo}`);
        }
    });
    return Array.from(repartoSet);
}

// Aquí separo los jugadores por género y posición.
function completarPorGenero(jugadores) {
    const jugadoresPorGenero = {
        Masculino: { Portero: [], Defensa: [], Centro: [], Delantero: [] },
        Femenino: { Portero: [], Defensa: [], Centro: [], Delantero: [] }
    };

    jugadores.forEach(jugador => {
        // Divido los datos de cada jugador y veo cual es su género.
        const [nombre, genero, apellido, puesto] = jugador.split(';');
        const grupoGenero = genero === "M" ? "Masculino" : genero === "F" ? "Femenino" : null;
        if (grupoGenero && jugadoresPorGenero[grupoGenero][puesto]) {
            // Agrego al jugador en la lista correspondiente.
            jugadoresPorGenero[grupoGenero][puesto].push(`${nombre} ${apellido}`);
        }
    });
    return jugadoresPorGenero;
}

// Esta es la parte principal para formar los equipos.
// Se distribuyen jugadores según las posiciones necesarias.
function formarEquipos(jugadoresPorGenero) {
    const equipos = { Masculino: [], Femenino: [] };
    const reservas = { Masculino: [], Femenino: [] };

    for (const genero in jugadoresPorGenero) {
        const { Portero, Defensa, Centro, Delantero } = jugadoresPorGenero[genero];
        const cantidadEquipos = Math.min(
            Math.floor(Portero.length / 1),
            Math.floor(Defensa.length / 4),
            Math.floor(Centro.length / 3),
            Math.floor(Delantero.length / 3)
        );

        // Formo los equipos según la cantidad calculada.
        for (let i = 0; i < cantidadEquipos; i++) {
            const equipo = {
                Portero: [Portero.pop()],
                Defensa: [],
                Centro: [],
                Delantero: []
            };

            // Asigno jugadores a cada posición.
            for (let j = 0; j < 4; j++) {
            equipo.Defensa.push(Defensa.pop());
            }
            for (let j = 0; j < 3; j++){
                equipo.Centro.push(Centro.pop());
            } 
            for (let j = 0; j < 3; j++){
                equipo.Delantero.push(Delantero.pop());
            } 

            equipos[genero].push(equipo); // Agrego el equipo formado.
        }

        // Todo lo que sobra se va a las reservas.
        reservas[genero].push(...Portero, ...Defensa, ...Centro, ...Delantero);
    }

    // Imprimo los equipos y las reservas en la consola.
    for (const genero in equipos) {
        console.log(`\n${genero}:`);
        equipos[genero].forEach((equipo, index) => {
            console.log(`Equipo ${index + 1}:`);
            for (const posicion in equipo) {
                console.log(`${posicion}: ${equipo[posicion].join(', ')}`);
            }
        });
    }

    console.log("\nReservas:");
    for (const genero in reservas) {
        console.log(`\n${genero}:`);
        console.log(reservas[genero].join(', '));
    }
}
