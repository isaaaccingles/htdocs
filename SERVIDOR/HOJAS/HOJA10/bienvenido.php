<?php

session_start();

$buscar = $_SESSION["buscar"];
$busqueda = $_SESSION["busqueda"];
$genero = $_SESSION["genero"];

echo "BIENVENIDO"."</br>";
echo "</br>";
echo "Busqueda realizada: ".$buscar."</br>";
echo "Tipo de busqueda: ".$busqueda."</br>";
echo "Género musical: ".$genero."</br>";

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <a href="H10_1.php">Volver al Formulario</a>
</body>
</html>
