<?php

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $num1 = isset($_POST['num1']) ? (float) $_POST['num1'] : 0;    
    $num2 = isset($_POST['num2']) ? (float) $_POST['num2'] : 0;
    
    $suma = $num1 + $num2;

    echo $suma;
}else{
    echo "Solicitud invalida";
}
