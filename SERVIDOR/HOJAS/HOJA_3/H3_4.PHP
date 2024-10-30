<?php

$dia_abreviado = date("D");
switch ($dia_abreviado) {
    case 'Mon':
        echo "Lunes";
        break;
    case 'Tue':
        echo "Martes";
        break;
    case 'Wed':
        echo "Miércoles";
        break;
    case 'Thu':
        echo "Jueves";
        break;
    case 'Fri':
        echo "Viernes";
        break;
    case 'Sat':
        echo "Sábado";
        break;
    case 'Sun':
        echo "Domingo";
        break;
    default:
        echo "Día no reconocido";
        break;
}

?>
