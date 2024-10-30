<?php

$ciudades = array(

);

$ciudades[5]='Madrid';
$ciudades[7]='Oviedo';
$ciudades[]='Cáceres';
$ciudades[]='ALICANTE';
$ciudades[]='Almería';
$ciudades[]='Zaragoza';

print_r($ciudades);

//a) Ordenarlo por los valores de mayor a menor sin mantener las
// asociaciones clave-valor

$valores = array_values($ciudades);
arsort($valores);
print_r($valores);

//b) Igual pero manteniendo las asociaciones

$valores = array_values($ciudades);
array_multisort($valores);
print_r($valores);

//c) Ordenarlo por las claves de menor a mayor

$valores = array_values($ciudades);
asort($valores);
print_r($valores);

//d) Mezcla el array aleatoriamente

shuffle($valores);
print_r($valores);

//e) Obtén un array con las claves de dos valores seleccionados
//aleatoriamente.

$aleatorio = array_rand($ciudades, 2);
print_r($aleatorio);

//f) Ordénalo por los valores de mayor a menor sin diferenciar
// mayúsculas y minúsculas.

natcasesort($valores);
print_r($valores);