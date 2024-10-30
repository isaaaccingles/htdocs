<?php

$array = array(
    'k0' => 'Juan',
    'k1' => 'Álvaro',
    'k2' => 'Maite',
    'k3' => 'Álvaro',
    'k4' => 'Juan',
    'k5' => 'Martina'
);

if (in_array('Juan', $array)) {
    echo "'Juan' se encuentra en el array.\n";
} else {
    echo "'Juan' no se encuentra en el array.\n";
}
?>
