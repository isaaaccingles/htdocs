<?php

$usuario = isset($_POST["usuario"])?$_POST["usuario"]: '';
$contraseña = isset($_POST["contraseña"])?$_POST["contraseña"]: '';


echo "</br>";
echo "BIENVENIDO".$usuario."</br>";


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <a href="sqlLogin.php">Volver al Formulario</a>
</body>
</html>
