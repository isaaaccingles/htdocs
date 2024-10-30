
const input =`
G27CQ4: 212,65€ 1920px 65W 27" 170Hz 1ms
XG27ACS: 180hz 269,66$ 27" 62w 2ms
CQ32G2SE: 31" 165Hz 214,20€ 1ms 2560px 52W
G27C4X: 44W 250Hz 1920px 4ms 189,45$ 27"
`;

const items = [];
const lineas = input.trim().split('\n');

lineas.forEach((linea) => {
    const partes = linea.split(' ');
    const nombre = partes[0].replace(':', '');

    let precio;
    let tamaño;
    let frecuencia;
    let tiempoRespuesta;
    let resolucion;
    let consumoEnergia;

    partes.forEach((parte) => {
        if (parte.includes('€') || parte.includes('$')) {
            precio = parseFloat(parte.replace(',', '.').replace('€', '').replace('$', ''));
        } else if (parte.endsWith('"')) {
            tamaño = parseInt(parte.replace('"', '')); 
        } else if (parte.endsWith('Hz' || 'hz')) {
            frecuencia = parseInt(parte.toLowerCase().replace('HZ', '')); 
        } else if (parte.endsWith('ms' || 'Ms')) {
            tiempoRespuesta = parseInt(parte.toLowerCase().replace('HZ', ''));
        } else if (parte.endsWith('px')) {
            resolucion = parseInt(parte.replace('px', ''));
        } else if (parte.endsWith('W' || 'w')) {
            consumoEnergia = parseInt(parte.toLowerCase().replace('W',''));
        }
    });

        items.push({ nombre, precio, tamaño, frecuencia, tiempoRespuesta, resolucion, consumoEnergia
        });
    
    });

console.log(items);