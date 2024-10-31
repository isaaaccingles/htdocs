<?php

session_start();

$nombre = isset($_SESSION["nombre"]) ? $_SESSION["nombre"] : null;
$contraseña = isset($_SESSION["contraseña"]) ? $_SESSION["contraseña"] : null;
$color = isset($_SESSION["color"]) ? $_SESSION["color"] : null;
$publicidad = isset($_SESSION["publicidad"]) ? $_SESSION["publicidad"] : null;
$fecha = isset($_SESSION["fecha"]) ? $_SESSION["fecha"] : null;
$ciudad = isset($_SESSION["ciudad"]) ? $_SESSION["ciudad"] : null;

if ($nombre && $color && $ciudad) {
    echo "BIENVENIDO" . "</br>";
    echo "</br>";
    echo "Nombre: " . htmlspecialchars($nombre) . "</br>";
    echo "Color seleccionado: " . htmlspecialchars($color) . "</br>";
    echo "Fecha de finalización de estudios: ".htmlspecialchars($fecha)."</br>";
    echo "Ciudad: " . htmlspecialchars($ciudad) . "</br>";
} else {
    
    header("Location: Repintar_1_6.php"); 
    exit();
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <a href="Repintar_1_6.php">Volver al Formulario</a>
</body>
</html>