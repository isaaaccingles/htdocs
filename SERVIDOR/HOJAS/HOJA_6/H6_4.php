<?php

$alumno = array(
    "nombre" => "José",
    "apellidos" => "Martínez Roca",
    "telefono" => "96 361 66 54",
    "direccion" => "C/ Arco del triunfo 13",
    "dni" => "22 111 055",
    "num_matricula" => null,
    "facultad" => "Facultad Informática",
    "curso" => "5"
);

echo "Recorrer del final al principio:\n";

end($alumno);

while (($valor = current($alumno)) !== false) {
    echo $valor . "\n";
    prev($alumno);
}

echo "\nRecorrer del principio al final:\n";

reset($alumno);

while (($clave = key($alumno)) !== null) {
    echo $clave . "\n";
    next($alumno);
}
?>
//no crea ningun error, sale null pero sigue el programa
