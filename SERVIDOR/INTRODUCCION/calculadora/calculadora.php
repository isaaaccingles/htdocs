<?php

$numero1 = $_GET["numero1"];
$numero2 = $_GET["numero2"];
$operador = $_GET["operador"];


    switch ($operador) {
    case "suma":
      echo  $numero1+$numero2;
        break;

    case "resta":
        echo $numero1-$numero2;
    break;

     case "multiplicacion":
        echo $numero1*$numero2;
     break;

        case "division":
            echo $numero1/$numero2;
         break;

    }
