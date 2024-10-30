<?php

$numero1 = $_POST["numero1"];
$numero2 = $_POST["numero2"];
$operacion = $_POST["operacion"];

echo "Numero 1: ". $numero1;
echo "<br>";
echo "Numero 2: ".  $numero2;
echo "<br>";
echo "Operación: ". $operacion;
echo "<br>";

    switch ($operacion) {
    case "suma":
      echo  "Suma = ". $numero1+$numero2;
        break;

    case "resta":
        echo "Resta = ". $numero1-$numero2;
    break;

     case "multiplicacion":
        echo "Multiplicación = ". $numero1*$numero2;
     break;

        case "division":
            echo "División = ". $numero1/$numero2;
         break;

    }