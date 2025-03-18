<?php

$cad="defjvb/n";  // Cadena de texto
$cad1= " fp.informatica.iessanjuandelacruz@educa.madrid.org ";  // Cadena con un correo electrónico y espacios
$cad2= "educa.madrid.org";  // Dominio del correo electrónico
$cad3="defghijk/n";  // Cadena con caracteres y un salto de línea
$cad4="defghi";  // Subcadena de $cad3 sin "/n"
$cad5= 'path=[“\usr\$usuario”]|\usr';  // Cadena con caracteres especiales
$cad6= "C/ Claveles 23,20D,28033,Madrid";  // Dirección con comas y números
$cad7= "juan rodríguez Hernández";  // Nombre con minúsculas
$long=15;  // Longitud para usar en str_pad
$car1='.';  // Carácter para padding
$car2='*';  // Otro carácter para padding

// Escapa caracteres especiales en $cad5
print_r(addslashes($cad5)); 
echo"<br/>";

// Escapa caracteres especiales en $cad3
print_r(quotemeta($cad3));
echo"<br/>";

// Elimina espacios en blanco al inicio y al final de $cad1
print_r(trim($cad1));
echo"<br/>";

// Elimina los espacios en blanco y caracteres de nueva línea al final de $cad3
print_r(chop($cad3));
echo"<br/>";

// Devuelve el carácter con el código ASCII 45 (un guion "-")
print_r(chr(45));
echo"<br/>";

// Devuelve la longitud de la cadena $cad6 (número total de caracteres)
print_r(strlen($cad6));
echo"<br/>";

// Devuelve la subcadena de $cad1 desde el primer punto encontrado (incluido)
print_r(strchr($cad1,$car1));
echo"<br/>";

// Rellena $cad4 con "." a la derecha hasta alcanzar 15 caracteres
print_r(str_pad($cad4,$long,$car1,STR_PAD_RIGHT));
echo"<br/>";

// Intenta rellenar $cad3 con "*" de manera centrada, pero el valor negativo hace que no funcione correctamente
print_r(str_pad($cad3,-2,$car2,STR_PAD_BOTH));
echo"<br/>";

// Devuelve la última ocurrencia de "," en $cad6 y todo lo que le sigue
print_r(strrchr($cad6,','));
echo"<br/>";

// Convierte la primera letra de cada palabra en mayúscula en $cad7
print_r(ucwords($cad7));
echo"<br/>";

// Devuelve los últimos 9 caracteres de $cad1
print_r(substr($cad1,-9));
echo"<br/>";

// Busca "claveles" en $cad6 y devuelve la subcadena a partir de ahí (sensible a mayúsculas/minúsculas)
print_r(strstr($cad6, 'claveles'));
echo"<br/>";

// Lo mismo que strstr pero no distingue entre mayúsculas y minúsculas
print_r(stristr($cad6, 'claveles'));
echo"<br/>";

// Repite $cad4 seis veces
print_r(str_repeat($cad4,6));
echo"<br/>";

// Devuelve los caracteres únicos en $cad2 en orden ASCII
print_r(count_chars($cad2,3));
echo"<br/>";

// Busca la posición de ".i" en $cad1, comenzando desde el índice 2
print_r(strpos($cad1,".i", 2));
echo"<br/>";

// Devuelve la última aparición de "i" en $cad1
print_r(strrpos($cad1,'i'));
echo"<br/>";

// Devuelve la subcadena de $cad1 desde el primer "@" encontrado
print_r(strstr($cad1,'@'));
echo"<br/>";

// Compara los primeros 4 caracteres de $cad3 y $cad
print_r(strncmp($cad3,$cad,4));
echo"<br/>";

// Escapa caracteres especiales en $cad5
print_r(quotemeta($cad5));
echo"<br/>";

// Compara la subcadena de $cad1 desde "@" con $cad2
print_r(strcmp(strstr($cad1,'@'), $cad2));
echo"<br/>";

// Invierte la cadena $cad3
print_r(strrev($cad3));
echo"<br/>";

// Sustituye "f" por "F" y "p" por "P" en $cad1
print_r(strtr("fp","FP", $cad1));
echo"<br/>";

// Compara $cad3 y $cad4 (devuelve un número negativo porque $cad3 es mayor que $cad4)
print_r(strcmp($cad3,$cad4));
echo"<br/>";

// Compara $cad3 y $cad4 usando comparación natural (puede ser diferente de strcmp en ciertos casos)
print_r(strnatcmp($cad3,$cad4));
echo"<br/>";

// Extrae una subcadena de $cad1 desde la posición 15 hasta -16 caracteres antes del final
print_r(substr($cad1, 15, -16));
echo"<br/>";

// Devuelve la longitud del segmento inicial de $cad6 antes de encontrar "20D"
print_r(strcspn($cad6,"20D"));
echo"<br/>";
