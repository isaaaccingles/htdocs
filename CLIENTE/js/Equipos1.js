document.getElementById('file-input').addEventListener('change', handleFileChange, false);

// Función principal para manejar el cambio de archivo
async function handleFileChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const fileContent = await readFile(file);
        const filteredContent = removeDuplicates(fileContent);

        const playersByGender = categorizePlayersByGender(filteredContent);
        const teamsAndReserves = createTeams(playersByGender);

        displayResults(teamsAndReserves);
    } catch (error) {
        console.error("Error processing the file:", error);
    }
}

// Lee el archivo como texto
function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}

// Elimina jugadores duplicados
function removeDuplicates(content) {
    const lines = content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line);

    const uniqueSet = new Set();

    lines.forEach(line => {
        const [name, gender, surname, position, team] = line.split(';');
        if (name && gender && surname && position && team) {
            uniqueSet.add(`${name};${gender};${surname};${position};${team}`);
        }
    });

    return Array.from(uniqueSet);
}

// Clasifica jugadores por género y posición
function categorizePlayersByGender(players) {
    const genders = {
        Masculino: { Portero: [], Defensa: [], Centro: [], Delantero: [] },
        Femenino: { Portero: [], Defensa: [], Centro: [], Delantero: [] }
    };

    players.forEach(player => {
        const [name, gender, surname, position] = player.split(';');
        const genderGroup = gender === "M" ? "Masculino" : gender === "F" ? "Femenino" : null;

        if (genderGroup && genders[genderGroup][position]) {
            genders[genderGroup][position].push(`${name} ${surname}`);
        }
    });

    return genders;
}

// Forma equipos según los jugadores disponibles
function createTeams(playersByGender) {
    const result = { teams: { Masculino: [], Femenino: [] }, reserves: { Masculino: [], Femenino: [] } };

    for (const gender in playersByGender) {
        const { Portero, Defensa, Centro, Delantero } = playersByGender[gender];

        const maxTeams = Math.min(
            Math.floor(Portero.length / 1),
            Math.floor(Defensa.length / 4),
            Math.floor(Centro.length / 3),
            Math.floor(Delantero.length / 3)
        );

        for (let i = 0; i < maxTeams; i++) {
            const team = {
                Portero: [Portero.pop()],
                Defensa: Defensa.splice(-4),
                Centro: Centro.splice(-3),
                Delantero: Delantero.splice(-3)
            };
            result.teams[gender].push(team);
        }

        result.reserves[gender].push(...Portero, ...Defensa, ...Centro, ...Delantero);
    }

    return result;
}

// Muestra los resultados en la consola
function displayResults({ teams, reserves }) {
    for (const gender in teams) {
        console.log(`\n${gender}:`);
        teams[gender].forEach((team, index) => {
            console.log(`Equipo ${index + 1}:`);
            Object.entries(team).forEach(([position, players]) => {
                console.log(`${position}: ${players.join(', ')}`);
            });
        });
    }

    console.log("\nReservas:");
    for (const gender in reserves) {
        console.log(`\n${gender}:`);
        console.log(reserves[gender].join(', '));
    }
}
