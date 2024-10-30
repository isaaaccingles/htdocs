//Separar el modelo y el precio y almacenarlo en un array

const input =`
G27CQ4 212,65€
XG27ACS 269,66€
CQ32G2SE 214,20€
G27C4X 189,45
`;

const items = [];
const lineas = input.trim().split('\n');


for (const linea of lineas) {
    [nombre, precio] = linea.split(' ');
    precio = parseFloat(precio.replace(',', '.'));
    items.push({ nombre, precio });
}

console.log(items);