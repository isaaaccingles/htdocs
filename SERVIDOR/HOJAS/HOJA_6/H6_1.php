<?php

$array = array(
    'k0' => 'Juan',
    'k1' => 'Álvaro',
    'k2' => 'Maite',
    'k3' => 'Álvaro',
    'k4' => 'Juan',
    'k5' => 'Martina'
);

$clave_juan = array_search('Juan', $array);

if ($clave_juan !== false) {
    echo "La primera clave asociada a 'Juan' es: " . $clave_juan . "\n";
} else {
    echo "'Juan' no se encontró en el array.\n";
}

echo "Claves asociadas a 'Álvaro':\n";
foreach ($array as $clave => $valor) {
    if ($valor === 'Álvaro') {
        echo $clave . "\n";
    }
}
?>
