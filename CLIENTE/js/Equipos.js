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

function filtrarDuplicados(contenido) {
    const lineas = contenido.split('\n');
    const repartoSet = new Set();

    lineas.forEach(linea => {
        const [nombre, genero, apellido, puesto, equipo] = linea.split(';');
        if (nombre && genero && apellido && puesto && equipo) {
            repartoSet.add(`${nombre};${genero};${apellido};${puesto};${equipo}`);
        }
    });

    return Array.from(repartoSet);
}

//Funcion para definir un objeto que separa en genero y sus puestos
function completarPorGenero(jugadores) {
    const jugadoresPorGenero = {
        Masculino: { Portero: [], Defensa: [], Centro: [], Delantero: [] },
        Femenino: { Portero: [], Defensa: [], Centro: [], Delantero: [] }
    };

    //Separo lo jugadores en genero dependiendo de la letra M o F
    jugadores.forEach(jugador => {
        const [nombre, genero, apellido, puesto, equipo] = jugador.split(';');
        let grupoGenero;
        switch (genero) { 
            case "M":
                grupoGenero = "Masculino";
                break;
            case "F":
                grupoGenero = "Femenino";
                break;
        }
        //Fijandose en el genero y la posicion, se agregan los jugadores a 
        //su genero y posicion correspondiente
        if (grupoGenero && jugadoresPorGenero[grupoGenero][puesto]) {
            jugadoresPorGenero[grupoGenero][puesto].push(`${nombre} ${apellido}`);
        }
    });

    return jugadoresPorGenero;
}

// Funcion para formar equipos
function formarEquipos(jugadoresPorGenero) {
    const equipos = { Masculino: [], Femenino: [] };
    const reservas = { Masculino: [], Femenino: [] };

    // Formar equipos para cada género
    for (const genero in jugadoresPorGenero) {
        const { Portero, Defensa, Centro, Delantero } = jugadoresPorGenero[genero];

        // Aqui calculo cuantos equipos completos se pueden formar
        const cantidadEquipos = Math.min(
            Math.floor(Portero.length / 1),
            Math.floor(Defensa.length / 4),
            Math.floor(Centro.length / 3),
            Math.floor(Delantero.length / 3)
        );

        // Formar los equipos
        //Añado a cada equipo (i) los siguientes jugadores
        for (let i = 0; i < cantidadEquipos; i++) {
            const equipo = {
                Portero: [Portero[i]],
                Defensa: [], 
                Centro: [], 
                Delantero: [] 
            };
        
            //defensa
            //En el equipo (i) en la posicion defensa, se meten los jugadores j
            for (let j = 0; j < 4; j++) {
                equipo.Defensa.push(Defensa[i * 4 + j]);
            }
        
            //centro
            //En el equipo (i) en la posicion centro, se meten los jugadores j
            for (let j = 0; j < 3; j++) {
                equipo.Centro.push(Centro[i * 3 + j]);
            }
        
            //delantero
            //En el equipo (i) en la posicion delantero, se meten los jugadores j
            for (let j = 0; j < 3; j++) {
                equipo.Delantero.push(Delantero[i * 3 + j]);
            }
        
            equipos[genero].push(equipo);
        }
        
        //Agrego a reservas los que sobran
        //Empiezo desde cantidad de equipos hasta la longuitud de lo que pido para recorrer los sobrantes
        for (let i = cantidadEquipos; i < Portero.length; i++) {
            reservas[genero].push(Portero[i]);
        }
        
        
        for (let i = cantidadEquipos * 4; i < Defensa.length; i++) {
            reservas[genero].push(Defensa[i]);
        }
        
       
        for (let i = cantidadEquipos * 3; i < Centro.length; i++) {
            reservas[genero].push(Centro[i]);
        }
        
        
        for (let i = cantidadEquipos * 3; i < Delantero.length; i++) {
            reservas[genero].push(Delantero[i]);
        }
    }   

    console.log("Equipos Formados:");

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
        console.log(`${reservas[genero].join(', ')}`);
    }
}
