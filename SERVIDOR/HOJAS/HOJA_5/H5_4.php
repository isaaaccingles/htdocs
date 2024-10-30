<?php

//a)
$negativos = array('-5','3','-2','0','-1000','9','1');

natsort($negativos);
$negativos = array_values($negativos);

echo "Array de negativos ordenado: ";
print_r($negativos);

//b

$ceros = array('09', '8', '10', '009', '011', '0');

natsort($ceros);
$ceros = array_values($ceros);

echo "Array de ceros ordenado: ";
print_r($ceros);
?>
