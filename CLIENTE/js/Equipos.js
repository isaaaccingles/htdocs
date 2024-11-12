
document.getElementById('file-input').addEventListener('change', async (e) => {
    const archivo = e.target.files[0]; 
    if (!archivo) return; 

    const contenido = await leerArchivo(archivo);
    const contenidoFiltrado = filtrarDuplicados(contenido);
    const equiposYReservas = formarEquipos(completarPorGenero(contenidoFiltrado));

    
    document.getElementById('contenido-filtrado').textContent = equiposYReservas;
}, false);


async function leerArchivo(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result); 
        reader.onerror = (e) => reject(e); 
        reader.readAsText(file); 
    });
}

// Función para eliminar duplicados del contenido del archivo
function filtrarDuplicados(contenido) {
    const lineas = contenido.split('\n'); 
    const repartoSet = new Set();

    lineas.forEach(linea => {
        // Dividir cada línea en las partes nombre, género, apellido, puesto y equipo
        const [nombre, genero, apellido, puesto, equipo] = linea.split(';');
        if (nombre && genero && apellido && puesto && equipo) {
            repartoSet.add(`${nombre};${genero};${apellido};${puesto};${equipo}`);
        }
    });

    return Array.from(repartoSet);
}

// Función para clasificar jugadores por género y posicion
function completarPorGenero(jugadores) {
    const jugadoresPorGenero = {
        Masculino: { Portero: [], Defensa: [], Centro: [], Delantero: [] },
        Femenino: { Portero: [], Defensa: [], Centro: [], Delantero: [] }
    };

    // Clasificar cada jugador en el grupo y posición que le corresponde
    jugadores.forEach(jugador => {
        const [nombre, genero, apellido, puesto, equipo] = jugador.split(';');
        let grupoGenero;
        if (genero == "M") {
            grupoGenero = "Masculino";
        } else if (genero == "F"){
            grupoGenero = "Femenino";
        }

        // Añadir el jugador a la posición que le corresponde por su genero
        if (puesto == "Portero") {
            jugadoresPorGenero[grupoGenero].Portero.push(`${nombre} ${apellido}`);
        } else if (puesto == "Defensa") {
            jugadoresPorGenero[grupoGenero].Defensa.push(`${nombre} ${apellido}`);
        } else if (puesto == "Centro") {
            jugadoresPorGenero[grupoGenero].Centro.push(`${nombre} ${apellido}`);
        } else if (puesto == "Delantero") {
            jugadoresPorGenero[grupoGenero].Delantero.push(`${nombre} ${apellido}`);
        }
    });

    return jugadoresPorGenero;
}

// Función para formar equipos a partir de los jugadores organizados
function formarEquipos(jugadoresPorGenero) {
    const equipos = { Masculino: [], Femenino: [] };
    const reservas = [];
    let equiposFormados = { Masculino: 0, Femenino: 0 };  // Contador de equipos formados para cada género

    // Formar equipos para cada género
    for (const genero in jugadoresPorGenero) {
        let { Portero, Defensa, Centro, Delantero } = jugadoresPorGenero[genero];

    
        const cantidadEquipos = Math.min(
            Math.floor(Portero.length / 1),  
            Math.floor(Defensa.length / 4), 
            Math.floor(Centro.length / 3),  
            Math.floor(Delantero.length / 3) 
        );

        // Formar los equipos para este género
        for (let i = 0; i < cantidadEquipos; i++) {
            const portero = Portero[i];
            const defensa = Defensa.slice(i * 4, i * 4 + 4);
            const centro = Centro.slice(i * 3, i * 3 + 3);
            const delantero = Delantero.slice(i * 3, i * 3 + 3);

            const equipo = {
                Portero: [portero],
                Defensa: defensa,
                Centro: centro,
                Delantero: delantero,
            };

            equipos[genero].push(equipo);
            equiposFormados[genero]++; 
        }


        reservas.push(...Portero, ...Defensa, ...Centro, ...Delantero);
    }

    console.log('Equipos formados:', equiposFormados);  // Mostrar el número de equipos formados
    return formatoSalida(equipos, reservas);
}



