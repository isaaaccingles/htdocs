<?php
date_default_timezone_set("Europe/Madrid");

$fecha_actual = date('Y-m-d');
echo "Fecha actual: " . $fecha_actual . "<br>";

$fecha_en_una_semana = date('Y-m-d', strtotime('+1 semana'));
echo "Fecha dentro de una semana: " . $fecha_en_una_semana . "<br>";

setlocale(LC_TIME, 'es_ES.UTF-8');
$fecha_formateada = strftime('%A, %d de %B de %Y. A las %H:%M');
echo "Fecha actual en español: " . ucfirst($fecha_formateada) . "<br>";

$fecha_formateada_semana = strftime('%A, %d de %B de %Y. A las %H:%M', strtotime('+1 week'));
echo "Fecha dentro de una semana en español: " . ucfirst($fecha_formateada_semana) . "<br>";
?>
