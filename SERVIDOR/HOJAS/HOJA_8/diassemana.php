<?php
date_default_timezone_set("Europe/Madrid");

setlocale(LC_TIME, 'es_ES.UTF-8');
$dia_semana = strftime('%A');

echo "Hoy es " . ucfirst($dia_semana) . "<br>";
?>
