<?php
function es_bisiesto($año) {
    return ((($año % 4) == 0 && ($año % 100) != 0) || ($año % 400) == 0);
}

$anio_2023 = 2023;
$anio_2022 = 2022;

echo $anio_2023 . " fue bisiesto? " . (es_bisiesto($anio_2023) ? "Sí" : "No") . "<br>";
echo $anio_2022 . " fue bisiesto? " . (es_bisiesto($anio_2022) ? "Sí" : "No") . "<br>";
?>
