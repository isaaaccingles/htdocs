<?php

$usuario = [
    ["isaac", "1234"],
    ["ivan", "2345"],
    ["khaled", "3456"],
    ["jesus", "4567"],
    ["neil", "5678"]
];

$usuarioRegistrado = $_POST['usuario'];
$contraseñaRegistrada = $_POST['contraseña'];
$usuarioEncontrado = false;
       
for( $i = 0; $i < count($usuario); $i++ ) {

    while($usuarioRegistrado === $usuarios[$i][0] && $contraseñaRegistrada === $usuarios[$i][1]){
        $usuarioEncontrado = true;
    }
      
   
 }

 if ($usuarioEncontrado) {
    header("Location: bienvenido.php");
} else {
    header("Location: error.php");
}