<?php

$array1=array('IMG0.png', 'img12.png', 'img10.png', 'img2.png',
'img1.png', 'IMG3.png');

$ordenacion = array_values($array1);

// a)

natsort($ordenacion);
print_r($ordenacion);

// b)

natcasesort($ordenacion);
print_r($ordenacion);
