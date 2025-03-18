<?php

$array = array(
 'k3' => 'JUAN',
 'k5' => 'Álvaro',
 'k0' => 'Maite',
 'k2' => 'ÁLVARO',
 'k1' => 'Juan',
 'k4' => 'Martina');

//a) Ordenarlo por los valores de mayor a menor sin mantener las
// asociaciones clave-valor

$valores = array_values($array);
arsort($valores); //orden descendente manteniendo las claves
print_r($valores);

//b) Igual pero manteniendo las asociaciones

$valores = array_values($array);
array_multisort($valores);
print_r($valores);

//c) Ordenarlo por las claves de menor a mayor

$valores = array_values($array);
asort($valores);
print_r($valores);

//d) Mezcla el array aleatoriamente

shuffle($valores);
print_r($valores);

//e) Obtén un array con las claves de dos valores seleccionados
//aleatoriamente.

$aleatorio = array_rand($array, 2);
print_r($aleatorio);

//f) Ordénalo por los valores de mayor a menor sin diferenciar
// mayúsculas y minúsculas.

natcasesort($valores);
print_r($valores);


arsort($array); //orden descendente manteniendo las claves
ksort($array); //orden de el array segun las claves ascendente
krsort($array); //orden de el array segun las claves descendente
shuffle($array); //mezcla el array aleatoriamente
array_rand($array, 2); //Obtén un array con las claves de dos valores seleccionados aleatoriamente.
natcasesort($array); //Ordenarlo por los valores de mayor a menor sin diferenciar mayúsculas y minúsculas.
uksort($ciudades, "strcasecmp"); //Ordena un array por claves usando una función de comparación definida por el usuario

