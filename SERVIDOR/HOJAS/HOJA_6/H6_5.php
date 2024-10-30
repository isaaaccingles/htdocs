<?php

$registros = array(
    array(
        'id' => 2135,
        'nombre' => 'Juan',
        'apellido' => 'Díaz',
    ),
    array(
        'id' => 3245,
        'nombre' => 'Sara',
        'apellido' => 'Sanz',
    ),
    array(
        'id' => 5342,
        'nombre' => 'Jose',
        'apellido' => 'Rodríguez',
    ),
    array(
        'id' => 5623,
        'nombre' => 'Pedro',
        'apellido' => 'Domínguez',
    )
);

$apellidos = array_column($registros, 'apellido');

echo "Apellidos:\n";
foreach ($apellidos as $apellido) {
    echo $apellido . "\n";
}
?>
